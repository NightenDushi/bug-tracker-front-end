import { useContext } from 'react';
import { ITickets_props } from './@types/tickets';
import TicketCard from './Tickets/TicketCard.tsx';
import { TicketFilterContext } from './App.tsx';

export function TicketCardWrapper(props: ITickets_props) {
  const urgency_map: string[] = ["", "hurry", "urgent"];
  const { isAdmin, showDraft, showCompleted } = useContext(TicketFilterContext); //TODO:Switch that option to the context API later on
  return (<div className="row">
    {props.tickets.map(ticket => (!ticket.isDraft || (ticket.isDraft && (showDraft && isAdmin)))
      && (!ticket.isDone || (ticket.isDone && showCompleted)) &&
      (<TicketCard   key={ticket.id} title={ticket.title} 
                    className={(urgency_map[ticket.urgency]) + (ticket.isDraft ? " draft" : "") + (ticket.isDone ? " done" : "")}
                    tags={ticket.tags} isDraft={ticket.isDraft} person_assigned={ticket.person_assigned}>
          {ticket.body}
        </TicketCard>)
    )}
  </div>);
}
