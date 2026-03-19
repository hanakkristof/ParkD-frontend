import { useContext } from "react";
import { Navigate } from "react-router";
import { MyUserContext } from "../context/MyUserProvider";

export const ProtectedRoute = ({children}) => {
    const {user} =useContext(MyUserContext)
    if(!user){
        return <Navigate to="/" replace/>
    }

  return children;
}