import { Dispatch, SetStateAction } from 'react'
import { DevType } from '../@types/dev';
let dev_id_increment = 0;

export let DevAvailable: DevType[] = [];

// AddDev("nathan", "31c88339bc905db98016c725dd3d418a.jpeg", ()=>{}, true)
// AddDev("tim", "03.41881874.webp")
// AddDev("oliwia", "01.d5f1f706.webp")

export async function GetDev(pCallBack:Dispatch<SetStateAction<DevType[]>>, pSetCurrentUser:Dispatch<SetStateAction<DevType>>, pUserId:number){
    const response = await fetch("http://localhost:3000/user");
    DevAvailable = await response.json();
    // console.log(DevAvailable)

    const loggedUser = DevAvailable.find((e)=>e.id==pUserId)||DevAvailable[0];
    pSetCurrentUser(loggedUser)
    pCallBack(DevAvailable);

}

export function AddDev(pName:string, pImage:string, pCallBack=(_foo:DevType[])=>{}, pAdmin=false){
    DevAvailable = [...DevAvailable, {id:dev_id_increment, name:pName, image:pImage, isAdmin:pAdmin}]
    dev_id_increment += 1;
    pCallBack(DevAvailable)
}
export function RemoveDev(pDevId:number, pCallBack=(_foo:DevType[])=>{}){
    DevAvailable = DevAvailable.filter((d)=>d.id !== pDevId)
    pCallBack(DevAvailable)
}
export function RenameDev(pDevId:number, pNewName:string, pCallBack:(prevVar: (DevType[] | ((a:DevType[])=>DevType[]))) => void){
    DevAvailable = DevAvailable.map((d)=>{
        if (d.id===pDevId) d.name = pNewName;
        return d
    })
    pCallBack(DevAvailable)
}
export function SetAdminDev(pDevId:number, pNewAdminValue:boolean, pCallBack=(_foo:DevType[])=>{}){
    DevAvailable = DevAvailable.map((d)=>{
        if (d.id===pDevId) d.isAdmin = pNewAdminValue;
        return d
    })
    pCallBack(DevAvailable)
}