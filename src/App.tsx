
import { useState, createContext } from 'react';

import { UserType } from './@types/user';
import { ITicket } from './@types/tickets'
import { ITags } from './@types/tags'
import { TicketFilterType } from './@types/ticketfilter'

import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import { NewTicketModal } from './NewTicketModal.tsx';
import { ModalDevManagement } from './ModalDevManagement.tsx';
import { TicketFilter } from './TicketFilter.tsx';
import { TicketCardWrapper } from './TicketCardWrapper.tsx';

import { DevAvailable } from './const/DevAvailable.tsx'


export const UserContext = createContext<UserType>({id:0, setId:(_value:number)=>{}});
export const TicketFilterContext = createContext<TicketFilterType>({isAdmin:false,showOnlyOwned:-1,showCompleted:false,showDraft:false, sortOrder:"name", setOnlyOwned:(_value:number)=>{}, setCompleted:(_value:boolean)=>{}, setDraft:(_value:boolean)=>{}, setSortOrder:(_value:("name"|"urgency"|"date"))=>{}});

function App() {
  const initial_tickets:ITicket[] = [
    {id:1,isDone:false, isDraft:false, urgency:1, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:[0],dueDate:new Date("2023-11-01")},
    {id:2,isDone:false, isDraft:false, urgency:0, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:[1]},
    {id:3,isDone:true, isDraft:false, urgency:1, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:[0]},
    {id:4,isDone:false, isDraft:false, urgency:2, title:"Hello", body:"This is a test", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:[2]},
    {id:5,isDone:false, isDraft:true, urgency:0, title:"World", body:"I wish I had internet", tags:[{id:1, text:"foo"},{id:2,text:"bar"}],person_assigned:[1]}
  ]
  const [tickets, setTickets] = useState<ITicket[]>(initial_tickets);
  
  const [user_id, setUserId] = useState<number>(0);
  const user = DevAvailable.find((e)=>e.id==user_id)||DevAvailable[0];
  
  const [showOnlyOwned, setOwned] = useState<number>(-1);
  const [showCompleted, setCompleted] = useState<boolean>(false);
  const [showDraft, setDraft] = useState<boolean>(false);
  
  const [sortOrder, setSortOrder] = useState<("name"|"urgency"|"date")>("name");

  const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)
  const [showModalDev, setShowModalDev] = useState<boolean>(false);

  return (
    <>
      <UserContext.Provider value={{id:user_id, setId:setUserId}}>
        <LoggedNavBar isAdmin={user.isAdmin} setShowModalDev={()=>{setShowModalDev(true)}} />
      </UserContext.Provider>
      <div className="container grid">
        <h1>My tickets</h1>
        {user.isAdmin && (<a href="#" className="btn btn-primary mb-3"
        onClick={()=>{setShowNewTicketModal(true);}}>
          Create a ticket
        </a>)}
        <TicketFilterContext.Provider value={{isAdmin:user.isAdmin,
                                            showOnlyOwned:showOnlyOwned,showCompleted:showCompleted,showDraft:showDraft,sortOrder:sortOrder,
                                            setOnlyOwned:setOwned, setCompleted:setCompleted, setDraft:setDraft, setSortOrder:setSortOrder}}>
          <TicketFilter user_id={user_id}/>
          <TicketCardWrapper tickets={tickets} setTickets={setTickets} isUserAdmin={user.isAdmin}/>
        </TicketFilterContext.Provider>
      </div>
      {showModalDev && (
      <ModalDevManagement user_id={user_id} close={()=>{setShowModalDev(false)}} tickets={tickets} setTickets={setTickets} />)}
      
      {showNewTicketModal && (
      <NewTicketModal close={()=>{setShowNewTicketModal(false)}}
        actionTicketModal={
        (pName:string, pBody:string, pUrgency:number, pActiveTags:string[], pIsDraft:boolean, pActiveDev:number[])=>{
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
        }}
        />)}
    </>
  )

}

export default App