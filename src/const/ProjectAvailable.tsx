import { Dispatch, SetStateAction, } from 'react'
import ProjectType from '../@types/project'

export async function GetProjects(pCallBack:Dispatch<SetStateAction<ProjectType[]>>, pUserId:number){
    const response = await fetch(`http://localhost:3002/project?user_id=${pUserId}`);
    const projects = await response.json();
    pCallBack(projects);
}