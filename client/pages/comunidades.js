import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../src/api";
import Comunidade from "../src/components/Comunidade";
import AuthContext from "../src/contexts/auth_context";

export default function Eventos() {

  const { isAuth, usuarioAuth } = useContext(AuthContext);
  const router = useRouter();
  const [comunidades, setcomunidades] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchComunidades = async () => {

    if (!isAuth()) router.push("/autenticacao");

    const res = await httpPy.get(`/comunidades`);
    console.log(res);
    const { conteudo } = res.data;      
    setcomunidades(conteudo);
  }

  useEffect(() => {
    fetchComunidades();
  }, []);

  return (
    <>
    <h1>Comunidades</h1>
    <div style={{ display: "flex" }}>
        <section>
            <button onClick={ () => router.push("/comunidade/criar") }>Crie sua comunidade</button>
            {
              comunidades?.map(comunidade => {
                return (
                  <Comunidade comunidade={ comunidade } />
                )
              })
            }
        </section>
      </div>
    </>
  )
}
