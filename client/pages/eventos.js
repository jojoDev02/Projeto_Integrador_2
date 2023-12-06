import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";

export default function Eventos() {

  const { isAuth, usuarioAuth } = useContext(AuthContext);
  const router = useRouter();
  const [eventos, seteventos] = useState([]);
  const { register, handleSubmit } = useForm(); 

  const fetchEventos = async () => {

    if (!isAuth()) return router.push("/autenticacao");

    const res = await httpPy.get(`/eventos`);
    const { data } = res;      
    seteventos(data);
  }

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <>
    <h1>Home</h1>
    <div style={{ display: "flex" }}>
        <section>
            <h2>Seus eventos</h2>
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
