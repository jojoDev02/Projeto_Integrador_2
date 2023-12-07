import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function CriarEvento() {
    const { register, handleSubmit } = useForm();
    const { isAuth, usuarioAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!isAuth()) {router.push("/autenticacao"); return;}
    }, [])

    const criar = async (data) => {
        console.log(data);

        const res = await httpPy.post(`/usuarios/${usuarioAuth.usuarioId}/eventos`, data);

        console.log(res);
        const { conteudo } = res.data;
        const { eventoId } = conteudo;

        if (res.statusCode == 201) router.push(`/evento/${eventoId}`);
    }
   
    if (!isAuth()) return;

    return (
        <>
         <div>
            <h1>Novo evento</h1>
            <form onSubmit={ handleSubmit(criar) }>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="titulo" { ...register("titulo", { required: true }) }/>
                </div>
                <div>
                    <label>Descrição</label>
                    <input type="text" name="descricao" { ...register("descricao", { required: true }) }/>
                </div>
                <div>
                    <label>Horario</label>
                    <input type="time" name="horario" { ...register("horario", { required: true }) }/>
                </div>
                <div>
                    <label>Data</label>
                    <input type="date" name="data_evento" { ...register("data_evento", { required: true }) }/>
                </div>
                <button type="submit">criar</button>
            </form>
         </div>
        </>
    );
}