import crownIcon from './assets/crown-solid.svg'

export function DevAvatar(pProps:{dev:any, avatarFolder?:boolean, activated?:boolean, deactivatedClass?:string}){
    const {dev, ...props} = pProps;
    const useAvatarFolder = (props.avatarFolder===undefined)?true:props.avatarFolder;
    const activated = (props.activated===undefined)?true:props.activated;
    return (
    <>
    <span className={"position-relative d-inline-block devavatar "+(activated?"":props.deactivatedClass)} style={{width:40, height:40}}>
        <img className={"img rounded-circle shadow"} width="40" height="40" alt={"Avatar of "+dev.name}
        src={(useAvatarFolder?"/avatar/":"")+dev.image} />
        {//Crown icon for the admin
        (dev?.isAdmin) && (<img src={crownIcon} className="position-absolute end-0 bottom-0" />)}
    </span>
    </>
    )
}