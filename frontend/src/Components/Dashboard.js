import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export const Dashboard=()=>{

    const navigate=useNavigate();

    useEffect=(()=>{
        const token=localStorage.getItem("token")
        if(!token){
            navigate("/login")
        }
    },[navigate])
    return(
        <h1>Welcome</h1>
    )
}