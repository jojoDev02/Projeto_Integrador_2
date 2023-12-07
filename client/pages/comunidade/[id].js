import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import Publicacao from "../../src/components/Publicacao";
import AuthContext from "../../src/contexts/auth_context";

export default function Comunidade() {
    const { register, handleSubmit } = useForm();
    const { isAuth, usuarioAuth } = useContext(AuthContext);
    const router = useRouter();
    const [comunidade, setComunidade] = useState({});
    const [publicacoes, setPublicacoes] = useState([]);
    const [cargo, setCargo] = useState(-1);
    
    const buscarComunidade = async (id) => {

        const res = await httpPy.get(`/comunidades/${id}`);

        const { conteudo } = res.data;
        setComunidade(conteudo);
    }

    const buscarComunidadeUsuario = async (id) => {
        const res = await httpPy.get(`/usuarios/${usuarioAuth.usuarioId}/comunidades/${id}`);
        
        const { conteudo } = res.data;
        const { cargo } = conteudo;        

        setCargo(cargo)
        
        console.log(res);
    }

    const buscarPublicacoes = async (id) => {
        const res = await httpPy.get(`/comunidades/${id}/publicacoes`);
        const { conteudo } = res.data;
        
        console.log(conteudo);

        setPublicacoes(conteudo);
    }

    useEffect(() => {
        if (!isAuth()) router.push("/autenticacao");

        const { id } = router.query;
        buscarComunidade(id);
        buscarPublicacoes(id);
        buscarComunidadeUsuario(id);
    }, []);


    const publicar = async (data) => {
        const { conteudo } = data;
        const { id } = router.query;

        console.log(data);
        console.log(usuarioAuth);
    
        const payload = { conteudo, usuarioId: usuarioAuth.usuarioId, comunidadeId: comunidade.comunidadeId }
        console.log(payload);
    
        await httpPy.post("/publicacoes", payload);
        buscarPublicacoes(id);
    }

    const sairComunidade = async () => {
        const comunidadeId = comunidade.comunidadeId;
        const usuarioId = usuarioAuth.usuarioId;

        await httpPy.delete(`/comunidades/${comunidadeId}/usuarios/${usuarioId}`);
        setCargo(-1);
    }

    const entrarComunidade = async () => {
        const comunidadeId = comunidade.comunidadeId;
        const usuarioId = usuarioAuth.usuarioId;

        await httpPy.put(`/comunidades/${comunidadeId}/usuarios/${usuarioId}`);
        router.push(`/comunidade/${comunidadeId}`);
        setCargo(2);
    }

    if (!isAuth()) return;

    return (
        <>
        <h1>Comunidades</h1>
        <h2>{ comunidade.nome }</h2>
        <div style={{ marginBottom: "2rem" }}>
            <button style={{ display: cargo === -1 ? "block" : "none" }} onClick={ entrarComunidade }>Entrar</button>
            <button style={{ display: cargo === 2 ? "block" : "none" }} onClick={ sairComunidade }>Sair</button>
        </div>
        <div>
            <form onSubmit={ handleSubmit(publicar) }>
                <div>
                    <label>Realizar publicação</label>
                    <input type="text" name="nome" { ...register("conteudo", { required: true }) }/>
                </div>
                <button type="submit">publicar</button>
            </form>
            <div>
                <h3>Publicações</h3>
                {
                    publicacoes?.map(publicacao => {
                        return <Publicacao publicacao={ publicacao }/>
                    })
                }
            </div>
        </div>
        </>
    );
}