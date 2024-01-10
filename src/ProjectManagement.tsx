import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { GetProjects } from './const/ProjectAvailable';
import ProjectType from './@types/project'

export default function ProjectManagement(props:{isLogged:number}){
    const [ projects, setProjects] = useState<ProjectType[]>([]);

    useEffect(() => {
        GetProjects(setProjects, props.isLogged);
      }, [])

    return (
    <>
    {(props.isLogged==-1) && <Navigate to="/" />}
    <div className="container">
        <h2>Project Management</h2>
        <div className="row">
            <div className="col shadow">
                <p>Project you own:</p>
                <ul>
                {projects.map((p)=>{if(p.owner_id==props.isLogged) return <li key={p.id}><Link to={`${p.id}_${p.name}`}>{p.name}</Link></li>})}
                </ul>
            </div>
            <div className="col shadow">
                <p>Project you are a part of:</p>
                <ul>
                {projects.map((p)=>{if(p.owner_id!=props.isLogged) return <li key={p.id}><Link to={`${p.id}_${p.name}`}>{p.name}</Link></li>})}
                </ul>
            </div>
        </div>
        <a className="btn btn-primary mt-4" onClick={(_e)=>{console.log("new project!")}}>Create a new project</a>
    </div>
    </>
    )
}