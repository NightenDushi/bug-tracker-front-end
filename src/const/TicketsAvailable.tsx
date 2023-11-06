import { ITicket } from '../@types/tickets'
import { CommentType } from '../@types/comment'
import { ITags } from '../@types/tags'
import { TagsAvailable } from '../const/TagsAvailable.tsx'

let ticket_id_increment = 0;
let comment_id_increment = 0;
export let TicketsAvailable:ITicket[] = []

export function AddTicket(pTitle:string, pBody:string, pUrgency:number, pTags:ITags[], 
                        pPersonAssigned:number[], pDueDate:string="", pIsDone=false, pIsDraft=true,
                        pCallBack=(_foo:ITicket[])=>{}){
    const NewTicket:ITicket = {id:ticket_id_increment,isDone:pIsDone, isDraft:pIsDraft, urgency:pUrgency,
        title:pTitle, body:pBody,
        tags:pTags,
                                person_assigned:pPersonAssigned,
                                comments:[]}
    if (pDueDate!=="") NewTicket.dueDate = new Date(pDueDate);
    
    TicketsAvailable = [...TicketsAvailable, NewTicket]
        
    ticket_id_increment += 1;
    pCallBack(TicketsAvailable)
}

export function ReplaceTicket(pId:number, pTitle:string, pBody:string, pUrgency:number, pTags:ITags[], 
    pPersonAssigned:number[], pDueDate:string="", pIsDraft=true,
    pCallBack=(_foo:ITicket[])=>{}){
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pId){
            t.isDraft = pIsDraft;
            t.urgency = pUrgency;
            t.title = pTitle;
            t.body = pBody;
            t.tags = pTags;
            t.person_assigned = pPersonAssigned;
            if (pDueDate!=="") t.dueDate = new Date(pDueDate)
            else t.dueDate = undefined;
        }
        return t
    })
    pCallBack(TicketsAvailable)
    
}
export function MarkcompleteTicket(pId:number, pCallBack=(_foo:ITicket[])=>{}, pIsDone=true){
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pId){
            t.isDone = pIsDone;
        }
        return t
    })
    pCallBack(TicketsAvailable)
}
export function PublishTicket(pId:number, pCallBack=(_foo:ITicket[])=>{}){
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pId){
            t.isDraft = false;
        }
        return t
    })
    pCallBack(TicketsAvailable)
}

export function AddCommentTicket(pUserId:number, pTicketId:number, pText:string,
                                pCallBack=(_foo:ITicket[])=>{}){
    const newComment:CommentType = {id:comment_id_increment, senderId:pUserId, body:pText, date:new Date(), likes:[]}
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pTicketId){
            t.comments.push(newComment);
        }
        return t
    })
    
    comment_id_increment += 1;
    pCallBack(TicketsAvailable)
}
export function RemoveCommentTicket(pTicketId:number, pCommentId:number,
                                    pCallBack=(_foo:ITicket[])=>{}){
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pTicketId){
            t.comments = t.comments.filter((c)=>(c.id!==pCommentId))
        }
        return t
    })
    pCallBack(TicketsAvailable)
}
export function LikeCommentTicket(pUserId:number, pTicketId:number, pCommentId:number,
    pCallBack=(_foo:ITicket[])=>{}){
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pTicketId){
            for (let i=0; i<t.comments.length; i++){
                if (t.comments[i].id == pCommentId){
                    //Remove or add the user id to the like list
                    if (!t.comments[i].likes.includes(pUserId)) t.comments[i].likes.push(pUserId)
                    else t.comments[i].likes = t.comments[i].likes.filter((ids:number)=>ids!=pUserId)
                    break;
                }
            }
        }
        return t
    })
    pCallBack(TicketsAvailable)
}

AddTicket("Bug on the front page", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque turpis at diam mattis vehicula. Aenean nec eros in lorem condimentum sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed orci eget ligula accumsan fringilla. Aliquam ultrices convallis gravida. Nulla facilisi. Integer leo arcu, volutpat ac enim at, fermentum pulvinar eros.",
        1, [TagsAvailable[0],TagsAvailable[1]], [0],
            "2023-11-01", false, false)
AddTicket("Bad performance when reloading", "This is another test", 0, [TagsAvailable[0]], [1],
            "", false, false)
AddTicket("Test not passing", "This was a test", 0, [TagsAvailable[0], TagsAvailable[1]], [0],
            "", true, false)
AddTicket("UI qwirks", "This is a test", 2, [TagsAvailable[0], TagsAvailable[1]], [2],
            "", false, false)
AddTicket("Next feature", "I will publish this later", 0, [TagsAvailable[1]], [0],
            "", false, true)