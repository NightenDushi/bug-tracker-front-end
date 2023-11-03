let tag_id_increment = 0;
import { ITags } from '../@types/tags'

export let TagsAvailable: ITags[] = []

export function AddTags(pText:string, pColor:string, pCallBack=(_foo:ITags[])=>{}){
    TagsAvailable = [...TagsAvailable, {id:tag_id_increment, text:pText, color:pColor}]
    tag_id_increment += 1;
    pCallBack(TagsAvailable)
}

AddTags("foo", "primary")
AddTags("bar", "warning")
