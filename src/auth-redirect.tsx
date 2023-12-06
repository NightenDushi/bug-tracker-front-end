import { useState, useEffect } from "react";
import { Navigate, useParams} from "react-router-dom";
import { DevType } from "./@types/dev";

export default function AuthRedirect(props:{setLogged:(_foo:boolean)=>void}){
    const { service } = useParams();
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("Service used: "+service)
        const usercode = urlParams.get('code');
        console.log("Temporary code: "+usercode);
        if (service=="github"){
            AuthGithub(usercode, setLoaded, props);
        }
        else {
            setLoaded(true);
        }
        // props.setLogged(true)
    }, [])
    
    return (loaded)&&(<Navigate to="/dashboard"/>)||<p>Please wait...</p>
}

function AuthGithub(usercode: string | null, setLoaded:(_foo:boolean)=>void, props: { setLogged: (_foo: boolean) => void; }) {
    fetch(`${window.location.origin}/auth/github?code=${usercode}`).then((res) => {
        res.json().then((user) => {
            setLoaded(true);
            if (user.error) return;

            fetch("https://api.github.com/user",
                {
                    headers: {
                        "Authorization": "Bearer " + user.access_token,
                    }
                })
                .then((res) => {
                    res.json().then((data) => {
                        if (data.message) return;
                        const GitHubUser: DevType = {
                            id: -1, name: data.name, image: data.avatar_url, isAdmin: false, github_id: data.id
                        };
                        fetch(`${window.location.origin}/user/github?id=${data.id}`, {
                            method: "POST",
                            mode: "cors",
                            cache: "no-cache",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(GitHubUser)
                        });
                        props.setLogged(true);
                    });
                });
        });
    });
}
