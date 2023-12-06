import Link from "next/link";
import { useEffect, useState } from "react";
import { httpPy } from "../../api";

export default function Publicacao({ publicacao }) {
    
    const [curtidas, setCurtidas] = useState(publicacao.curtidas);

    useEffect(() => {
        console.log("estou no componente de publicacao");
        console.log(publicacao);
    }, [])

    const curtirPublicacao = async (event) => {
        const id = event.target.id;
        httpPy.post(`/publicacoes/${id}/curtir`);
        setCurtidas(prev => prev + 1);
    }

    return (
        <>
            <Link key={ publicacao.publicacaoId } style={{ marginBottom: "3rem" }} href={ `/publicacao/${publicacao.publicacaoId}` }>
                <p> { publicacao.conteudo }</p>
            </Link>
            <div>
                <span>{ curtidas }</span>
                <button id={ publicacao.publicacaoId } onClick={ curtirPublicacao }>Curtir</button>
            </div>
        </>
    )
}