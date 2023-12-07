import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function Evento() {
    const { register, handleSubmit } = useForm();
    const { isAuth, usuarioAuth } = useContext(AuthContext);
    const router = useRouter();
    const [evento, setEvento] = useState({
        eventoId: null,
        descricao: "",
        data_evento: "",
        titulo: "",
        horario: ""
    });
    const [isParticipante, setIsParticipante] = useState(false);

    useEffect(() => {
        console.log("2");
        if (!isAuth()) {router.push("/autenticacao"); return;}

        const { id } = router.query;
        buscarEvento(id);
        buscarEventoUsuario(id, usuarioAuth.usuarioId);
    }, []);

    const buscarEventoUsuario = async (eventoId, usuarioId) => {
        const res = await httpPy.get(`/eventos/${eventoId}/usuarios/${usuarioId}`);

        console.log(res);

        setIsParticipante(res.statusCode == 200);
        
    }

    const buscarEvento = async (id) => {
        const res = await httpPy.get(`/eventos/${id}`);        
        
        console.log(res);

        if (res.statusCode == 200) {
            const { conteudo } = res.data;
            setEvento(conteudo);
        }
    }

    const participarEvento = async () => {
        const res = await httpPy.put(`/eventos/${evento.eventoId}/usuarios/${usuarioAuth.usuarioId}`);
        console.log(res);

        if (res.statusCode == 200) {
            isParticipante(true);
        }
    }

    const sairEvento = () => async () => {
        console.log("entrei")
        const res = await httpPy.delete(`/eventos/${evento.eventoId}/usuarios/${usuarioAuth.usuarioId}`);
        console.log(res);

        if (res.statusCode == 204) {
            isParticipante(false);
        }
        console.log("ola mundo")
    }

    const formatarData = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString("pt-BR");
    }

    if (!isAuth()) return;

    return (
        <>
        <h1>Evento</h1>
        <div>
            <p>Título: { evento.titulo }</p>
            <p>Descrição: { evento.descricao }</p>
            <p>Data: { formatarData(evento.data_evento) }</p>
            <p>Horário: { evento.horario }</p>
            <p>Dono: { evento.dono?.apelido }</p>
        </div>
        { evento.dono?.usuarioId != usuarioAuth.usuarioId && !isParticipante && <button onClick={ () => participarEvento() }>participar</button> }
        { evento.dono?.usuarioId != usuarioAuth.usuarioId && isParticipante && <button onClick={ () => sairEvento() }>sair</button> }
        </>
    );
}