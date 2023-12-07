import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function CriarRoteiro() {
    const { register, handleSubmit } = useForm();
    const { isAuth, usuarioAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isAuth()) {router.push("/autenticacao"); return;}
    }, [])

    const criar = async (data) => {
        console.log(data);

        const res = await httpPy.post(`/usuarios/${usuarioAuth.usuarioId}/roteiros`, data);

        console.log(res);
        const { conteudo } = res.data;
        const { roteiroId } = conteudo;

        if (res.statusCode == 201) router.push(`/roteiro/${roteiroId}`);
    }
   
    if (!isAuth()) return;

    return (
        <>
         <div>
            <h1>Novo roteiro de viagem</h1>
            <form onSubmit={ handleSubmit(criar) }>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="titulo" { ...register("titulo", { required: true }) }/>
                </div>
                <div>
                    <label>Conteúdo</label>
                    <input type="text" name="conteudo" { ...register("conteudo", { required: true }) }/>
                </div>
                <button type="submit">criar</button>
            </form>
         </div>
        </>
    );
}