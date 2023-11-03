
export function DevAvatar(props){
    const usAvatarFolder = (props.avatarFolder===undefined)?true:props.avatarFolder;
    return <img className={"img rounded-circle shadow me-2 "+(props.activated?"":props.deactivatedClass)} width="40" height="40"
    src={(usAvatarFolder?"../avatar/":"")+props.image} />
}