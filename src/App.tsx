
import {useState} from 'react';
import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import TicketCard from './Tickets/TicketCard.tsx'

interface iTicket{
  draft:boolean,
  urgency:number,
  title:string,
  body:string,
  tags:string[],
  person_assigned:string[],
}

function App() {
  const initial_tickets:iTicket[] = [
    {draft:false, urgency:1, title:"Hello", body:"This is a test", tags:["foo","bar"],person_assigned:["nathan"]},
    {draft:false, urgency:0, title:"Hello", body:"This is a test", tags:["foo","bar"],person_assigned:["nathan"]},
    {draft:false, urgency:2, title:"Hello", body:"This is a test", tags:["foo","bar"],person_assigned:["nathan"]},
    {draft:true, urgency:0, title:"World", body:"I wish I had internet", tags:["foo","bar"],person_assigned:["nathan"]}
  ]
  const [tickets, setTickets] = useState<iTicket[]>(initial_tickets);
  return (
    <>
      <LoggedNavBar />
      <div className="container grid">
        <h1>My tickets</h1>
        <a href="#" className="btn btn-primary mb-3">Create a ticket</a>
        <ul className="nav bg-clear shadow mb-3 rounded-2 p-3">
          <li className="nav-item me-3">
            <label className="me-1">Show only my issues</label>
            <input type="checkbox" className="form-check-input" checked></input>
          </li>
          <li className="nav-item me-3">
            <label className="me-1">Show Drafts</label>
            <input type="checkbox" className="form-check-input" checked></input>
          </li>
          <li className="nav-item me-3">
            <label className="me-1">Show Completed</label>
            <input type="checkbox" className="form-check-input"></input>
          </li>
          <li className="nav-item">
            <label htmlFor="sort_mode">Sort by</label>
            <select name="sort_mode" className="form-control">
              <option value="foo">Importance</option>
              <option value="foo">Due date</option>
            </select>
          </li>
        </ul>
        <TicketCardWrapper tickets={tickets}/>

      </div>
    </>
  )
}
interface iTickets_props{
  tickets:iTicket[]
}
function TicketCardWrapper(props:iTickets_props){
  const urgency_map:string[]=["", "hurry", "urgent"]
  const [show_draft, setShowDraft] = useState<boolean>(true); //TODO:Switch that option to the context API later on
  return (<div className="row gap-0 row-gap-2">
      {
        props.tickets.map(ticket=> !ticket.draft || (ticket.draft && show_draft)?
          <TicketCard title={ticket.title} className={(urgency_map[ticket.urgency])+(ticket.draft?" draft":"")} tags={ticket.tags}>{ticket.body}</TicketCard>
          :<></>
        )
      }
  </div>)
}

// import avatar from '../public/profile/31c88339bc905db98016c725dd3d418a.jpeg';
export default App