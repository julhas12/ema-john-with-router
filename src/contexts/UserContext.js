import React, { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../firebase/firebae.config";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);
const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)


  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth,currentUser =>{
      console.log('currentUser user',currentUser);
      setUser(currentUser)
      setLoading(false)
    })
    return ()=>unSubscribe()
  },[])

  const authInfo = { user, createUser, signIn,logOut ,loading};
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
