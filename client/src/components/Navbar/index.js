import Link from 'next/link';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { useForm } from "react-hook-form";
import AuthContext from '../../contexts/auth_context';

const links = [
    { id: 1, href: "/", texto: "Home" },
    { id: 2, href: "/conversas", texto: "Conversas" },
    { id: 3, href: "/comunidades", texto: "Comunidades" },
    { id: 4, href: "/eventos", texto: "Eventos" }

];

export default function Navbar() {

    const { handleSubmit, register } = useForm();
    const router = useRouter();
    const { setUsuarioAuth, isAuth } = useContext(AuthContext);

    const redirecionarPesquisa = (data) => {
        
        const { pesquisa } = data; 

        router.push({
            pathname: "/pesquisa",
            query: {
                p: pesquisa
            }
        });
    }

    const logout = () => {
        setUsuarioAuth({});
        router.push("/autenticacao");
    }
    
    return(
        <>
            <h1>We Travel</h1>
            <form onSubmit={ handleSubmit(redirecionarPesquisa) }>
                <input type="text" { ...register("pesquisa") }/>
            </form>
            <nav>
                {
                    links.map(({ id, href, texto }) => {
                        return (
                            <Link key={ id } style={{ marginRight: "1rem" }} href={ href }>{ texto }</Link>
                        )
                    })
                }
                {
                    isAuth() && <button onClick={ logout }>Sair</button>
                }
            </nav>
        </>
    )
}