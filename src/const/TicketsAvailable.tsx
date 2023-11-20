import { Dispatch, SetStateAction } from 'react'
import { ITicket, ITicketDatabase } from '../@types/tickets'
import { CommentType } from '../@types/comment'
import { ITags } from '../@types/tags'

let ticket_id_increment = 0;
let comment_id_increment = 0;
export let TicketsAvailable:ITicket[] = []

export async function GetTicket(pCallBack:Dispatch<SetStateAction<ITicket[]>>){
    //NOTE: Backend code -> https://github.com/NightenDushi/bug-tracker-node-ts
    const response = await fetch("http://localhost:3000/ticket");
    TicketsAvailable = await response.json();
    TicketsAvailable = ParseTicketsDatabase(TicketsAvailable);
    console.log(TicketsAvailable)
    pCallBack(TicketsAvailable);
}

function ParseTicketsDatabase(pTickets:any[]){
    for (let i=0; i<pTickets.length; i++){
        ParseTicketDatabase(pTickets[i])
    }
    return pTickets
}
function ParseTicketDatabase(pTicket:any){
    if (typeof(pTicket.dueDate) == "string"){
        pTicket.dueDate = new Date((pTicket.dueDate as unknown as string).slice(0,10));
    }
    return pTicket
}

export function AddTicket(pTitle:string, pBody:string, pUrgency:number, pTags:ITags[], 
                        pPersonAssigned:number[], pDueDate:string="", pIsDone=false, pIsDraft=true,
                        pCallBack=(_foo:ITicket[])=>{}){
    const NewTicket:ITicketDatabase = {id:ticket_id_increment,isDone:pIsDone, isDraft:pIsDraft, urgency:pUrgency,
                                title:pTitle, body:pBody,
                                tags:[], person_assigned:pPersonAssigned}
    for (let i=0; i<pTags.length; i++){
        NewTicket.tags.push(pTags[i].id);
    }
    if (pDueDate!=="") NewTicket.dueDate = new Date(pDueDate);
    
    // TicketsAvailable = [...TicketsAvailable, NewTicket]
    fetch("http://localhost:3000/ticket", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(NewTicket)
    }).then((res)=>{
        res.json().then((ticket)=>{
            TicketsAvailable = [...TicketsAvailable, ParseTicketDatabase(ticket)]
            pCallBack(TicketsAvailable)
        })
    });

}

export function RemoveTicket(pTicketId:number, pCallBack=(_foo:ITicket[])=>{}){
    fetch("http://localhost:3000/ticket/"+ pTicketId, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", // include, *same-origin, omit
    }).then((res)=>{
        res.json().then((tickets)=>{
            TicketsAvailable = ParseTicketsDatabase(tickets);
            pCallBack(TicketsAvailable)
        })
    });
}

export function ReplaceTicket(pTicket:ITicket, pTitle:string, pBody:string, pUrgency:number, pTags:number[], 
    pPersonAssigned:number[], pDueDate:string="", pIsDraft=true,
    pCallBack=(_foo:ITicket[])=>{}){

    const NewTicket:ITicketDatabase = {"id":pTicket.id,
                "isDone":pTicket.isDone,

                "isDraft": pIsDraft,
                "urgency": pUrgency,
                "title": pTitle,
                "body": pBody,
                "tags": pTags,
                "person_assigned": pPersonAssigned,
                "dueDate":(pDueDate!=="")? new Date(pDueDate):undefined,
                }

    SendSingleTicket(NewTicket, pCallBack);
    
}
export function MarkcompleteTicket(pTicket:ITicketDatabase, pCallBack=(_foo:ITicket[])=>{}, pIsDone=true){
    pTicket.isDone = pIsDone;

    SendSingleTicket(pTicket, pCallBack);
}
export function PublishTicket(pTicket:ITicketDatabase, pCallBack=(_foo:ITicket[])=>{}){
    pTicket.isDraft = false;

    SendSingleTicket(pTicket, pCallBack);
}

function SendSingleTicket(pTicket: ITicketDatabase, pCallBack: (_foo: ITicket[]) => void) {
    fetch("http://localhost:3000/ticket/" + pTicket.id, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pTicket)
    }).then((res) => {
        res.json().then((ticket) => {
            TicketsAvailable = TicketsAvailable.map((t) => {
                if (t.id == ticket.id) return ParseTicketDatabase(ticket);
                return t;
            });
            pCallBack(TicketsAvailable);
        });
    });
}


export async function GetComments(pTicketId:number, pCallBack=(_foo:CommentType[])=>{}){
    const response = await fetch("http://localhost:3000/comment?ticket_id="+pTicketId);
    const comments = await response.json();
    console.log(comments)
    pCallBack(comments);
}
export function AddCommentTicket(pUserId:number, pTicketId:number, pText:string,
                                pCallBack=(_foo:ITicket[])=>{}){
    const newComment:CommentType = {id:comment_id_increment, senderId:pUserId, body:pText, date:new Date(), likes:[]}
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pTicketId){
            // t.comments.push(newComment);
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
            // t.comments = t.comments.filter((c)=>(c.id!==pCommentId))
        }
        return t
    })
    pCallBack(TicketsAvailable)
}
export function LikeCommentTicket(pUserId:number, pTicketId:number, pCommentId:number,
    pCallBack=(_foo:ITicket[])=>{}){
    TicketsAvailable = TicketsAvailable.map((t)=>{
        if (t.id==pTicketId){
            // for (let i=0; i<t.comments.length; i++){
            //     if (t.comments[i].id == pCommentId){
            //         //Remove or add the user id to the like list
            //         if (!t.comments[i].likes.includes(pUserId)) t.comments[i].likes.push(pUserId)
            //         else t.comments[i].likes = t.comments[i].likes.filter((ids:number)=>ids!=pUserId)
            //         break;
            //     }
            // }
        }
        return t
    })
    pCallBack(TicketsAvailable)
}