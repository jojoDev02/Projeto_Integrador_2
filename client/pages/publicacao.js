import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";

export default function publicacao() {
    const { register, handleSubmit } = useForm();
    const { setUsuarioAuth } = useContext(AuthContext);
    const router = useRouter();

    const submit = async (data) => {
        console.log(data);

        const publicacaoData = {
            ...data,
        };

        try {
            await registerPublicacao(publicacaoData);
        } catch (err) {
            console.log(err);
            return;
        }

        router.push("/");
    };

    const registerPublicacao = async (publicacaoData) => {
        const res = await httpPy.post(`/publicacoes/${id}`, publicacaoData);
        console.log(res);

        const { data, statusCode } = res;

        if (statusCode != 201) throw Error(res);

        const { token, usuario } = data.conteudo;

        setUsuarioAuth({ ...usuario, token });
    }

    return (
        <>
            <h1>Nova publicação</h1>
            <form onSubmit={ handleSubmit(submit) }>
                <div>
                    <label>Conteudo</label>
                    <input type="text" name="conteudo" { ...register("conteudo", { required: true }) }/>
                </div>
                <input type="submit" value="Enviar"/>
            </form>
        </>
    );
}