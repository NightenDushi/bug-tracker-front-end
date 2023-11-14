import { Dispatch, SetStateAction } from 'react'
import { ITicket } from '../@types/tickets'
import { CommentType } from '../@types/comment'
import { ITags } from '../@types/tags'

let ticket_id_increment = 0;
let comment_id_increment = 0;
export let TicketsAvailable:ITicket[] = []

export async function GetTicket(pCallBack:Dispatch<SetStateAction<ITicket[]>>){
    //NOTE: Backend code -> https://github.com/NightenDushi/bug-tracker-node-ts
    const response = await fetch("http://localhost:3000/ticket");
    TicketsAvailable = await response.json();
    for (let i=0; i<TicketsAvailable.length; i++){
        if (typeof(TicketsAvailable[i].dueDate)=="string"){
            TicketsAvailable[i].dueDate = new Date((TicketsAvailable[i].dueDate as unknown as string).slice(0,10));
        }
    }
    // console.log(TicketsAvailable);
    pCallBack(TicketsAvailable);
}

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