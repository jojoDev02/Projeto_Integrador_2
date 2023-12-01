import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../src/contexts/auth_context";

export default function Home() {

    const { setUsuarioAuth } = useContext(AuthContext);
    const router = useRouter();
    const [publicacoes, setpublicacoes] = useState({});

    const authenticateUser = async (userData) => {
      const res = await httpPy.post("/authenticate", userData );
      console.log(res);

      const { data, statusCode } = res;

      if (statusCode != 200) throw Error(res);
         

      const { usuario, token } = data.conteudo;

      setUsuarioAuth({ ...usuario, token });
    }

    useEffect(() => {
      const fetchPosts = async () => {

          if (usuarioAuth.id == undefined) return;
  
          const res = await httpPy.get(`/publicacoes/${publicacao.id}`);

          const { conteudo } = res.data;
  
          console.log(conteudo);

          setAmigos(conteudo);
         
      }

      fetchPosts();
    }, []);

  return (
    <>
    <h1>Home</h1>
            <div style={{ display: "flex" }}>
                <section>
                    <h2>Feed</h2>
                    {
                       publicacao?.map(({ id, publicacaoId }) => {
                            return (
                                <ul key={ id }>
                                    <li id={ publicacaoId } style={{ background: "purple" }}> { conteudo }</li>
                                </ul>
                            )
                        })
                    }
                </section>
              </div>
    </>
  )
}
