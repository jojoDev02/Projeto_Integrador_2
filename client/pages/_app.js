import { createContext, useState } from 'react';
import '../styles/globals.css';

const UserContext = createContext({ authUser: { id: -1, email: "", apelido: "", nome: "" }, setAuthUser: () => {} });

function MyApp({ Component, pageProps }) {

  const [ authUser, setAuthUser ] = useState({});

  return (
    <UserContext.Provider value={ { authUser, setAuthUser } }>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
export { UserContext };

