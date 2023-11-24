import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import '../styles/globals.css';

const UserContext = createContext({ authUser: { id: -1, email: "", apelido: "", nome: "", token: "" }, setAuthUser: () => {} });

function MyApp({ Component, pageProps }) {

  const [ authUser, setAuthUser ] = useState({});
  const router = useRouter();

  useEffect(() => {

    console.log("entrei na _app");

    if (!router.isReady) return;

    if (Object.keys(authUser).length == 0) {
      router.push("/autenticacao");
    }
    
  }, []);

  return (
    <UserContext.Provider value={ { authUser, setAuthUser } }>
      <Navbar/>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
export { UserContext };

