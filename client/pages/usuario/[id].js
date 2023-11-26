import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../../src/api";
import AuthContext from "../../src/contexts/auth_context";

export default function Usuario() {
    const router = useRouter();
    const { usuarioAuth, isAuth } = useContext(AuthContext);
    
    const [usuario, setUsuario] = useState();
    
    useEffect(() => {
        console.log(usuarioAuth);

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
        
    }, [router]);
    
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
        } catch (err) {
            console.error(err);
        }
    }
    
    
    return (
        <div>
            <h1>{ usuario?.apelido }</h1>
            <div>{ usuario?.nome }</div>

            <button onClick={ adicionarAmigo }>+ Adicionar amigo</button>
        </div>
    )
}