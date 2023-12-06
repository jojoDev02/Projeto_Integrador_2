import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Comunidade from "../src/components/Comunidade";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";

export default function Eventos() {

  const { isAuth, usuarioAuth } = useContext(AuthContext);
  const router = useRouter();
  const [comunidades, setcomunidades] = useState([]);

  const fetchComunidades = async () => {

    if (!isAuth()) return router.push("/autenticacao");

    const res = await httpPy.get(`/comunidades`);
    const { data } = res;      
    setcomunidades(data);
  }

  useEffect(() => {
    fetchComunidades();
  }, []);

  return (
    <>
    <h1>comunidades</h1>
    <div style={{ display: "flex" }}>
        <section>
            <h2>Suas comunidades</h2>
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
