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
    
        await httpPy.post("/eventos", payload);
        await fetchPosts();
      }

    return (
        <>
         <div style={{ display: "flex" }}>
            <h1>Novo evento</h1>
            <form onSubmit={ handleSubmit(publicar) }>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="titulo" { ...register("titulo", { required: true }) }/>
                    <label>Descrição</label>
                    <input type="text" name="descricao" { ...register("descricao", { required: true }) }/>
                    <label>Horario</label>
                    <input type="time" name="horario" { ...register("horario", { required: true }) }/>
                    <label>Data</label>
                    <input type="date" name="data_evento" { ...register("data_evento", { required: true }) }/>
                </div>
                <button type="submit">publicar</button>
            </form>
         </div>
        </>
    );
}