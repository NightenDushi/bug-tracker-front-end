import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom'

import { ITicket } from './@types/tickets'
import { ITags } from './@types/tags'
import { DevType } from './@types/dev'

import { UserContext, TicketFilterContext } from './Context.tsx';

import LoggedNavBar from './LoggedNavBar.tsx'
import { NewTicketModal } from './NewTicketModal.tsx';
import { ModalDevManagement } from './ModalDevManagement.tsx';
import { ModalTagManagement } from './ModalTagManagement.tsx';
import { TicketFilter } from './TicketFilter.tsx';
import { TicketCardWrapper } from './TicketCardWrapper.tsx';

import { TicketsAvailable, AddTicket, GetTicket } from './const/TicketsAvailable.tsx'
import { DevAvailable, GetDev } from './const/DevAvailable.tsx'
import { TagsAvailable, GetTags } from './const/TagsAvailable.tsx'

function ProjectDashboard(props:{isLogged:number, setLogged:(_foo:number)=>void}){
    const { project_id : param_project_id } = useParams();
    const project_id_string = param_project_id?.match("^.*(?=_)");
    if (project_id_string === null || project_id_string === undefined) return (<Navigate to="/dashboard" />);
    const project_id = parseInt(project_id_string[0]);

    const [tickets, setTickets] = useState<ITicket[]>(TicketsAvailable);
    const [devs, setDevs] = useState<DevType[]>(DevAvailable);
    
    const [user_id, setUserId] = useState<number>(1);
    const [currentUser, setCurrentUser] = useState<DevType>({id:1,name:"", image:"", isAdmin:false, github_id:null});
    
    const [tags, setTags] = useState<ITags[]>(TagsAvailable);
    
    const [showOnlyOwned, setOwned] = useState<number>(-1);
    const [showCompleted, setCompleted] = useState<boolean>(false);
    const [showDraft, setDraft] = useState<boolean>(false);
    
    const [sortOrder, setSortOrder] = useState<("name"|"urgency"|"date")>("name");

    const [showNewTicketModal, setShowNewTicketModal] = useState<boolean>(false)
    const [showModalDev, setShowModalDev] = useState<boolean>(false);
    const [showModalTag, setShowModalTag] = useState<boolean>(false);
    useEffect(() => {
        GetTicket(setTickets, project_id);
        GetDev(setDevs, setCurrentUser, user_id, project_id);
        GetTags(setTags, project_id)
      }, [])

    return (<>
    
    {(props.isLogged==-1) && <Navigate to="/" />}
    
    <UserContext.Provider value={{id:user_id, setId:setUserId}}>
    <LoggedNavBar isAdmin={currentUser.isAdmin} setLogged={props.setLogged} setShowModalDev={()=>{setShowModalDev(true)}} setShowModalTag={()=>{setShowModalTag(true)}} />
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
    <ModalDevManagement project_id={project_id} close={()=>{setShowModalDev(false)}} tickets={tickets} setTickets={setTickets} user_id={user_id}/>)}
    
    {showNewTicketModal && (
    <NewTicketModal project_id={project_id} close={()=>{setShowNewTicketModal(false)}}
      actionTicketModal={
      (pTitle:string, pBody:string, pUrgency:number, pActiveTags:number[], pIsDraft:boolean, pActiveDev:number[], pDueDate:string)=>{
        const ticket_tags:ITags[] = []
        pActiveTags.map((t)=>{ticket_tags.push(
          TagsAvailable.find((tag)=>(t == tag.id)) as ITags //To avoid undefined warning
        )})
        AddTicket(pTitle,pBody,pUrgency,ticket_tags,pActiveDev,pDueDate,false,pIsDraft, project_id, setTickets)
      }}
      />)}
    </UserContext.Provider>
    {showModalTag && (
      <ModalTagManagement project_id={project_id} close={()=>{setShowModalTag(false)}} tickets={tickets} setTickets={setTickets}/>
    )}</>)
}

export default ProjectDashboard