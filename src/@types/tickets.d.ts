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

export interface ITicket_props{
  isDraft:boolean,
  children:string,
  title:string,
  className:string,
  tags:ITags[],
  person_assigned:string[],
}
export interface ITickets_props{
  tickets:ITicket[]
}