import { Dispatch, SetStateAction } from 'react'
import { ITags } from '../@types/tags'

let tag_id_increment = 0;

export let TagsAvailable: ITags[] = []

export async function GetTags(pCallBack:Dispatch<SetStateAction<ITags[]>>){
    const response = await fetch("http://localhost:3000/ticket");
    TagsAvailable = await response.json();
    pCallBack(TagsAvailable)
} 
export function AddTags(pText:string, pColor:string, pCallBack=(_foo:ITags[])=>{}){
    TagsAvailable = [...TagsAvailable, {id:tag_id_increment, text:pText, color:pColor}]
    tag_id_increment += 1;
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

AddTags("foo", "primary")
AddTags("bar", "warning")
