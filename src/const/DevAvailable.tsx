import { Dispatch, SetStateAction } from 'react'
import { DevType } from '../@types/dev';

export let DevAvailable: DevType[] = [];

// AddDev("nathan", "31c88339bc905db98016c725dd3d418a.jpeg", ()=>{}, true)
// AddDev("tim", "03.41881874.webp")
// AddDev("oliwia", "01.d5f1f706.webp")

export async function GetDev(pCallBack:Dispatch<SetStateAction<DevType[]>>, pSetCurrentUser:Dispatch<SetStateAction<DevType>>, pUserId:number, pProject_id:number){
    const response = await fetch(`${window.location.origin}/user?project_id=${pProject_id}`);
    DevAvailable = await response.json();

    const loggedUser = DevAvailable.find((e)=>e.id==pUserId)||DevAvailable[0];
    pSetCurrentUser(loggedUser)
    pCallBack(DevAvailable);

}

export function AddDev(pName:string, pImage:string, pCallBack=(_foo:DevType[])=>{}, pAdmin=false){
    const NewDev:DevType = {id:-1, name:pName, image:pImage, isAdmin:pAdmin, github_id:null}
    fetch(window.location.origin+"/user", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(NewDev)
    }).then((res)=>{
        res.json().then((dev)=>{
            DevAvailable = [...DevAvailable, dev]
            pCallBack(DevAvailable)
        })
    });
}
export function RemoveDev(pDevId:number, pCallBack=(_foo:DevType[])=>{}, pProject_id:number){
    fetch(`${window.location.origin}/user/${pDevId}?project_id=${pProject_id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
    }).then((res)=>{
        res.json().then((devs)=>{
            DevAvailable = devs;
            pCallBack(DevAvailable)
        })
    });
}

//NOTE(Nathan) This timeout is used to debounce the input's onchange event
let RenameDevTimeOut:ReturnType<typeof setTimeout>;
let LastDevRenamed:number; //Avoid clearing a timer when editing two different name in close interval
export function RenameDev(pDev:DevType, pNewName:string, pCallBack:(prevVar: (DevType[] | ((a:DevType[])=>DevType[]))) => void){
    DevAvailable = DevAvailable.map((d)=>{
        if (d.id===pDev.id) d.name = pNewName;
        return d
    })
    pCallBack(DevAvailable)

    if (LastDevRenamed != pDev.id){
        clearTimeout(RenameDevTimeOut);
        LastDevRenamed=pDev.id;
    }
    RenameDevTimeOut = setTimeout(() => {
        pDev.name = pNewName;
        fetch(window.location.origin+"/user/"+pDev.id, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(pDev)
        })
    }, 500)
}
export function SetAdminDev(pDev:DevType, pNewAdminValue:boolean, pCallBack=(_foo:DevType[])=>{}){
    pDev.isAdmin = pNewAdminValue;
    fetch(window.location.origin+"/user/"+pDev.id, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(pDev)
    }).then((res)=>{
        res.json().then((dev)=>{
            DevAvailable = DevAvailable.map((d)=>{
                if (d.id===dev.id) return dev;
                return d
            })
            pCallBack(DevAvailable)
        })
    });
}