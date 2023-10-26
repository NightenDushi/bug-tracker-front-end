import { ITags } from './@types/tags'
export interface ITicket{
    id:number,
    isDone:boolean,
    draft:boolean,
    urgency:number,
    title:string,
    body:string,
    tags:ITags[],
    person_assigned:string[],
  }

export interface ITickets_props{
  tickets:ITicket[]
}