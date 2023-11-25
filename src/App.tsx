
import { useState, useEffect, createContext } from 'react';

import { UserType } from './@types/user';
import { ITicket } from './@types/tickets'
import { ITags } from './@types/tags'
import { TicketFilterType } from './@types/ticketfilter'
import { DevType } from './@types/dev'

import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import { NewTicketModal } from './NewTicketModal.tsx';
import { ModalDevManagement } from './ModalDevManagement.tsx';
import { ModalTagManagement } from './ModalTagManagement.tsx';
import { TicketFilter } from './TicketFilter.tsx';
import { TicketCardWrapper } from './TicketCardWrapper.tsx';

import { TicketsAvailable, AddTicket, GetTicket } from './const/TicketsAvailable.tsx'
import { DevAvailable, GetDev } from './const/DevAvailable.tsx'
import { TagsAvailable, GetTags } from './const/TagsAvailable.tsx'


export const UserContext = createContext<UserType>({id:0, setId:(_value:number)=>{}});
export const TicketFilterContext = createContext<TicketFilterType>({isAdmin:false,showOnlyOwned:-1,showCompleted:false,showDraft:false, sortOrder:"name", setOnlyOwned:(_value:number)=>{}, setCompleted:(_value:boolean)=>{}, setDraft:(_value:boolean)=>{}, setSortOrder:(_value:("name"|"urgency"|"date"))=>{}});

function App() {
  
  const [tickets, setTickets] = useState<ITicket[]>(TicketsAvailable);
  const [devs, setDevs] = useState<DevType[]>(DevAvailable);
  
  const [user_id, setUserId] = useState<number>(1);
  const [currentUser, setCurrentUser] = useState<DevType>({id:1,name:"", image:"", isAdmin:false});
  
  const [tags, setTags] = useState<ITags[]>(TagsAvailable);
  
  const [showOnlyOwned, setOwned] = useState<number>(-1);
  const [showCompleted, setCompleted] = useState<boolean>(false);
  const [showDraft, setDraft] = useState<boolean>(false);
  
  const [sortOrder, setSortOrder] = useState<("name"|"urgency"|"date")>("name");

  const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)
  const [showModalDev, setShowModalDev] = useState<boolean>(false);
  const [showModalTag, setShowModalTag] = useState<boolean>(false);

  useEffect(() => {
    GetTicket(setTickets);
    GetDev(setDevs, setCurrentUser, user_id);
    GetTags(setTags)
  }, [])

  return (
    <>
      <UserContext.Provider value={{id:user_id, setId:setUserId}}>
        <LoggedNavBar isAdmin={currentUser.isAdmin} setShowModalDev={()=>{setShowModalDev(true)}} setShowModalTag={()=>{setShowModalTag(true)}} />
        <div className="container grid">
          <h1>My tickets</h1>
          {currentUser.isAdmin && (<a href="#" className="btn btn-primary mb-3"
          onClick={()=>{setShowNewTicketModal(true);}}>
            Create a ticket
          </a>)}
          <TicketFilterContext.Provider value={{isAdmin:currentUser.isAdmin,
                                              showOnlyOwned:showOnlyOwned,showCompleted:showCompleted,showDraft:showDraft,sortOrder:sortOrder,
                                              setOnlyOwned:setOwned, setCompleted:setCompleted, setDraft:setDraft, setSortOrder:setSortOrder}}>
            <TicketFilter/>
            <TicketCardWrapper tickets={tickets} setTickets={setTickets} isUserAdmin={currentUser.isAdmin}/>
          </TicketFilterContext.Provider>
        </div>
        {showModalDev && (
        <ModalDevManagement close={()=>{setShowModalDev(false)}} tickets={tickets} setTickets={setTickets} user_id={user_id}/>)}
        
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