
export function DevAvatar(props){
    return <img className={"img rounded-circle shadow me-2 "+(props.activated?"":props.deactivatedClass)} width="40" height="40"
    src={"../avatar/"+props.image} />
}