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
  }

export type ITicket_props = {
  isDraft:boolean,
  isDone:boolean,
  children:string,
  title:string,
  className:string,
  tags:ITags[],
  person_assigned:string[],
  completedAction(e:MouseEvent):void,
}
export type ITickets_props = {
  tickets:ITicket[],
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}