let dev_id_increment = 0;

export let DevAvailable: { id:number, name: string; image: string; isAdmin:boolean }[] = [];

AddDev("nathan", "31c88339bc905db98016c725dd3d418a.jpeg", ()=>{}, true)
AddDev("tim", "03.41881874.webp", ()=>{})
AddDev("oliwia", "01.d5f1f706.webp", ()=>{})

export function AddDev(pName:string, pImage:string, pCallBack, pAdmin=false){
    DevAvailable = [...DevAvailable, {id:dev_id_increment, name:pName, image:pImage, isAdmin:pAdmin}]
    dev_id_increment += 1;
    pCallBack(DevAvailable)
}
export function RemoveDev(pId:number, pCallBack){
    DevAvailable = DevAvailable.filter((d)=>d.id !== pId)
    pCallBack(DevAvailable)
}
