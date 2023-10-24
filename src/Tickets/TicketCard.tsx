import './Tickets.css'

function TicketCard(pProps) {
    const {children, title, className, ...props} = pProps;
    return <div className='card col-sm-6 col-md-4 col-lg-3'>
        <div className={"card-body ticket_card "+className}>
        <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{title}</h5>
            <img className="img rounded-circle shadow" width="40" height="40" src="../public/avatar/31c88339bc905db98016c725dd3d418a.jpeg" />
        </div><ul className="nav d-flex mb-2">
            <TicketTags color="primary">Foo</TicketTags>
            <TicketTags color="warning">Bar</TicketTags>
            

        </ul>
        <p className="card-text">{children}</p>
        <a href="#" className="btn btn-secondary">Completed</a>
        <a href="#" className="btn btn-primary">More...</a>
        </div>
    </div>
}

function TicketTags(props){
    const {color, ...pProps} = props;
    return(
        <>
        <li className="nav-item me-2"><code className={"rounded-1 bg-"+color+" text-light shadow p-1"}>#{props.children}</code></li>
        </>
    )
}

export default TicketCard