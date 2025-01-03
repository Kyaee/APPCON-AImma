import { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext(); 

export const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(); 

  useEffect(()=> {

  })

  return (
    <AuthContext.Provider value={{session, setSession}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { 
  return useContext(AuthContext);
}