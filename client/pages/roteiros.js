import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../src/api";
import Roteiro from "../src/components/Roteiro";
import AuthContext from "../src/contexts/auth_context";

export default function Roteiros() {

  const { isAuth, usuarioAuth } = useContext(AuthContext);
  const router = useRouter();
  const [roteiros, setRoteiros] = useState([]);

  const fetchRoteiros = async () => {
    const res = await httpPy.get(`/roteiros`);
    const { conteudo } = res.data;      
    setRoteiros(conteudo);
  }

  useEffect(() => {
    if (!isAuth()) {router.push("/autenticacao"); return;}

    fetchRoteiros();
  }, []);

  if (!isAuth()) return;

  return (
    <>
    <h1>Home</h1>
    <div style={{ display: "flex" }}>
        <section>
            <h2>Roteiros de viagem</h2>
            <button onClick={ () => router.push("/roteiro/criar") }>Crie seu roteiro de viagem</button>
            {
              roteiros?.map(roteiro => {
                return (
                  <Roteiro roteiro={ roteiro } />
                )
              })
            }
        </section>
      </div>
    </>
  )
}
