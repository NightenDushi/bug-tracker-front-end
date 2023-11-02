import { useState, MouseEvent, KeyboardEvent} from 'react';
import { TicketTags } from './Tickets/TicketTags.tsx';

import { DevAvailable } from './const/DevAvailable.tsx';
import { TagsAvailable } from './const/TagsAvailable.tsx';
import { TicketDueDate } from './Tickets/TicketDueDate.tsx';
import { DevAvatar } from './DevAvatar.tsx';

export function NewTicketModal(props: any) {
  const isAdmin = (props.isAdmin === undefined) ? true : props.isAdmin;

  const [urgency, setUrgency] = useState<number>(props?.urgency||0);
  const [title, setTitle] = useState<string>(props?.title||"");
  const [body, setBody] = useState<string>(props?.body||"");

  const [isDraft, setDraft] = useState<boolean>((props.isDraft === undefined) ? true : props.isDraft);

  const [activeTags, setActiveTags] = useState<string[]>(props?.tags||[])
  const [activeDev, setActiveDev] = useState<string[]>(props?.person_assigned||[])
  
  const [dueDate, setDueDate] = useState<string>(props?.dueDate||"")

  const addticket = (e:(KeyboardEvent|MouseEvent))=>{
        if (isAdmin) {props.actionTicketModal(title, body, urgency, activeTags, isDraft, activeDev, dueDate); props.close()}
        else props.actionTicketModal(e)
    }

  if (isAdmin) return <div className="modal d-block" tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
            <div className="d-flex w-75">
                <h5 className="modal-title align-self-end">New tickets</h5>
                <select id="ticket_urgency" name="sort_mode" className={"form-control w-25 ms-2"+((urgency==1)?" bg-warning text-white":((urgency==2)?" bg-danger text-white":""))} 
                        value={urgency} onChange={(e)=>{setUrgency(parseInt(e.target.value))}}>
                    <option value="0">Standard</option>
                    <option value="1">Hurry</option>
                    <option value="2">Urgent</option>
                </select>

            </div>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <label>Developers</label>
          <div>
              {DevAvailable.map((dev)=>{
                  const dev_activated = (activeDev.includes(dev.name));
                  return    <a key={dev.name} href="#" onClick={()=>{setActiveDev((pDev)=>{
                                //Add or remove the tag from the active tag array
                                if (!dev_activated) return [...pDev, dev.name]
                                else return pDev.filter((e) => { return e !== dev.name })     
                                })}}>
                                <DevAvatar key={dev.name} image={dev.image} activated={dev_activated} deactivatedClass="opacity-25" />
                            </a>
                })}
          </div>
          <label htmlFor="ticket_name">Title</label>
          <input className="form-control" name="ticket_name" id="ticket_name"
            value={title}
            onChange={(e) => { e.preventDefault(); setTitle(e.target.value); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { addticket(e) } }}
            ></input>
          <label htmlFor="ticket_body">Body</label>
          <textarea className="form-control" name="ticket_body" id="ticket_name"
            value={body}
            onChange={(e) => { e.preventDefault(); setBody(e.target.value); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { addticket(e) } }}
          ></textarea>
        </div>

        <div className="container d-flex justify-content-between">
        <ul className="d-flex list-unstyled">
            {TagsAvailable.map((tag)=>
                <a href="#" className="text-decoration-none"
                onClick={()=>{setActiveTags((pTags)=>{
                    //Add or remove the tag from the active tag array
                    if (!activeTags.includes(tag)) return [...pTags, tag]
                    else return pTags.filter((e) => { return e !== tag })     
                })}}
                key={tag}
                >
                    <TicketTags on={(activeTags.includes(tag))}>{tag}</TicketTags>
                </a>
            )}
        </ul>
        <label htmlFor="due_date" className={"w-50 "+((dueDate=="")?"opacity-50":"")}>Due date
        <input id="due_date" className={"form-control"} type="date"
        value={dueDate}
        onChange={(e)=>{setDueDate(e.target.value)}}></input>

        </label>
        </div>

        <div className="modal-footer">
          <label>Keep as draft</label><input type="checkbox" checked={isDraft} onChange={(e)=>{setDraft((e.target.value === 'true'))}}></input>
          <button type="button" className="btn btn-primary"
            onClick={addticket}
          >Create</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  </div>;

  //Not admin, Read-only view
  return <div className="modal d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
            <div className="d-flex w-75">
                <h2 className="modal-title align-self-end">{title}</h2>
                <div className={"form-control w-25 ms-2"+((urgency==1)?" bg-warning text-white":((urgency==2)?" bg-danger text-white":""))} >
                    {(urgency==1)?"Hurry":((urgency==2)?"Urgent":"Standard")}
                </div>

            </div>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <label>Developers</label>
          <div>
              {DevAvailable.map((dev)=>{
                  const dev_activated = (activeDev.includes(dev.name));
                  return <DevAvatar key={dev.name} image={dev.image} activated={dev_activated} deactivatedClass="d-none"/>
                })}
          </div>
          <p className="mt-2">{body}</p>
        </div>

        <div className="container d-flex justify-content-between">
            <ul className="d-flex list-unstyled">
                {TagsAvailable.map((tag)=>
                    <span className={"text-decoration-none"+(activeTags.includes(tag)?"":" d-none")} key={tag}>
                        <TicketTags on={(activeTags.includes(tag))}>{tag}</TicketTags>
                    </span>
                )}
            </ul>
            <TicketDueDate dueDate={new Date(dueDate)}/>
        </div>
        
        <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addticket}>Completed</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  </div>;
}
