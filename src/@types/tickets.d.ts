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
    tags:number[],
    person_assigned:number[],
    dueDate?:Date,
    comments:CommentType[];
  }
export interface ITicketDatabase{
    id:number,
    isDone:boolean,
    isDraft:boolean,
    urgency:number,
    title:string,
    body:string,
    tags:number[], //list of ids
    person_assigned:number[],
    dueDate?:Date,
    comments:number[];
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