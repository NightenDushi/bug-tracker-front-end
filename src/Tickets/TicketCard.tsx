import { useState } from 'react';

import { TicketTags } from './TicketTags.tsx';
import { ITicket, ITicket_props } from '../@types/tickets';
import { DevAvailable } from '../const/DevAvailable.tsx';
import { NewTicketModal } from '../NewTicketModal.tsx';
import './Tickets.css'
import { ITags } from '../@types/tags';

function TicketCard(props:ITicket_props) {
    const {children, isDone, isDraft, isUserAdmin, urgency, title, className, tags, person_assigned, dueDate, completedAction, setTickets} = props;

    //TODO(Nathan) Move this to a new file
    const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)
    
    return (<div className='card col col-sm-6 col-md-4 col-lg-3'>
        <div className={"card-body ticket_card "+className}>
        <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <div>
              {person_assigned.map((dev_name)=>{
                    const dev = DevAvailable.find((e)=> e.name == dev_name)
                    return <img key={dev?.name} className={"img rounded-circle shadow me-2"} width="40" height="40"
                        src={"../public/avatar/"+dev?.image} />
                })}
          </div>
        </div><ul className="nav d-flex mb-2">
            {tags.map(tag=>
                <TicketTags key={tag.id} on={true}>{tag.text}</TicketTags>
                )}
        </ul>
        <p className="card-text">{children}</p>
        <CompletedPublishBtn isDraft={isDraft} isDone={isDone} action={completedAction}/>
        <a href="#" className="btn btn-primary" onClick={()=>{setShowNewTicketModal(true)}}>More...</a>
        </div>
        {showNewTicketModal&&
        (<NewTicketModal close={()=>{setShowNewTicketModal(false)}}
            urgency={urgency} title={title} body={children} isDraft={isDraft}
            isAdmin={isUserAdmin}
            tags={()=>{
                //Convert the ITags[] into string[]
                const TagsString:string[] = []
                tags.map((t)=>{TagsString.push(t.text)})
                return TagsString;
            }}
            person_assigned={person_assigned}
            actionTicketModal={(isUserAdmin)?(pName:string, pBody:string, pUrgency:number, pActiveTags:string[], pIsDraft:boolean, pActiveDev:string[])=>{
                const ticket_tags:ITags[] = []
                pActiveTags.map((t, id)=>{ticket_tags.push({id:id, text:t})})
                
                setTickets((pTickets: ITicket[])=>{
                    const NewTickets = pTickets.map((t, i: number) => {
                        if (t.id != props.id) return t
                        console.log("Updating "+i)
                        const NewTicket =
                        {id:t.id,
                            isDone:false, isDraft:pIsDraft, urgency:pUrgency,
                            title:pName, body:pBody,
                            tags:ticket_tags,
                            person_assigned:pActiveDev};
        
                        return NewTicket;
                    });
        
                    return NewTickets;
                    }
                    
                )
              }:completedAction} 
        />)}
    </div>)
}

function CompletedPublishBtn(props){
    return (<a className="btn btn-secondary shadow me-2 w-50" href="#" onClick={props.action}>{(props.isDraft)?"Publish":((props.isDone)?"Re-enable":"Complete")}</a>)
}

export default TicketCard