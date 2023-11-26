import { useState } from 'react';
import Navbar from '../src/components/Navbar';
import AuthContext from '../src/contexts/auth_context';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {

  const [ usuarioAuth, setUsuarioAuth ] = useState({});
  const isAuth = () => {
    return Object.keys(usuarioAuth) != 0;
  }
 
  return (
    <AuthContext.Provider value={ { usuarioAuth, isAuth, setUsuarioAuth } }>
      <Navbar/>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp

