import { useContext } from 'react';
import { ITickets_props } from './@types/tickets';
import TicketCard from './Tickets/TicketCard.tsx';
import { TicketFilterContext } from './App.tsx';

export function TicketCardWrapper(props: ITickets_props) {
  const urgency_map: string[] = ["", "hurry", "urgent"];
  const { isAdmin, showDraft, showCompleted } = useContext(TicketFilterContext); //TODO:Switch that option to the context API later on
  return (<div className="row gap-0 row-gap-2">
    {props.tickets.map(ticket => (!ticket.draft || (ticket.draft && (showDraft && isAdmin)))
      && (!ticket.isDone || (ticket.isDone && showCompleted)) ?
      <TicketCard key={ticket.id} title={ticket.title} className={(urgency_map[ticket.urgency]) + (ticket.draft ? " draft" : "") + (ticket.isDone ? " done" : "")} tags={ticket.tags}>{ticket.body}</TicketCard>
      : <></>
    )}
  </div>);
}
