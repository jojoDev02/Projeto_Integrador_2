import { createContext } from "react";

const AuthContext = createContext({ 
    usuarioAuth: { 
        id: -1, 
        email: "", 
        apelido: "", 
        nome: "", 
        token: "" 
    }, 
    isAuth: () => {},
    setUsuarioAuth: () => {}
});

export default AuthContext;
