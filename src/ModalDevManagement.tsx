import { useState } from 'react';
import { DevAvailable, AddDev, RemoveDev, RenameDev, SetAdminDev } from './const/DevAvailable.tsx';
import { TicketsAvailable, ReplaceTicket } from './const/TicketsAvailable.tsx';

import { AlertModal } from './AlertModal.tsx';
import { DevAvatar } from './DevAvatar.tsx';

import { ITicket } from './@types/tickets'
import plusIcon from './assets/plus-solid.svg';

const defaultAvatar = 'defaultAvatar.jpg';

function userInTickets(pTickets:ITicket[], pUserId:number){
    for (let i=0; i<pTickets.length; i++){
        if (pTickets[i].person_assigned.includes(pUserId)) return true
    }
    return false
}

function RemoveDevFromTickets(pSetTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void, pDevId:number){
    TicketsAvailable.map((t)=>{
        if (t.person_assigned.includes(pDevId)){
            const removedDevIndex = t.person_assigned.indexOf(pDevId)
            t.person_assigned.splice(removedDevIndex, 1);
            ReplaceTicket(t, t.title, t.body, t.urgency, t.tags, t.person_assigned,
                                t.dueDate?.toDateString(), t.isDraft, pSetTickets)
        }
    })
}

export function ModalDevManagement(props: { project_id:number, close: ()=>void; user_id: number; tickets: ITicket[]; setTickets: (prevVar: ITicket[] | ((a: ITicket[]) => ITicket[])) => void; }) {
    const [devAvailableState, setDevAvailableState] = useState(DevAvailable)

    const [showAlertModal, setShowAlertModal] = useState<boolean>(false)
    const [alertModalSubject, setAlertModalSubject] = useState<string>("")
    const [alertModalSubjectId, setAlertModalSubjectId] = useState<number>(0)
    
    return <div className="modal d-block modal-background" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">User Management</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.close}></button>
                </div>
                <div className="modal-body">
                    {devAvailableState.map((dev) => {
                        const devNameCapitalized = dev.name.slice(0, 1).toUpperCase() + dev.name.slice(1);
                        return <div key={dev.id} className="d-flex mb-2">
                            <DevAvatar dev={dev} />
                            <input className="form-control ms-2"
                                value={devNameCapitalized}
                                onChange={(e) => {RenameDev(dev, e.target.value, setDevAvailableState)}}
                                onKeyDown={(e) => { if (e.key === 'Enter') { props.close() } }}>
                            </input>
                            
                            {(dev.id!==props.user_id) && 
                            (<>
                                <div className="d-flex ms-2 align-self-end">
                                    <label htmlFor={"admin_"+dev.id} className="">Admin</label>
                                    <input id={"admin_"+dev.id} className="form-check-input ms-1 me-2" type="checkbox" checked={dev.isAdmin} onChange={()=>{SetAdminDev(dev, !dev.isAdmin, setDevAvailableState)}}></input>
                                </div>
                                <a className="text-danger text-decoration-none ms-2 align-self-end" href="#"
                                onClick={() => {if(userInTickets(props.tickets, dev.id)){setAlertModalSubject(devNameCapitalized);setAlertModalSubjectId(dev.id); setShowAlertModal(true)}
                                            else RemoveDev(dev.id, setDevAvailableState, props.project_id)}}> Remove </a>
                            </>)}
                        </div>;
                    })}
                    <a href="#" className="btn btn-light d-flex
                                mb-2 mt-3 text-decoration-none opacity-50"
                        onClick={() => {AddDev("", defaultAvatar, setDevAvailableState)}}
                    >
                        <DevAvatar dev={{image:plusIcon}} avatarFolder={false} />
                        <span className="h4 align-self-center mb-0">Add a new user</span>
                    </a>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
        {showAlertModal && (<AlertModal title={"Warning"} body={alertModalSubject+" is assigned to one or more tickets. Are you sure you want to remove this user?"}
            close={()=>{setShowAlertModal(false)}} 
            ok={()=>{
                RemoveDevFromTickets(props.setTickets, alertModalSubjectId)
                RemoveDev(alertModalSubjectId, setDevAvailableState, props.project_id);
                setShowAlertModal(false);
            }}
        />)}
    </div>;
}