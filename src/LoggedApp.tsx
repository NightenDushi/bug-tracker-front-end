import { Link } from 'react-router-dom'
import ProjectManagement from './ProjectManagement';

export default function LoggedApp(props:{isLogged:number, setLogged:(_foo:number)=>void}){
    return (
    <>
        <ProjectManagement isLogged={props.isLogged} />
        <Link to="/dashboard/1_default">Project 1</Link>
    </>
    )
}