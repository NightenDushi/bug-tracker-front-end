import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function AuthRedirect(props:{setLogged:(_foo:boolean)=>void}){
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const usercode = urlParams.get('code');
        console.log("Temporary code: "+usercode);
        props.setLogged(true)
    }, [])
    
    return <Navigate to="/dashboard"/>
}