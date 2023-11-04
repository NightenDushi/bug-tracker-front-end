import { MouseEventHandler } from 'react'
import { ITags } from './@types/tags'
import { CommentType } from './@types/comments'
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
    comments:CommentType[];
  }

export type ITicket_props = {
  ticket:ITicket;
  isUserAdmin:boolean,
  className:string,
  completedAction:MouseEventHandler<HTMLAnchorElement>,
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}
export type ITickets_props = {
  tickets:ITicket[],
  isUserAdmin:boolean,
  setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void
}