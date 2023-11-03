import { UserContext } from './App.tsx';
import { useContext, useState } from 'react';

import { DevAvatar } from './DevAvatar.tsx'
import { DevAvailable } from './const/DevAvailable.tsx'

export default function LoggedNavBar(props){
    const {id, setId} = useContext(UserContext);
    const [showChangeAccount,setShowChangeAccount] = useState<boolean>(false)

    const UserLogged = DevAvailable.find((e)=>e.id == id);

    return(
        <nav className="nav bg-light shadow mb-3 align-items-center">
            <a className="nav-link active" href="#">Tickets</a>
            <a className="nav-link" href="#">Profile</a>
            <a className="nav-link" href="#">Notification</a>
            <a className="nav-link" href="#">Logout</a>
            {
                props.isAdmin &&
                (<>
                    <a className="nav-link" href="#" onClick={props.setShowModalDev} >Manage developers</a>
                    <a className="nav-link" href="#" onClick={props.setShowModalTag} >Manage tags</a>
                </>)
            }
            <div className="nav-link ms-auto position-relative">
                <a className="" href="#" onClick={()=>{setShowChangeAccount(!showChangeAccount)}}>
                    <DevAvatar dev={UserLogged}/>
                </a>
                {showChangeAccount && (<ModalChangeAccount currentAccount={UserLogged} id={id} close={()=>{setShowChangeAccount(false)}} change={setId}/>)}
            </div>
        </nav>
    )
}

function ModalChangeAccount(props){
    return <div className="position-absolute bg-light p-3 pb-2 pt-2 end-0 top-0 shadow rounded-pill" style={{}}>
        <a className="d-block mb-2" href="#" onClick={props.close}>
            <DevAvatar dev={props.currentAccount}/>
        </a>
        {DevAvailable.map((dev)=>{
            const dev_activated = (dev.id!=props.id);
            return <a key={dev.id} className={"d-block mb-2 "+(dev_activated?"":"d-none")} href="#"
                onClick={()=>{
                    props.change(dev.id); props.close()
                }}
                >
                    <DevAvatar key={dev.name} dev={dev}/>
                </a>
        })}
    </div>
}