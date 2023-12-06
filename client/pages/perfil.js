import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../src/contexts/auth_context";

export default function Home() {

    const { usuarioAuth, isAuth } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});
    const router = useRouter();
    const [publicacoes, setpublicacoes] = useState({});

    const buscarUsuario = async (id) => {
        const res = await httpPy.get(`/usuarios/${id}`);
        
        console.log(res);
        
        const { conteudo: usuario } = res.data;
        
        setUsuario(usuario);
    }

    useEffect(() => {
        console.log(usuarioAuth);
        console.log(usuario);

        if (!router.isReady) return;

        if (!isAuth()) router.push("/autenticacao");
        
    }, [router]);

    useEffect(() => {
      const fetchPosts = async () => {

          if (usuarioAuth.id == undefined) return;
  
          const res = await httpPy.get(`/publicacoes/${usuario.publicacao.id}`);

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
                                    <li id={ publicacaoId } style={{ background: "black" }}> { conteudo }</li>
                                </ul>
                            )
                        })
                    }
                </section>
              </div>
    </>
  )
}
