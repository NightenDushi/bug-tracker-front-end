import { useState } from 'react'

import { ITags } from './@types/tags'
import { ITicket } from './@types/tickets'

import { TicketTags } from './Tickets/TicketTags'
import { TagsAvailable, AddTags, RemoveTags, RenameTags, RecolorTags } from './const/TagsAvailable.tsx'
import { AlertModal } from './AlertModal.tsx';

export function ModalTagManagement(props){
    const [tagsAvailableState, setTagsAvailableState] = useState<ITags[]>(TagsAvailable)

    const [alertModalSubject, setAlertModalSubject] = useState<string>("");
    const [alertModalSubjectId, setAlertModalSubjectId] = useState<number>(0);
    const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

    return <div className="modal d-block modal-background" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tags Management</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.close}></button>
                </div>
                <div className="modal-body">
                    {tagsAvailableState.map((tag)=>
                        <div key={tag.id} className="nav mb-2">
                            <TicketTags on={true} color={tag.color}>{tag.text}</TicketTags>
                            <input className="form-control w-25" value={tag.text}
                            onChange={(e)=>{RenameTags(tag.id, e.target.value, setTagsAvailableState)}}
                            onKeyDown={(e) => { if (e.key === 'Enter') { props.close() } }}></input>
                            
                            <ColorPicker color={tag.color} id={tag.id} changeColor={setTagsAvailableState}>
                                <a href="#" className="text-danger align-self-center ms-auto"
                                    onClick={()=>{if(tagsInTickets(props.tickets, tag.id)){setAlertModalSubject(tag.text);setAlertModalSubjectId(tag.id); setShowAlertModal(true)}
                                    else RemoveTags(tag.id, setTagsAvailableState)}}> Remove </a>
                            </ColorPicker>
                        </div>
                    )}
                    <a href="#" className="btn btn-light d-flex mb-2 mt-3 text-decoration-none opacity-50"
                                    onClick={() => {AddTags("", "primary", setTagsAvailableState)}}
                                >
                        <span className="h4 align-self-center mb-0">Add a new tag</span>
                    </a>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
        {showAlertModal && (<AlertModal title={"Warning"} body={"The tag "+alertModalSubject+" is assigned to one or more tickets. Are you sure you want to remove this tag?"}
            close={()=>{setShowAlertModal(false)}} 
            ok={()=>{
                RemoveTagFromTickets(props.setTickets, alertModalSubjectId)
                RemoveTags(alertModalSubjectId, setTagsAvailableState);
                setShowAlertModal(false);
            }}
        />)}
    </div>;
}

function ColorPicker(props){
    const ColorAvailable:string[] = ["primary","success","info","warning","danger","dark"]
    const [open, setOpen] = useState<boolean>(false)
    return (open)?
            
            <>
                <a className={"btn btn-"+ props.color} style={{width:40,height:40}} href="#" onClick={()=>{setOpen(false)}}></a>
                {ColorAvailable.map((c)=>{
                    if (c !== props.color){
                        return (<a key={c} className={"btn btn-"+c} style={{width:40,height:40}} href="#"
                        onClick={()=>{
                            setOpen(false)
                            RecolorTags(props.id, c, props.changeColor)
                        }}></a>)
                    }
                })
            }</>
            
            :<>
            <a className={"btn btn-"+props.color} style={{width:40,height:40}} href="#" onClick={()=>{setOpen(true)}}></a>
            {props.children}
            </>
}

function tagsInTickets(pTickets:ITicket[], pTagId:number){
    for (let i=0; i<pTickets.length; i++){
        for (let t=0; t<pTickets[i].tags.length; t++){
            if (pTickets[i].tags[t].id == pTagId) return true
        }
    }
    return false
}

function RemoveTagFromTickets(pSetTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void, pTagId:number){
    pSetTickets((pTickets)=>{
        const newTickets = pTickets.map((t)=>{
            const new_t:ITicket = Object.assign({}, t);
            for (let tags_index=0; tags_index<new_t.tags.length; tags_index++){
                if (new_t.tags[tags_index].id==pTagId){
                    new_t.tags.splice(tags_index, 1)
                }
            }
            return new_t

        }) 
        return newTickets
    })
}