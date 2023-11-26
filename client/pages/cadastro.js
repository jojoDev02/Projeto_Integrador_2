import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";

export default function Cadastro() {
    const { register, handleSubmit } = useForm();
    const { setUsuarioAuth } = useContext(AuthContext);
    const router = useRouter();

    const submit = async (data) => {
        console.log(data);

        const userData = {
            ...data,
            tipo: "viajante"
        };

        try {
            await registerUser(userData);
        } catch (err) {
            console.log(err);
            return;
        }

        router.push("/");
    };

    const registerUser = async (userData) => {
        const res = await httpPy.post("/register", userData);
        console.log(res);

        const { data, statusCode } = res;

        if (statusCode != 201) throw Error(res);

        const { token, usuario } = data.conteudo;

        setUsuarioAuth({ ...usuario, token });
    }

    return (
        <>
            <h1>Cadastro</h1>
            <form onSubmit={ handleSubmit(submit) }>
                <div>
                    <label>Nome</label>
                    <input type="text" name="nome" { ...register("nome", { required: true }) }/>
                </div>
                <div>
                    <label>Apelido</label>
                    <input type="text" name="apelido" { ...register("apelido", { required: true }) }/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" { ...register("email", { required: true }) }/>
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" name="senha" { ...register("senha", { required: true }) }/>
                </div>

                <input type="submit" value="Enviar"/>
            </form>
        </>
    );
}