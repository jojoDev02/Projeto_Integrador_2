import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function RoteiroViagem() {
    const { isAuth, usuarioAuth } = useContext(AuthContext);
    const router = useRouter();
    const [roteiro, setRoteiro] = useState({
        roteiroId: null,
        titulo: "",
        conteudo: "",
        usuario: {}
    });
    const [isParticipante, setIsParticipante] = useState(false);

    useEffect(() => {
        console.log("2");
        if (!isAuth()) {router.push("/autenticacao"); return;}

        const { id } = router.query;
        buscarRoteiro(id);
        buscarRoteiroUsuario(id, usuarioAuth.usuarioId);
    }, []);

    const buscarRoteiroUsuario = async (roteiroId, usuarioId) => {
        const res = await httpPy.get(`/roteiro/${roteiroId}/usuarios/${usuarioId}`);

        console.log(res);

        setIsParticipante(res.statusCode == 200);
        
    }

    const buscarRoteiro = async (id) => {
        const res = await httpPy.get(`/roteiros/${id}`);        
        
        console.log(res);

        if (res.statusCode == 200) {
            const { conteudo } = res.data;
            setRoteiro(conteudo);
        }
    }

    const participarRoteiro = async () => {
        const res = await httpPy.put(`/roteiros/${roteiro.roteiroId}/usuarios/${usuarioAuth.usuarioId}`);
        console.log(res);

        if (res.statusCode == 200) {
            isParticipante(true);
        }
    }

    const sairRoteiro = () => async () => {
        console.log("entrei")
        const res = await httpPy.delete(`/roteiros/${roteiro.roteiroId}/usuarios/${usuarioAuth.usuarioId}`);
        console.log(res);

        if (res.statusCode == 204) {
            isParticipante(false);
        }
    }

    if (!isAuth()) return;

    return (
        <>
        <h1>Roteiro de Viagem</h1>
        <div>
            <p>Título: { roteiro.titulo }</p>
            <p>Descrição: { roteiro.descricao }</p>
            <p>Dono: { roteiro.dono?.apelido }</p>
        </div>
        { roteiro.dono?.usuarioId != usuarioAuth.usuarioId && !isParticipante && <button onClick={ () => participarRoteiro() }>participar</button> }
        { roteiro.dono?.usuarioId != usuarioAuth.usuarioId && isParticipante && <button onClick={ () => sairRoteiro() }>sair</button> }
        </>
    );
}