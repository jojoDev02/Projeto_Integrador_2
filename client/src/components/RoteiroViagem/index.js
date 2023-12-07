import Link from "next/link";
import { useContext } from "react";
import { httpPy } from "../../api";
import AuthContext from "../../contexts/auth_context";

export default function Roteiro({ roteiro }) {

    const { usuarioAuth } = useContext(AuthContext);

    const participar = async () => {
        const res = await httpPy.put(`/roteiros/${roteiro.id}/usuarios/${usuarioAuth.usuarioId}`);
        console.log(res);

        if (res.statusCode == 200) {

        }
    }

    return (
        <>
            <Link key={ roteiro.roteiroId } style={{ marginBottom: "3rem" }} href={ `/roteiro/${roteiro.roteiroId}` }>
                <p>{ roteiro.titulo }</p>
            </Link>
            { rotiero.dono?.usuarioId != usuarioAuth.usuarioId && <button>{ participar }</button> }
        </>
    )
}