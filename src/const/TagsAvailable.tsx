import { Dispatch, SetStateAction } from 'react'
import { ITags } from '../@types/tags'

export let TagsAvailable: ITags[] = []

export async function GetTags(pCallBack:Dispatch<SetStateAction<ITags[]>>){
    const response = await fetch("http://localhost:3000/tag");
    TagsAvailable = await response.json();
    pCallBack(TagsAvailable)
} 
export function AddTags(pText:string, pColor:string, pCallBack=(_foo:ITags[])=>{}){
    const NewTag:ITags = {id:-1, text:pText, color:pColor}
    fetch("http://localhost:3000/tag", {
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

export function RenameTags(pId:number, pNewName:string, pCallBack=(_foo:ITags[])=>{}){
    TagsAvailable = TagsAvailable.map((t)=>{
        if (t.id===pId) t.text = pNewName;
        return t
    })
    pCallBack(TagsAvailable)
}
export function RecolorTags(pId:number, pNewColor:string, pCallBack=(_foo:ITags[])=>{}){
    TagsAvailable = TagsAvailable.map((t)=>{
        if (t.id===pId) t.color = pNewColor;
        return t
    })
    pCallBack(TagsAvailable)
}
export function RemoveTags(pId:number, pCallBack=(_foo:ITags[])=>{}){
    TagsAvailable = TagsAvailable.filter((t)=>t.id !== pId)
    pCallBack(TagsAvailable)
}
