import { Navigate, useOutlet, Link } from 'react-router-dom'

export default function LandingPage(props:{isLogged:boolean, setLogged:(_foo:boolean)=>void}){
    const outlet = useOutlet()

    return (
        <>
        {(props.isLogged) && <Navigate to="/dashboard" />}
        <div className="container">
            <h1>BUG MIͶE</h1>
            <p>Dig into a better product, as a team</p>
            {outlet ||<Link to={"/login"}>Login</Link>}
            
            {/* <a href="#" onClick={()=>{props.setLogged(true)}}>Login</a> */}
        </div>
        </>
    )
}