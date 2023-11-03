import { useState } from 'react';
import { DevAvailable, AddDev, RemoveDev } from './const/DevAvailable.tsx';

import { AlertModal } from './AlertModal.tsx';
import { DevAvatar } from './DevAvatar.tsx';

import { ITicket } from './@types/tickets'
import plusIcon from './assets/plus-solid.svg';

const defaultAvatar = 'defaultAvatar.jpg';

function userInTickets(pTickets:ITicket[], pUser:string){
    for (let i=0; i<pTickets.length; i++){
        if (pTickets[i].person_assigned.includes(pUser)) return true
    }
    return false
}

function RemoveDevFromTickets(pSetTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void, pDevName:string){
    pSetTickets((pTickets:ITicket[])=>{
        const newTickets = pTickets.map((t)=>{
            const new_t:ITicket = Object.assign({}, t);
            if (new_t.person_assigned.includes(pDevName)){
                const removedDevIndex = new_t.person_assigned.indexOf(pDevName)
                new_t.person_assigned.splice(removedDevIndex, 1);
            }

            return new_t

        }) 
        return newTickets
    })
}

export function ModalDevManagement(props) {
    const [devAvailableState, setDevAvailableState] = useState(DevAvailable)

    const [showAlertModal, setShowAlertModal] = useState<boolean>(false)
    const [alertModalSubject, setAlertModalSubject] = useState<string>("")
    const [alertModalSubjectId, setAlertModalSubjectId] = useState<number>(0)

    return <div className="modal d-block" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <DevAvatar image={dev.image} />
                            <input className="form-control ms-2"
                                value={devNameCapitalized}
                                onChange={() => { }}></input>
                            <a className="text-danger text-decoration-none ms-2 align-self-end" href="#"
                            onClick={() => {if(userInTickets(props.tickets, dev.name)){setAlertModalSubject(devNameCapitalized);setAlertModalSubjectId(dev.id); setShowAlertModal(true)} else RemoveDev(dev.id, setDevAvailableState)}} >Remove</a>
                        </div>;
                    })}
                    <a href="#" className="btn btn-light d-flex
                                mb-2 mt-3 text-decoration-none opacity-50"
                        onClick={() => {AddDev("", defaultAvatar, setDevAvailableState)}}
                    >
                        <DevAvatar image={plusIcon} avatarFolder={false} />
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
                RemoveDev(alertModalSubjectId, setDevAvailableState);
                RemoveDevFromTickets(props.setTickets, alertModalSubject.toLowerCase())
                setShowAlertModal(false);
            }}
        />)}
    </div>;
}