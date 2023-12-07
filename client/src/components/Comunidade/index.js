import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../../api";
import AuthContext from "../../contexts/auth_context";

export default function Comunidade({ comunidade }) {

    const { usuarioAuth } = useContext(AuthContext);
    const router = useRouter();
    const [cargo, setCargo] = useState(-1);

    const buscarComunidadeUsuario = async () => {
        const res = await httpPy.get(`/usuarios/${usuarioAuth.usuarioId}/comunidades/${comunidade.comunidadeId}`);
        
        const { conteudo } = res.data;
        const { cargo } = conteudo;        

        setCargo(cargo)
        
        console.log(res);
    }

    useEffect(() => {
        buscarComunidadeUsuario();
    }, []);

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
        setCargo(2);
        router.push(`/comunidade/${comunidadeId}`);
    }

    return (
        <div style={{ margin: "1rem 0" }}>
            <Link 
                key={ comunidade.comunidadeId } 
                href={ `/comunidade/${comunidade.comunidadeId}` }
            >
                { comunidade.nome }
            </Link>
            <div>
                <button style={{ display: cargo === -1 ? "block" : "none" }} onClick={ entrarComunidade }>Entrar</button>
                <button style={{ display: cargo === 2 ? "block" : "none" }} onClick={ sairComunidade }>Sair</button>
            </div>
        </div>
    )
}