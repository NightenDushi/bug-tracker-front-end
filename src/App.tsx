
import { useState, createContext } from 'react';

import { UserType } from './@types/user';
import { ITicket } from './@types/tickets'
import { ITags } from './@types/tags'
import { TicketFilterType } from './@types/ticketfilter'

import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import { NewTicketModal } from './NewTicketModal.tsx';
import { TicketFilter } from './TicketFilter.tsx';
import { TicketCardWrapper } from './TicketCardWrapper.tsx';


export const UserContext = createContext<UserType>({name:"foo", isAdmin:true, setAdmin:(value:boolean)=>{}});
export const TicketFilterContext = createContext<TicketFilterType>({isAdmin:false,showOnlyOwned:false,showCompleted:false,showDraft:false,setOnlyOwned:(value:boolean)=>{}, setCompleted:(value:boolean)=>{}, setDraft:(value:boolean)=>{}});

function App() {
  const initial_tickets:ITicket[] = [
    {id:1,isDone:false, isDraft:false, urgency:1, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"],dueDate:new Date()},
    {id:2,isDone:false, isDraft:false, urgency:0, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["tim"]},
    {id:3,isDone:true, isDraft:false, urgency:1, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]},
    {id:4,isDone:false, isDraft:false, urgency:2, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]},
    {id:5,isDone:false, isDraft:true, urgency:0, title:"World", body:"I wish I had internet", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:["nathan"]}
  ]
  const [tickets, setTickets] = useState<ITicket[]>(initial_tickets);
  
  const [user_is_admin, SetUserAdmin] = useState<boolean>(true);
  const [user_name, SetName] = useState<string>("");
  
  const [showOnlyOwned, setOwned] = useState<boolean>(false);
  const [showCompleted, setCompleted] = useState<boolean>(false);
  const [showDraft, setDraft] = useState<boolean>(false);

  const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)

  return (
    <>
      <UserContext.Provider value={{name:user_name, isAdmin:user_is_admin, setAdmin:SetUserAdmin}}>
        <LoggedNavBar />
      </UserContext.Provider>
      <div className="container grid">
        <h1>My tickets</h1>
        {user_is_admin && (<a href="#" className="btn btn-primary mb-3"
        onClick={()=>{setShowNewTicketModal(true);}}>
          Create a ticket
        </a>)}
        <TicketFilterContext.Provider value={{isAdmin:user_is_admin,
                                            showOnlyOwned:showOnlyOwned,showCompleted:showCompleted,showDraft:showDraft,
                                            setOnlyOwned:setOwned, setCompleted:setCompleted, setDraft:setDraft}}>
          <TicketFilter/>
          <TicketCardWrapper tickets={tickets} setTickets={setTickets} isUserAdmin={user_is_admin}/>
        </TicketFilterContext.Provider>
      </div>
      {showNewTicketModal && (
      <NewTicketModal close={()=>{setShowNewTicketModal(false)}}
        actionTicketModal={(pName:string, pBody:string, pUrgency:number, pActiveTags:string[], pIsDraft:boolean, pActiveDev:string[])=>{
          const ticket_tags:ITags[] = []
          pActiveTags.map((t, id)=>{ticket_tags.push({id:id, text:t})})
          setTickets(
              pTickets=>[
                ...pTickets, {id:pTickets[pTickets.length-1].id+1,
                              isDone:false, isDraft:pIsDraft, urgency:pUrgency,
                              title:pName, body:pBody,
                              tags:ticket_tags,
                              person_assigned:pActiveDev}
              ]
            )
        }} />)}
    </>
  )

}

export default App