import { createContext } from "react";

const AuthContext = createContext({ 
    usuarioAuth: { 
        usuarioId: -1, 
        email: "", 
        apelido: "", 
        nome: "", 
        token: "" 
    }, 
    isAuth: () => {},
    setUsuarioAuth: () => {}
});

export default AuthContext;
