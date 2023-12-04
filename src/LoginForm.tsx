import { Link } from 'react-router-dom'
export default function LoginForm(props:{SubmitAction:()=>void}){
    return (
        <div className="modal d-block">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="d-inline">Login form</h5>
                <Link to={"/"}>Close</Link>
            </div>
            <div className="modal-body">
                <div className="d-flex flex-column">
                    <input className="form-control" placeholder="Username"></input>
                    <input className="form-control" placeholder="Password" type="password"></input>
                </div>
            </div>
            <div className="modal-footer">
            <a className="btn btn-primary" onClick={props.SubmitAction}>Submit</a>
            </div>
            </div>
            </div>
        </div>
    )
}