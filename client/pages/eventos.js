import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../src/api";
import Evento from "../src/components/Evento";
import AuthContext from "../src/contexts/auth_context";

export default function Eventos() {

  const { isAuth, usuarioAuth } = useContext(AuthContext);
  const router = useRouter();
  const [eventos, setEventos] = useState([]);

  const fetchEventos = async () => {
    const res = await httpPy.get(`/eventos`);
    const { conteudo } = res.data;      
    setEventos(conteudo);
  }

  useEffect(() => {
    if (!isAuth()) {router.push("/autenticacao"); return;}

    fetchEventos();
  }, []);

  if (!isAuth()) return;

  return (
    <>
    <h1>Home</h1>
    <div style={{ display: "flex" }}>
        <section>
            <h2>Eventos</h2>
            <button onClick={ () => router.push("/evento/criar") }>Crie seu evento</button>
            {
              eventos?.map(evento => {
                return (
                  <Evento evento={ evento } />
                )
              })
            }
        </section>
      </div>
    </>
  )
}
