import { ITags } from './@types/tags'
export interface ITicket{
    id:number,
    isDone:boolean,
    isDraft:boolean,
    urgency:number,
    title:string,
    body:string,
    tags:ITags[],
    person_assigned:string[],
    dueDate?:Date,
  }

export type ITicket_props = {
  id:number,
  isDraft:boolean,
  isDone:boolean,
  isUserAdmin:boolean,
  urgency:number,
  children:string,
  title:string,
  className:string,
  tags:ITags[],
  person_assigned:string[],
  dueDate?:Date,
  completedAction(e:MouseEvent):void,
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}
export type ITickets_props = {
  tickets:ITicket[],
  isUserAdmin:boolean,
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}