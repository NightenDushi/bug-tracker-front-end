import { TicketTags } from './Tickets/TicketTags'
import { TagsAvailable } from './const/TagsAvailable.tsx'
import { useState } from 'react'

export function ModalTagManagement(props){
    

    return <div className="modal d-block" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tags Management</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.close}></button>
                </div>
                <div className="modal-body">
                    {Object.keys(TagsAvailable).map((tag)=>
                        <div key={tag} className="nav mb-2">
                            <TicketTags on={true}>{tag}</TicketTags>
                            <input className="form-control w-25" value={tag}></input>
                            <ColorPicker color={TagsAvailable[tag]}/>
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.close}>Close</button>
                </div>
            </div>
        </div>
    </div>;
}

function ColorPicker(props){
    const ColorAvailable:string[] = ["primary","secondary","success","info","warning","danger","dark"]
    const [open, setOpen] = useState<boolean>(false)
    return (open)?
            
            <>
                <a className={"btn btn-"+ props.color} style={{width:40,height:40}} href="#" onClick={()=>{setOpen(false)}}></a>
                {ColorAvailable.map((c)=>{
                    if (c !== props.color){
                        return (<a key={c} className={"btn btn-"+c} style={{width:40,height:40}} href="#" onClick={()=>{setOpen(false)}}></a>)
                    }
                })
            }</>
            
            :<a className={"btn btn-"+props.color} style={{width:40,height:40}} href="#" onClick={()=>{setOpen(true)}}></a>
}