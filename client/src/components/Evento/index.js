import Link from "next/link";

export default function Evento({ evento }) {

    return (
        <>
            <Link key={ evento.eventoId } style={{ marginBottom: "3rem" }} href={ `/evento/${evento.eventoId}` }>
                <p> { evento.conteudo }</p>
            </Link>
        </>
    )
}