import { useState } from "react";
import { httpPy } from "../../api";

export default function Publicacao({ publicacao }) {
    
    const [curtidas, setCurtidas] = useState(publicacao.curtidas);

    const curtirPublicacao = async (event) => {
        const id = event.target.id;
        httpPy.post(`/publicacoes/${id}/curtir`);
        setCurtidas(prev => prev + 1);
    }

    return (
        <div key={ publicacao.publicacaoId } style={{ marginBottom: "3rem" }}>
            <p> { publicacao.conteudo }</p>
            <span>{ curtidas }</span>
            <button id={ publicacao.publicacaoId } onClick={ curtirPublicacao }>Curtir</button>
        </div>
    )
}