import { TagsAvailable } from '../const/TagsAvailable.tsx'

export function TicketTags(props) {
    const color = TagsAvailable[props.children];
    return (
        <li className="nav-item me-2"><code className={"rounded-1 bg-" + color + " text-light p-1 " + (props.on==true?"shadow":"opacity-25")}>#{props.children}</code></li>
    );
}
