import { useState } from 'react';
import { TicketTags } from './Tickets/TicketTags.tsx';


export function NewTicketModal(props: any) {
  const [name, setName] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const tags_available:string[] = [
      "foo", "bar"
  ]
  const [activeTags, setActiveTags] = useState<string[]>([])

  const addticket = ()=>{
      props.addTicket(name, body, activeTags); props.close();
    }

  return <div className={"modal d-block"} tabIndex={-1} role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">New tickets</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.close}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
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
            {tags_available.map((tag, tagId)=>
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
          <button type="button" className="btn btn-primary"
            onClick={() => { addticket() }}
          >Create</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.close}>Close</button>
        </div>
      </div>
    </div>
  </div>;
}
