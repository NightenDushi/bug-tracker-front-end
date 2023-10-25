import { UserContext } from './App.tsx';
import { useContext } from 'react';

export default function LoggedNavBar(){
    const {isAdmin, setAdmin} = useContext(UserContext);
    return(
        <nav className="nav bg-light shadow mb-3">
            <a className="nav-link active" href="#">Tickets</a>
            <a className="nav-link" href="#">Profile</a>
            <a className="nav-link" href="#">Notification</a>
            <a className="nav-link" href="#">Logout</a>
            {
                isAdmin?
                (<a className="nav-link" href="#" onClick={()=>{console.log(isAdmin);setAdmin(false)}}>Switch to dev</a>)
                :(<a className="nav-link" href="#" onClick={()=>{console.log(isAdmin);setAdmin(true)}}>Switch to admin</a>)

            }
        </nav>
    )
}