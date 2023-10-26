
import { useState, useContext, createContext } from 'react';

import { UserType } from './@types/user';
import { ITicket, ITickets_props } from './@types/tickets'
import { TicketFilterType } from './@types/ticketfilter'

import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import TicketCard from './Tickets/TicketCard.tsx'


export const UserContext = createContext<UserType>({name:"foo", isAdmin:true, setAdmin:(value:boolean)=>{}});
export const TicketFilterContext = createContext<TicketFilterType>({isAdmin:false,showOnlyOwned:false,showCompleted:false,showDraft:false,setOnlyOwned:(value:boolean)=>{}, setCompleted:(value:boolean)=>{}, setDraft:(value:boolean)=>{}});

function App() {
  const initial_tickets:ITicket[] = [
    {id:1,isDone:false, draft:false, urgency:1, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]},
    {id:2,isDone:false, draft:false, urgency:0, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]},
    {id:3,isDone:true, draft:false, urgency:1, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]},
    {id:4,isDone:false, draft:false, urgency:2, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]},
    {id:5,isDone:false, draft:true, urgency:0, title:"World", body:"I wish I had internet", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]}
  ]
  const [tickets, setTickets] = useState<ITicket[]>(initial_tickets);
  
  const [user_is_admin, SetUserAdmin] = useState<boolean>(true);
  const [user_name, SetName] = useState<string>("");
  
  const [showOnlyOwned, setOwned] = useState<boolean>(false);
  const [showCompleted, setCompleted] = useState<boolean>(false);
  const [showDraft, setDraft] = useState<boolean>(false);

  return (
    <>
      <UserContext.Provider value={{name:user_name, isAdmin:user_is_admin, setAdmin:SetUserAdmin}}>
        <LoggedNavBar />
      </UserContext.Provider>
      <div className="container grid">
        <h1>My tickets</h1>
        {user_is_admin && (<a href="#" className="btn btn-primary mb-3">Create a ticket</a>)}
        <TicketFilterContext.Provider value={{isAdmin:user_is_admin,
                                            showOnlyOwned:showOnlyOwned,showCompleted:showCompleted,showDraft:showDraft,
                                            setOnlyOwned:setOwned, setCompleted:setCompleted, setDraft:setDraft}}>
        <ul className="nav bg-clear shadow mb-3 rounded-2 p-3">
          <li className="nav-item me-3">
            <label className="me-1" htmlFor="owned">Show only my issues</label>
            <input type="checkbox" className="form-check-input" id="owned" name="owned" defaultChecked></input>
          </li>
          {user_is_admin && (<li className="nav-item me-3">
            <label className="me-1" htmlFor="draft">Show Drafts</label>
            <input type="checkbox" className="form-check-input" id="draft" name="draft" checked={showDraft} onChange={()=>{setDraft(!showDraft)}}></input>
          </li>)}
          <li className="nav-item me-3">
            <label className="me-1" htmlFor="completed">Show Completed</label>
            <input type="checkbox" className="form-check-input" id="completed" name="completed" checked={showCompleted} onChange={()=>{setCompleted(!showCompleted)}}></input>
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
        </TicketFilterContext.Provider>

      </div>
    </>
  )
}

function TicketCardWrapper(props:ITickets_props){
  const urgency_map:string[]=["", "hurry", "urgent"]
  const {isAdmin, showDraft, showCompleted} = useContext(TicketFilterContext); //TODO:Switch that option to the context API later on
  return (<div className="row gap-0 row-gap-2">
      {
        props.tickets.map(ticket=> (!ticket.draft || (ticket.draft && (showDraft&&isAdmin)))
                                &&(!ticket.isDone || (ticket.isDone && showCompleted))?
          <TicketCard key={ticket.id} title={ticket.title} className={(urgency_map[ticket.urgency])+(ticket.draft?" draft":"")+(ticket.isDone?" done":"")} tags={ticket.tags}>{ticket.body}</TicketCard>
          :<></>
        )
      }
  </div>)
}

export default App