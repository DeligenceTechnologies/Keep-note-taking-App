import { useContext, createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
const [userId,setUserId]= useState(null)

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
 

//  console.log("----2--",auth)
//  console.log("------------1-------", auth.currentUser);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {


    return signOut(auth);
    
  };

  const phoneSignIn =(number)=>{

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    if(!recaptchaVerifier){
      recaptchaVerifier.render();
    }
    
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserId(currentUser.uid)
    });
    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <AuthContext.Provider
      value={{ googleSignIn, logout,phoneSignIn, user,userId, logIn, createUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserContext = () => {
  return useContext(AuthContext);
};
