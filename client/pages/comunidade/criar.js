import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function CriarComunidade() {
    const { register, handleSubmit } = useForm();
    const { usuarioAuth, isAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isAuth()) router.push("/autenticacao");
    }, []);

    const criar = async (data) => {
        const { nome } = data;

        console.log(nome);

        await httpPy.post(`/usuarios/${usuarioAuth.usuarioId}/comunidades`, { nome });
        router.push("/comunidades");
    }

    if (!isAuth()) return;

    return (
        <div>
            <h1>Comunidades</h1>
            <form onSubmit={ handleSubmit(criar) }>
                <label>Nome</label>
                <input type="text" { ...register("nome") }/>
                <button type="submit">Criar</button>
            </form>
        </div>
    )
} 