import Link from "next/link";
import { useContext } from "react";
import { httpPy } from "../../api";
import AuthContext from "../../contexts/auth_context";

export default function Evento({ evento }) {

    const { usuarioAuth } = useContext(AuthContext);

    const formatarData = (data) => {
        const date = new Date(data);
        return date.toLocaleDateString("pt-BR");
    }

    const participar = async () => {
        const res = await httpPy.put(`/eventos/${evento.id}/usuarios/${usuarioAuth.usuarioId}`);
        console.log(res);

        if (res.statusCode == 200) {

        }
    }

    return (
        <>
            <Link key={ evento.eventoId } style={{ marginBottom: "3rem" }} href={ `/evento/${evento.eventoId}` }>
                <p>{ evento.titulo }</p>
                <p>{ formatarData(evento.data_evento) }</p>
            </Link>
            { evento.dono?.usuarioId != usuarioAuth.usuarioId && <button>{ "participar" }</button> }
        </>
    )
}