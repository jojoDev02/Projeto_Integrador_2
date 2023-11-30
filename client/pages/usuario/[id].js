import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function Usuario() {
    const router = useRouter();
    const { usuarioAuth, isAuth } = useContext(AuthContext);
    const [usuario, setUsuario] = useState({});
    const [amizade, setAmizade] = useState({});
    
    useEffect(() => {
        console.log(usuarioAuth);
        console.log(usuario);

        if (!router.isReady) return;

        if (!isAuth()) router.push("/autenticacao");
        
    }, [router]);
    
    useEffect(() => {
        if (!router.isReady) return;
        
        const { id } = router.query;
        
        try {
            buscarUsuario(id);
        } catch (err) {
            console.error(err)
        }

        try {
            verificarAmizade(id);
        } catch (err) {
            console.log(err);
        }
        
    }, [router, amizade?.status]);
    
    const buscarUsuario = async (id) => {
        const res = await httpPy.get(`/usuarios/${id}`);
        
        console.log(res);
        
        const { conteudo: usuario } = res.data;
        
        setUsuario(usuario);
    }
    
    const adicionarAmigo = async () => {
        try {
            const res = await httpPy.post("/amizades", { receptorId: usuario.id, solicitanteId: usuarioAuth.id, status: "pendente" });
            console.log(res);

            const { conteudo } = res.data;

            if (res.statusCode == 201) {
                setAmizade(conteudo);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const removerAmigo = async () => {
        try {
            const res = await httpPy.delete("/amizades/" + amizade.id);
            console.log(res);

            if (res.statusCode == 204) {
                const { conteudo } = res.data;
                setAmizade(conteudo);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const aceitarPedido = async () => {
        try {   
        
            const res = await httpPy.put(`/amizades/${amizade.id}`, {solicitanteId: usuario.id, receptorId: usuarioAuth.id, status: "confirmada"});
            console.log(res);

            if (res.statusCode == 200) {

                const { conteudo } = res.data;
                setAmizade(conteudo);
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    const verificarAmizade = async (amigoId) => {
        const res = await httpPy.get(`/usuarios/${usuarioAuth.id}/amizades/${amigoId}`);
        console.log(res)
        
        if (res.statusCode == 200) {
            const { conteudo } = res.data;
            setAmizade(conteudo);

            console.log(amizade);
        }
    }
    
    return (
        <div>
            <h1>{ usuario?.apelido }</h1>
            <div>{ usuario?.nome }</div>

           {
                usuarioAuth.id != usuario.id ?
                    amizade?.status ?
                        amizade.status == 1 ?
                            amizade.solicitanteId == usuario.id ?
                                <button onClick={ aceitarPedido }>~ Aceitar pedido</button>
                                :
                                <button>~ Pedido enviado</button>
                        :
                        <button onClick={ removerAmigo }>- Remover amizade</button>
                    :
                    <button onClick={ adicionarAmigo }>+ Adicionar amigo</button>
                :
                ""
           }    
        </div>
    )
}