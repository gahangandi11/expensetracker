
import {auth, provider} from "../../config/firebase-config"
import {signInWithPopup} from "firebase/auth"
import {Navigate, useNavigate} from "react-router-dom"
import {useGetUserInfo} from "../../hooks/useGetUserInfo"

import "./style.css"

export const Auth =()=>{

    const navigate=useNavigate();
    const {isAuth}=useGetUserInfo();
     
   const signInwithGoogle= async ()=>{
    try{
    const results= await signInWithPopup(auth,provider);
    const authInfo={
        userId : results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
    };
    localStorage.setItem("auth",JSON.stringify(authInfo));
    navigate("/expense-tracker")
      }
      catch(err)
      {
        console.log(err);
      }
   };

   if(isAuth)
   {
    return <Navigate to="/expense-tracker"/>
   }



    return( <div className="login-page">
        <p>Expense Tracker</p>
        <button className="login-with-google-btn" onClick={signInwithGoogle}>
          {" "}
          sign in with Google
        </button>
    </div>)
}