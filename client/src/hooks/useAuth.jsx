import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../config/supabase.conf'

const AuthContext = createContext(); 

export default function AuthContextProvider({children}) {
  const [session, setSession] = useState(null); 

  const signUpUser = async (email, password) => { 
    const { data, error } = await supabase.auth.signUp({
      email: email.lowerCase(),
      password: password
    })

    if (error) {
      alert("There has been an error", error); 
    }
    return { success: true, data } 
  }

  const signInUser = async (email, password) => { 
    const { data, error } = await supabase.auth.signIn({
      email: email.lowerCase(),
      password: password
    })

    if (error) {
      alert("There has been an error", error); 
    }
    return { success: true, message: "user succesfully created" } 
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error signing out,\n", error)
    }
  }

  useEffect(()=> {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  })  

  return (
    <AuthContext.Provider value={{session, signUpUser, signInUser, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { 
  return useContext(AuthContext);
}