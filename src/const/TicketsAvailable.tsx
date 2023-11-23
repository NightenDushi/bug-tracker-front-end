import { Dispatch, SetStateAction, } from 'react'
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
    pCallBack(comments);
}
export function AddCommentTicket(pUserId:number, pTicketId:number, pText:string,
                                pCallBack:Dispatch<SetStateAction<CommentType[]>>){
    const newComment:CommentType = {id:comment_id_increment, ticketId:pTicketId, senderId:pUserId,
                                    body:pText, date:(new Date()).toISOString(), likes:[]}
    fetch("http://localhost:3000/comment/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment)
    }).then((res) => {
        res.json().then((comment) => {
            pCallBack((pAllComment)=>[...pAllComment, comment]);
        });
    });
}
export function RemoveCommentTicket(pTicketId:number, pCommentId:number,
                                    pCallBack:Dispatch<SetStateAction<CommentType[]>>){
    fetch("http://localhost:3000/comment/"+pCommentId+"?ticket_id="+pTicketId, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    }).then((res) => {
        res.json().then((comments) => {
            pCallBack(comments);
        });
    });
}
export function LikeCommentTicket(pUserId:number, pTicketId:number, pCommentId:number,
    pCallBack:Dispatch<SetStateAction<CommentType[]>>){
    fetch("http://localhost:3000/comment/like/" + pCommentId+"?ticket_id="+pTicketId, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId:pUserId})
    }).then((res) => {
        res.json().then((comment) => {
            pCallBack((COMMENTS)=>{
                return COMMENTS.map((c)=>{
                    if (c.id == comment.id) return comment;
                    return c
                })
            });
        });
    });
}