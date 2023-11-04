import { ITags } from './@types/tags'
export interface ITicket{
    id:number,
    isDone:boolean,
    isDraft:boolean,
    urgency:number,
    title:string,
    body:string,
    tags:ITags[],
    person_assigned:number[],
    dueDate?:Date,
  }

export type ITicket_props = {
  ticket:ITicket;
  isUserAdmin:boolean,
  className:string,
  completedAction(e:MouseEvent):void,
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}
export type ITickets_props = {
  tickets:ITicket[],
  isUserAdmin:boolean,
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}