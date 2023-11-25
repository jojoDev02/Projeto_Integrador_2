import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { httpPy } from "../../src/api";


export default function Pesquisa() {
    const router = useRouter();
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

        const { p } = router.query;

        try {
            pesquisar(p);
        } catch (err) {
            console.error(err);
        }
    }, [router]);

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
                                            <span>{ dado.apelido }</span>
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