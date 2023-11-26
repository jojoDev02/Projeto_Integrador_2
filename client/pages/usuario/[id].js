import { useRouter } from "next/router";
import { useEffect } from "react";
import { httpPy } from "../../src/api";

export default function Usuario() {
    const router = useRouter();

    
    useEffect(() => {
        if (!router.isReady) return;
    
        const { id } = router.query;
        httpPy.get(`/usuarios/${id}`);
    }, [router]);

    return (
        <div>
            <h1>Ola mundo</h1>
        </div>
    )
}