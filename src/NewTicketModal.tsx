import { useState } from 'react';
import { TicketTags } from './Tickets/TicketTags.tsx';

import { DevAvailable } from './const/DevAvailable.tsx';
import { TagsAvailable } from './const/TagsAvailable.tsx';

export function NewTicketModal(props: any) {
  const [urgency, setUrgency] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [isDraft, setDraft] = useState<boolean>(true);

  const [activeTags, setActiveTags] = useState<string[]>([])
  const [activeDev, setActiveDev] = useState<string[]>([])

  const addticket = ()=>{
      props.addTicket(name, body, urgency, activeTags, isDraft, activeDev); props.close();
    }

  return <div className={"modal d-block"} tabIndex={-1} role="dialog">
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
                                <img className={"img rounded-circle shadow me-2 "+(dev_activated?"":"opacity-25")} width="40" height="40"
                                    src={"../public/avatar/"+dev.image} />
                            </a>
                })}
          </div>
          <label htmlFor="ticket_name">Title</label>
          <input className="form-control" name="ticket_name" id="ticket_name"
            onChange={(e) => { e.preventDefault(); setName(e.target.value); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { addticket() } }}
          ></input>
          <label htmlFor="ticket_body">Body</label>
          <textarea className="form-control" name="ticket_body" id="ticket_name"
            onChange={(e) => { e.preventDefault(); setBody(e.target.value); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { addticket() } }}
          ></textarea>
        </div>

        <ul className="container d-flex list-unstyled">
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

        <div className="modal-footer">
          <label>Keep as draft</label><input type="checkbox" checked={isDraft} onChange={(e)=>{setDraft((e.target.value === 'true'))}}></input>
          <button type="button" className="btn btn-primary"
            onClick={() => { addticket() }}
          >Create</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  </div>;
}
