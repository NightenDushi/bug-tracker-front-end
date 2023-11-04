export function TicketTags(props:{color:string, on:boolean, children:string}) {
    return (
        <li className="nav-item me-2"><code className={"rounded-1 bg-" + props.color + " text-light p-1 " + (props.on==true?"shadow":"opacity-25")}>#{props.children}</code></li>
    );
}
