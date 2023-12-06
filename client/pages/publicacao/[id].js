import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import PublicacaoComponent from "../../src/components/Publicacao";
import AuthContext from "../../src/contexts/auth_context";

export default function Publicacao() {

    const { isAuth } = useContext(AuthContext);
    const [publicacao, setPublicacao] = useState({
        publicacaoId: null,
        curtidas: null,
        conteudo: "",
        comentarios: []
    });
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    const buscarPublicacao = async (id) => {
        const res = await httpPy.get(`/publicacoes/${id}`);

        console.log(res);

        const { data } = res;
        setPublicacao(data);
    }

    const comentar = async (data) => {
        console.log(data);

        const payload = { 
            texto: data.texto,
            publicacaoId: publicacao.publicacaoId 
        }
        console.log(payload);
        await httpPy.post(`/publicacoes/${publicacao.publicacaoId}/comentarios`, payload);
        await buscarPublicacao(publicacao.publicacaoId);
    }

    useEffect(() => {
        if (!isAuth()) router.push("/autenticacao");
        if (!router.isReady) return;

        const { id } = router.query;
        buscarPublicacao(id);
    }, [router])

    if (!isAuth()) return;

    return (
        <div>
            <PublicacaoComponent publicacao={ publicacao }/>
            <div>
                <p>Comentários</p>
                <div>
                    <p>Realizar comentário</p>
                    <form onSubmit={ handleSubmit(comentar) }>
                        <input type="text" { ...register("texto", { required: true, maxLength: 255 }) }/>
                        <button type="submit">comentar</button>
                    </form>
                </div>
                {
                    publicacao.comentarios?.map(comentario => {
                        return (
                            <p key={ comentario.comentarioId }>{ comentario.texto }</p>
                        )
                    })
                }
            </div>
        </div>
    )
}