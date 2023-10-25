// User
// export interface IUser{
//     name:string,
//     isAdmin:boolean,
//     setAdmin:void
// }
export type UserType = {
    name:string,
    isAdmin:boolean,
    setAdmin: (value:bool) => void;
};