

export default function LandingPage(props:{setLogged:(_foo:boolean)=>void}){
    return (
        <>
        <div className="container">
            <h1>BUG MINE</h1>
            <p>hello</p>
            <a href="#" onClick={()=>{props.setLogged(true)}}>Login</a>
        </div>
        </>
    )
}