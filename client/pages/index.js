import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../src/api";
import Publicacao from "../src/components/Publicacao";
import AuthContext from "../src/contexts/auth_context";

export default function Home() {

  const { isAuth } = useContext(AuthContext);
  const router = useRouter();
  const [publicacoes, setpublicacoes] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {

      if (!isAuth()) return router.push("/autenticacao");

      const res = await httpPy.get(`/publicacoes`);
      const { data } = res;      
      setpublicacoes(data);
    }

    fetchPosts();
  }, []);

  return (
    <>
    <h1>Home</h1>
            <div style={{ display: "flex" }}>
                <section>
                    <h2>Feed</h2>
                    <div>
                      <p>Publicar</p>
                      <form>

                      </form>
                    </div>
                    {
                       publicacoes?.map(publicacao => {
                            return (
                              <Publicacao publicacao={ publicacao } />
                            )
                        })
                    }
                </section>
              </div>
    </>
  )
}
