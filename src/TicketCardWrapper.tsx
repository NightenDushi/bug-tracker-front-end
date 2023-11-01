import { useContext } from 'react';
import { ITicket, ITickets_props } from './@types/tickets';
import TicketCard from './Tickets/TicketCard.tsx';
import { TicketFilterContext } from './App.tsx';

export function TicketCardWrapper(props: ITickets_props) {
  const urgency_map: string[] = ["", "hurry", "urgent"];
  const { isAdmin, showDraft, showCompleted } = useContext(TicketFilterContext); //TODO:Switch that option to the context API later on
  return (<div className="row">
    {props.tickets.map((ticket, ticket_index) => (!ticket.isDraft || (ticket.isDraft && (showDraft && isAdmin)))
      && (!ticket.isDone || (ticket.isDone && showCompleted)) &&
      (<TicketCard   key={ticket.id} id={ticket.id} title={ticket.title} 
                    className={(urgency_map[ticket.urgency]) + (ticket.isDraft ? " draft" : "") + (ticket.isDone ? " done" : "")}
                    tags={ticket.tags} isDraft={ticket.isDraft} isDone={ticket.isDone}
                    urgency={ticket.urgency}
                    person_assigned={ticket.person_assigned}
                    isUserAdmin={props.isUserAdmin}

                    completedAction={TicketCompletedAction(props, ticket_index)}
                    setTickets={props.setTickets}
        >{ticket.body}</TicketCard>)
    )}
  </div>);
}
function TicketCompletedAction(props: ITickets_props, ticket_index: number): (e: MouseEvent) => void {
    return (e: MouseEvent) => {
        e.preventDefault();
        props.setTickets((pTickets: ITicket[]) => {
            const NewTickets = pTickets.map((t, i: number) => {
                if (i != ticket_index) return t
                
                const NewTicket = Object.assign({}, t);
                if (t.isDraft) NewTicket.isDraft = false;
                else if (t.isDone) NewTicket.isDone = false; //Republish the ticket
                else NewTicket.isDone = true;

                return NewTicket;
            });

            return NewTickets;
        }
        );
    };
}

