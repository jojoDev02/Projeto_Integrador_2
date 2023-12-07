import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../src/api";
import Publicacao from "../src/components/Publicacao";
import AuthContext from "../src/contexts/auth_context";

export default function Home() {

  const { isAuth, usuarioAuth } = useContext(AuthContext);
  const router = useRouter();
  const [publicacoes, setpublicacoes] = useState([]);
  const { register, handleSubmit } = useForm(); 

  const fetchPosts = async () => {

    if (!isAuth()) return router.push("/autenticacao");

    const res = await httpPy.get(`/publicacoes`);

    console.log(res);
    let { data } = res;   
    
    if (!data) data = [];
    
    setpublicacoes(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const publicar = async (data) => {
    const { conteudo } = data;

    console.log(data);
    console.log(usuarioAuth);

    const payload = { conteudo, usuarioId: usuarioAuth.usuarioId }
    console.log(payload);

    await httpPy.post("/publicacoes", payload);
    await fetchPosts();
  }

  if (!isAuth()) return "Você está sendo redirecionado para a página de login...";

  return (
    <>
    <h1>Home</h1>
    <div style={{ display: "flex" }}>
        <section>
            <h2>Feed</h2>
            <div>
              <p>Realizar publicação</p>
              <form onSubmit={ handleSubmit(publicar) }>
                <textarea type="text" { ...register("conteudo", { required: true, maxLength: 255 }) }/>
                <button type="submit">publicar</button>
              </form>
            </div>
            {
              publicacoes?.map(publicacao => {
                return (
                  <Publicacao key={ publicacao.publicacaoId } publicacao={ publicacao } />
                )
              })
            }
        </section>
      </div>
    </>
  )
}
