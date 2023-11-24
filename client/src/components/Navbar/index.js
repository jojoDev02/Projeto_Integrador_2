import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Navbar() {

    const { handleSubmit, register } = useForm();
    const router = useRouter()

    const pesquisar = (data) => {
        
        const { pesquisa } = data; 

        router.push({
            pathname: "/pesquisa",
            query: {
                p: pesquisa
            }
        });
    }
    
    return(
        <>
            <h1>We Travel</h1>
            <form onSubmit={ handleSubmit(pesquisar) }>
                <input type="text" { ...register("pesquisa") }/>
            </form>
        </>
    )
}