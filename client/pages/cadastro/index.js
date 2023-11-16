import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../_app";

export default function Cadastro() {
    const { register, handleSubmit } = useForm();
    const { setAuthUser } = useContext(UserContext);
    const router = useRouter();

    const submit = async (data) => {
        console.log(data);

        const userData = {
            ...data,
            tipo: "viajante"
        };

        let res;

        try {
            res = await fetch("http://localhost:5000/api/v1/register", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const statusCode = res.status;

            res = await res.json();

            if (statusCode != 201) throw Error(res);
        } catch (err) {
            console.log(err);
            return;
        }

        console.log(res);

        const { user } = res;

        setAuthUser(user);

        router.push("/conversas");
    };

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