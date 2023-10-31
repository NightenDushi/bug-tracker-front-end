import { TicketTags } from './TicketTags.tsx';
import { ITicket_props } from '../@types/tickets';
import { DevAvailable } from '../const/DevAvailable.tsx';
import './Tickets.css'

function TicketCard(props:ITicket_props) {
    
    const {children, title, className, tags, isDraft, isDone, person_assigned, completedAction} = props;
        
    return (<div className='card col col-sm-6 col-md-4 col-lg-3'>
        <div className={"card-body ticket_card "+className}>
        <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <div>
              {person_assigned.map((dev_name)=>{
                    const dev = DevAvailable.find((e)=> e.name == dev_name)
                    return <img key={dev?.name} className={"img rounded-circle shadow me-2"} width="40" height="40"
                        src={"../public/avatar/"+dev?.image} />
                })}
          </div>
            {/* <img className="img rounded-circle shadow" width="40" height="40" src="../public/avatar/31c88339bc905db98016c725dd3d418a.jpeg" /> */}
        </div><ul className="nav d-flex mb-2">
            {tags.map(tag=>
                <TicketTags key={tag.id} on={true}>{tag.text}</TicketTags>
                )}
        </ul>
        <p className="card-text">{children}</p>
        <CompletedPublishBtn isDraft={isDraft} isDone={isDone} action={completedAction}/>
        <a href="#" className="btn btn-primary">More...</a>
        </div>
    </div>)
}

function CompletedPublishBtn(props){
    return (<a className="btn btn-secondary shadow me-2 w-50" href="#" onClick={props.action}>{(props.isDraft)?"Publish":((props.isDone)?"Re-enable":"Complete")}</a>)
}

export default TicketCard