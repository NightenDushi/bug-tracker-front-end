import { UserContext } from './App.tsx';
import { useContext } from 'react';

import { DevAvatar } from './DevAvatar.tsx'
import { DevAvailable } from './const/DevAvailable.tsx'

export default function LoggedNavBar(props){
    const {isAdmin, setAdmin, id} = useContext(UserContext);

    const UserLogged = DevAvailable.find((e)=>e.id == id);

    return(
        <nav className="nav bg-light shadow mb-3 align-items-center">
            <a className="nav-link active" href="#">Tickets</a>
            <a className="nav-link" href="#">Profile</a>
            <a className="nav-link" href="#">Notification</a>
            <a className="nav-link" href="#">Logout</a>
            {
                isAdmin?
                (<>
                    <a className="nav-link" href="#" onClick={()=>{setAdmin(false)}}>Switch to dev</a>
                    <a className="nav-link" href="#" onClick={props.setShowModalDev} >Manage developers</a>
                </>)
                :(<a className="nav-link" href="#" onClick={()=>{setAdmin(true)}}>Switch to admin</a>)
            }
            <a className="nav-link ms-auto" href="#">
                <DevAvatar image={UserLogged?.image}/>
            </a>
        </nav>
    )
}