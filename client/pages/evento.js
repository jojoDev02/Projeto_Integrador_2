import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";

export default function Evento() {
    const { register, handleSubmit } = useForm();
    const { setUsuarioAuth } = useContext(AuthContext);
    const router = useRouter();

    const submit = async (data) => {
        console.log(data);

        const eventoData = {
            ...data,
        };

        try {
            await registerEvento(eventoData);
        } catch (err) {
            console.log(err);
            return;
        }

        router.push("/");
    };

    const registerEvento = async (eventoData) => {
        const res = await httpPy.post(`/publicacoes/${id}`, eventoData);
        console.log(res);

        const { data, statusCode } = res;

        if (statusCode != 201) throw Error(res);

        const { token, usuario } = data.conteudo;

        setUsuarioAuth({ ...usuario, token });
    }

    return (
        <>titulo, descricao, horario, data_evento, localidadeId
            <h1>Novo evento</h1>
            <form onSubmit={ handleSubmit(submit) }>
                <div>
                    <label>Titulo</label>
                    <input type="text" name="titulo" { ...register("titulo", { required: true }) }/>
                    <label>Descrição</label>
                    <input type="text" name="descricao" { ...register("descricao", { required: true }) }/>
                    <label>Horario</label>
                    <input type="time" name="horario" { ...register("horario", { required: true }) }/>
                    <label>Data</label>
                    <input type="date" name="data_evento" { ...register("data_evento", { required: true }) }/>
                </div>
                <input type="submit" value="Enviar"/>
            </form>
        </>
    );
}