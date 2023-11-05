
import { useState, createContext } from 'react';

import { UserType } from './@types/user';
import { ITicket } from './@types/tickets'
import { ITags } from './@types/tags'
import { TicketFilterType } from './@types/ticketfilter'

import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import { NewTicketModal } from './NewTicketModal.tsx';
import { ModalDevManagement } from './ModalDevManagement.tsx';
import { ModalTagManagement } from './ModalTagManagement.tsx';
import { TicketFilter } from './TicketFilter.tsx';
import { TicketCardWrapper } from './TicketCardWrapper.tsx';

import { TicketsAvailable, AddTicket } from './const/TicketsAvailable.tsx'
import { DevAvailable } from './const/DevAvailable.tsx'
import { TagsAvailable } from './const/TagsAvailable.tsx'


export const UserContext = createContext<UserType>({id:0, setId:(_value:number)=>{}});
export const TicketFilterContext = createContext<TicketFilterType>({isAdmin:false,showOnlyOwned:-1,showCompleted:false,showDraft:false, sortOrder:"name", setOnlyOwned:(_value:number)=>{}, setCompleted:(_value:boolean)=>{}, setDraft:(_value:boolean)=>{}, setSortOrder:(_value:("name"|"urgency"|"date"))=>{}});

function App() {
  const [tickets, setTickets] = useState<ITicket[]>(TicketsAvailable);
  
  const [user_id, setUserId] = useState<number>(0);
  const user = DevAvailable.find((e)=>e.id==user_id)||DevAvailable[0];
  
  const [showOnlyOwned, setOwned] = useState<number>(-1);
  const [showCompleted, setCompleted] = useState<boolean>(false);
  const [showDraft, setDraft] = useState<boolean>(false);
  
  const [sortOrder, setSortOrder] = useState<("name"|"urgency"|"date")>("name");

  const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)
  const [showModalDev, setShowModalDev] = useState<boolean>(false);
  const [showModalTag, setShowModalTag] = useState<boolean>(false);

  return (
    <>
      <UserContext.Provider value={{id:user_id, setId:setUserId}}>
        <LoggedNavBar isAdmin={user.isAdmin} setShowModalDev={()=>{setShowModalDev(true)}} setShowModalTag={()=>{setShowModalTag(true)}} />
        <div className="container grid">
          <h1>My tickets</h1>
          {user.isAdmin && (<a href="#" className="btn btn-primary mb-3"
          onClick={()=>{setShowNewTicketModal(true);}}>
            Create a ticket
          </a>)}
          <TicketFilterContext.Provider value={{isAdmin:user.isAdmin,
                                              showOnlyOwned:showOnlyOwned,showCompleted:showCompleted,showDraft:showDraft,sortOrder:sortOrder,
                                              setOnlyOwned:setOwned, setCompleted:setCompleted, setDraft:setDraft, setSortOrder:setSortOrder}}>
            <TicketFilter/>
            <TicketCardWrapper tickets={tickets} setTickets={setTickets} isUserAdmin={user.isAdmin}/>
          </TicketFilterContext.Provider>
        </div>
        {showModalDev && (
        <ModalDevManagement close={()=>{setShowModalDev(false)}} tickets={tickets} setTickets={setTickets} />)}
        
        {showNewTicketModal && (
        <NewTicketModal close={()=>{setShowNewTicketModal(false)}}
          actionTicketModal={
          (pTitle:string, pBody:string, pUrgency:number, pActiveTags:number[], pIsDraft:boolean, pActiveDev:number[], pDueDate:string)=>{
            const ticket_tags:ITags[] = []
            pActiveTags.map((t)=>{ticket_tags.push(
              TagsAvailable.find((tag)=>(t == tag.id)) as ITags //To avoid undefined warning
            )})
            AddTicket(pTitle,pBody,pUrgency,ticket_tags,pActiveDev,pDueDate,false,pIsDraft,setTickets)
          }}
          />)}
        </UserContext.Provider>
        {showModalTag && (
          <ModalTagManagement close={()=>{setShowModalTag(false)}} tickets={tickets} setTickets={setTickets}/>
        )}
    </>
  )

}

export default App