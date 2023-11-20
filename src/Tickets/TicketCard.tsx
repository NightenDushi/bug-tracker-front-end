import './Tickets.css'
import { useState, MouseEventHandler } from 'react';

import { TicketTags } from './TicketTags.tsx';
import { ITicket, ITicket_props } from '../@types/tickets';
import { ITags } from '../@types/tags';
import { TicketDueDate } from './TicketDueDate.tsx';

import { DevAvailable } from '../const/DevAvailable.tsx';
import { TagsAvailable } from '../const/TagsAvailable.tsx';
import { ReplaceTicket } from '../const/TicketsAvailable.tsx';

import { NewTicketModal } from '../NewTicketModal.tsx';
import { DevAvatar } from '../DevAvatar.tsx';

import CommentIcon from '../assets/comment-regular.svg'

function TicketCard(props:ITicket_props) {
    const {ticket, isUserAdmin, className, completedAction, setTickets} = props;
    const { id, isDone, isDraft, urgency, title, body, tags, person_assigned, dueDate, comments_number } = ticket

    const MAXCHARACTERS_TICKETBODY = 64

    //TODO(Nathan) Move this to a new file
    const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)

    console.log(comments_number)
    
    return (
    <div className='card col-sm-6 col-md-6 col-lg-4'>
        <div className={"card-body ticket_card "+className}>
        {(comments_number>0)&&(<div className="d-flex position-absolute end-0 top-0 p-2">
            <img src={CommentIcon} alt="Comment icon" width="20" height="20"/>
            <span>{comments_number}</span>
        </div>)}
        <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <div>
              {//NOTE(Nathan) We check for the length because the array is empty until
              //the database query is completed; and .find() returns undefined.
              //    > Apply for the tags as well
              DevAvailable.length>0 && (person_assigned.map((dev_id)=>{
                    const dev = DevAvailable.find((e)=> e.id == dev_id)
                    return (
                        <span key={dev_id} className="me-2">
                            <DevAvatar dev={dev} activated={true} />
                        </span>)
                }))}
          </div>
        </div>

        {TagsAvailable.length>0 && (<ul className="nav d-flex mb-2">
            {tags.map(tagid=>{
                const tag = TagsAvailable.find((t)=>t.id==tagid) as unknown as ITags;
                return <TicketTags key={tagid} on={true} color={tag.color}>{tag.text}</TicketTags>
                })}
        </ul>)}
        <p className="card-text">{(body.length<=MAXCHARACTERS_TICKETBODY)?body:(
            function(){
                //Parital display; cut the body at its last space before the limit
                let last_space_index = MAXCHARACTERS_TICKETBODY
                for (let i=0; i<MAXCHARACTERS_TICKETBODY; i++){
                    if (body[i]==" ") last_space_index=i;
                }
                return body.slice(0,last_space_index)+"..."
            }())
            }</p>
        <CompletedPublishBtn isDraft={isDraft} isDone={isDone} action={completedAction}/>
        <a href="#" className="btn btn-primary" onClick={()=>{setShowNewTicketModal(true)}}>More...</a>
        {(dueDate!==undefined && dueDate!==null) && (<TicketDueDate dueDate={dueDate}/>)}
        </div>
        {showNewTicketModal&&
        (<NewTicketModal close={()=>{setShowNewTicketModal(false)}}
            ticket_id={id} urgency={urgency} title={title} body={body} isDraft={isDraft}
            isAdmin={isUserAdmin} dueDate={dueDate?.toISOString().slice(0,10)}
            
            tags={function(pTags){
                //Convert the ITags[] into string[]
                const TagsString:number[] = []
                pTags.map((t)=>{TagsString.push(t)})
                return TagsString;
            }(tags)}
            person_assigned={person_assigned}
            actionTicketModal={
                (isUserAdmin)?editTicketAction(setTickets, ticket):completedAction}
            setTickets={setTickets}
        />)}
    </div>)
}

function editTicketAction(setTickets: (prevVar: ITicket[] | ((a: ITicket[]) => ITicket[])) => void, pTicket:ITicket) {
    return (pTitle: string, pBody: string, pUrgency: number, pActiveTags: number[],
            pIsDraft: boolean, pActiveDev: number[], pDueDate: string) => {

        ReplaceTicket(pTicket, pTitle, pBody, pUrgency, pActiveTags, pActiveDev, pDueDate, pIsDraft, setTickets)
    };
}
function CompletedPublishBtn(props:{action:MouseEventHandler<HTMLAnchorElement>,isDraft:boolean,isDone:boolean}){
    return (<a className="btn btn-secondary shadow me-2 w-50" href="#" onClick={props.action}>{(props.isDraft)?"Publish":((props.isDone)?"Re-enable":"Complete")}</a>)
}

export default TicketCard