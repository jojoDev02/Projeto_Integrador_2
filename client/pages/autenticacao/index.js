import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import { UserContext } from "../_app";

export default function Autenticacao() {
    const { register, handleSubmit } = useForm();
    const { setAuthUser } = useContext(UserContext);
    const router = useRouter();

    const submit = async (data) => {
        console.log(data);

        try {
            await authenticateUser(data);
        } catch (err) {
            console.log(err);
            return;
        }

        router.push("/");
    };

    const authenticateUser = async (userData) => {
        const res = await httpPy.post("/authenticate", userData );

        const { data, statusCode } = res;

        if (statusCode != 200) throw Error(res);
           
        console.log(res);

        const { user, token } = data;

        setAuthUser({ ...user, token });
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={ handleSubmit(submit) }>
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