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


function TicketCard(props:ITicket_props) {
    const {ticket, isUserAdmin, className, completedAction, setTickets} = props;
    const { id, isDone, isDraft, urgency, title, body, tags, person_assigned, dueDate } = ticket

    //TODO(Nathan) Move this to a new file
    const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)
    
    return (<div className='card col-sm-6 col-md-4 col-lg-3'>
        <div className={"card-body ticket_card "+className}>
        <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <div>
              {person_assigned.map((dev_id)=>{
                    const dev = DevAvailable.find((e)=> e.id == dev_id)
                    return (
                        <span key={dev?.id} className="me-2">
                            <DevAvatar dev={dev} activated={true} />
                        </span>)
                })}
          </div>
        </div>
        <ul className="nav d-flex mb-2">
            {tags.map(tag=>
                <TicketTags key={tag.id} on={true} color={tag.color}>{tag.text}</TicketTags>
                )}
        </ul>
        <p className="card-text">{body}</p>
        <CompletedPublishBtn isDraft={isDraft} isDone={isDone} action={completedAction}/>
        <a href="#" className="btn btn-primary" onClick={()=>{setShowNewTicketModal(true)}}>More...</a>
        <TicketDueDate dueDate={dueDate}/>
        </div>
        {showNewTicketModal&&
        (<NewTicketModal close={()=>{setShowNewTicketModal(false)}}
            urgency={urgency} title={title} body={body} isDraft={isDraft}
            isAdmin={isUserAdmin} dueDate={dueDate?.toISOString().slice(0,10)}
            
            tags={function(pTags){
                //Convert the ITags[] into string[]
                const TagsString:number[] = []
                pTags.map((t)=>{TagsString.push(t.id)})
                return TagsString;
            }(tags)}
            person_assigned={person_assigned}
            actionTicketModal={
                (isUserAdmin)?editTicketAction(setTickets, id):completedAction} 
        />)}
    </div>)
}

function editTicketAction(setTickets: (prevVar: ITicket[] | ((a: ITicket[]) => ITicket[])) => void, ticketId:number) {
    return (pTitle: string, pBody: string, pUrgency: number, pActiveTags: number[],
            pIsDraft: boolean, pActiveDev: number[], pDueDate: string) => {
        const ticket_tags: ITags[] = [];
        pActiveTags.map((t) => { ticket_tags.push(
            TagsAvailable.find((tag)=>(t == tag.id)) as ITags //To avoid undefined warning
        ); });

        ReplaceTicket(ticketId, pTitle, pBody, pUrgency, ticket_tags, pActiveDev, pDueDate, pIsDraft, setTickets)
    };
}
function CompletedPublishBtn(props:{action:MouseEventHandler<HTMLAnchorElement>,isDraft:boolean,isDone:boolean}){
    return (<a className="btn btn-secondary shadow me-2 w-50" href="#" onClick={props.action}>{(props.isDraft)?"Publish":((props.isDone)?"Re-enable":"Complete")}</a>)
}

export default TicketCard