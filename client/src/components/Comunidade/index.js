import Link from "next/link";
import { httpPy } from "../../api";

export default function Comunidade({ comunidade }) {

    const entrarComunidade = async (event) => {
        const id = event.target.id;
        httpPy.post(`/comunidades/${id}`);
    }

    return (
        <>
            <Link key={ comunidade.comunidadeNome } style={{ marginBottom: "3rem" }} href={ `/comunidadez/${comunidade.comunidadeNome}` }>
            </Link>
            <div>
                <button id={ comunidade.comunidadeNome } onClick={ entrarComunidade }>Entrar</button>
            </div>
        </>
    )
}