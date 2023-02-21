import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Components/Context/AuthContext";

function Protected({children}) {
    const {user} = UserContext()
if (!user){
    return <Navigate to="/" />
}

  return children;
}

export default Protected;
