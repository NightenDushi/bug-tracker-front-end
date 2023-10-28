import { TicketTags } from './TicketTags.tsx';
import './Tickets.css'

function TicketCard(pProps) {
    
    const {children, title, className, tags, ...props} = pProps;
    const isDraft : boolean = (className=="draft");
    return <div className='card col-sm-6 col-md-4 col-lg-3'>
        <div className={"card-body ticket_card "+className}>
        <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <img className="img rounded-circle shadow" width="40" height="40" src="../public/avatar/31c88339bc905db98016c725dd3d418a.jpeg" />
        </div><ul className="nav d-flex mb-2">
            {tags.map(tag=>
                <TicketTags key={tag.id} on={true}>{tag.text}</TicketTags>
                )}
        </ul>
        <p className="card-text">{children}</p>
        <CompletedPublishBtn isDraft={isDraft}/>
        <a href="#" className="btn btn-primary">More...</a>
        </div>
    </div>
}

function CompletedPublishBtn(props){
    if (props.isDraft){
        return (<span className="btn btn-secondary shadow me-2"><label className="me-1">Publish</label></span>)
    } else {
        return (<span className="btn btn-secondary shadow me-2"><label className="me-1">Completed</label><input type="checkbox" className=""/></span>)

    }
}

export default TicketCard