
export function TicketTags(props) {
    const tag_color_map: { [key: string]: string; } = {
        "foo": "primary",
        "bar": "warning"
    };
    const color = tag_color_map[props.children];
    return (
        <li className="nav-item me-2"><code className={"rounded-1 bg-" + color + " text-light p-1 " + (props.on==true?"shadow":"opacity-25")}>#{props.children}</code></li>
    );
}
