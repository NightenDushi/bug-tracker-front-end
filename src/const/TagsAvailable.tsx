import { Dispatch, SetStateAction } from 'react'
import { ITags } from '../@types/tags'

export let TagsAvailable: ITags[] = []

export async function GetTags(pCallBack:Dispatch<SetStateAction<ITags[]>>, pProject_id:number){
    const response = await fetch(`${window.location.origin}/tag?project_id=${pProject_id}`);
    TagsAvailable = await response.json();
    pCallBack(TagsAvailable)
} 
export function AddTags(pText:string, pColor:string, pCallBack=(_foo:ITags[])=>{}){
    const NewTag:ITags = {id:-1, text:pText, color:pColor}
    fetch(window.location.origin+"/tag", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(NewTag)
    }).then((res)=>{
        res.json().then((tag)=>{
            TagsAvailable = [...TagsAvailable, tag]
            pCallBack(TagsAvailable)
        })
    });
    pCallBack(TagsAvailable)
}
let RenameTagTimeOut:ReturnType<typeof setTimeout>;
let LastTagRenamed:number;
export function RenameTags(pTag:ITags, pNewName:string, pCallBack:(prevVar: (ITags[] | ((a:ITags[])=>ITags[]))) => void){
    TagsAvailable = TagsAvailable.map((d)=>{
        if (d.id===pTag.id) d.text = pNewName;
        return d
    })
    pCallBack(TagsAvailable)

    if (LastTagRenamed != pTag.id){
        clearTimeout(RenameTagTimeOut);
        LastTagRenamed=pTag.id;
    }
    RenameTagTimeOut = setTimeout(() => {
        pTag.text = pNewName;
        fetch(window.location.origin+"/tag/"+pTag.id, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(pTag)
        })
    }, 500)
}
export function RecolorTags(pTag:ITags, pNewColor:string, pCallBack=(_foo:ITags[])=>{}){
    pTag.color = pNewColor;
    fetch(window.location.origin+"/tag/"+pTag.id, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(pTag)
    }).then((res)=>{
        res.json().then((tag)=>{
            TagsAvailable = TagsAvailable.map((t)=>{
                if (t.id===tag.id) return tag;
                return t
            })
            pCallBack(TagsAvailable)
        })
    });
}
export function RemoveTags(pId:number, pCallBack=(_foo:ITags[])=>{}, pProjectId:number){
    fetch(`${window.location.origin}/tag/${pId}?project_id=${pProjectId}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin"
    }).then((res)=>{
        res.json().then((tags)=>{
            TagsAvailable = tags;
            pCallBack(TagsAvailable)
        })
    });
}
