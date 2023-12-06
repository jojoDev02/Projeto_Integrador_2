import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";

export default function Evento() {
    const { register, handleSubmit } = useForm();
    const { isAuth, usuarioAuth } = useContext(AuthContext);
    const router = useRouter();

    const publicar = async (data) => {
        const { conteudo } = data;
    
        console.log(data);
        console.log(usuarioAuth);
    
        const payload = { conteudo, usuarioId: usuarioAuth.usuarioId }
        console.log(payload);
    
        await httpPy.post("/comunidades", payload);
        await fetchPosts();
      }

    return (
        <>
         <div style={{ display: "flex" }}>
            <h1>Nova comunidade</h1>
            <form onSubmit={ handleSubmit(publicar) }>
                <div>
                    <label>Nome</label>
                    <input type="text" name="nome" { ...register("nome", { required: true }) }/>
                </div>
                <button type="submit">Criar</button>
            </form>
         </div>
        </>
    );
}