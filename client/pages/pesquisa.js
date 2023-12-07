import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { httpPy } from "../src/api";
import AuthContext from "../src/contexts/auth_context";


export default function Pesquisa() {
    const router = useRouter();
    const { isAuth } = useContext(AuthContext);
    const [ resultado, setResultado ] = useState({});

    const pesquisar = async (criterio) => {
        const res = await httpPy.get("/pesquisar?p=" + criterio);
        console.log(res);

        if (res.statusCode != 200) throw new Error(res);

        const { conteudo } = res.data;
        console.log(conteudo);
        
        setResultado(conteudo);
    }

    useEffect(() => {

        if (!router.isReady) return;
        if (!isAuth()) router.push("/autenticacao");

        const { p } = router.query;
        console.log("ola mundo");
        try {
            pesquisar(p);
        } catch (err) {
            console.error(err);
        }
    }, [router]);

    if (!isAuth()) return;

    return (
        <>
            <h2>Pesquisa</h2>
            <ul>
                {
                    Object.keys(resultado)?.map(key => {
                        const dados = resultado[key];

                        switch (key) {
                            case "usuarios":
                                return dados?.map(dado => {
                                    return (
                                        <ul key={ dado.id }>
                                            <Link href={ `/usuario/${dado.id}` }>
                                                <span>{ dado.apelido }</span>
                                            </Link>
                                        </ul>
                                    )
                                })
                        }
                    })
                }
            </ul>
        </>
    )
}