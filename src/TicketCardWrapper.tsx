import { useContext, MouseEventHandler, MouseEvent } from 'react';
import { ITicket, ITickets_props } from './@types/tickets';
import TicketCard from './Tickets/TicketCard.tsx';
import { TicketFilterContext } from './App.tsx';

import { MarkcompleteTicket, PublishTicket } from './const/TicketsAvailable.tsx'

export function TicketCardWrapper(props: ITickets_props) {
  const urgency_map: string[] = ["", "hurry", "urgent"];
  const { isAdmin, showOnlyOwned, showDraft, showCompleted, sortOrder } = useContext(TicketFilterContext);
  return (<div className="row">
    {props.tickets
      .sort((a,b)=>{
        switch(sortOrder){
          case "name":
            if (a.title < b.title) return -1
            break;
          case "urgency":
            if (a.urgency > b.urgency) return -1
            break;
          case "date":
              if (a.dueDate===undefined) return 1
              if (b.dueDate===undefined) return -1
              if (a.dueDate < b.dueDate) return -1
              break;
            }
        return 1
            
      })
      .map((ticket) => (!ticket.isDraft || (ticket.isDraft && (showDraft && isAdmin)))
      && (!ticket.isDone || (ticket.isDone && showCompleted)) && (showOnlyOwned==-1 || ticket.person_assigned.includes(showOnlyOwned)) &&
      (<TicketCard   key={ticket.id} ticket={ticket}
                    className={(urgency_map[ticket.urgency]) + (ticket.isDraft ? " draft" : "") + (ticket.isDone ? " done" : "")}
                    isUserAdmin={props.isUserAdmin}

                    completedAction={TicketCompletedAction(ticket, props.setTickets)}
                    setTickets={props.setTickets}
        />
    ))}
  </div>);
}
function TicketCompletedAction(pTicket: ITicket, setTickets:(prevVar: (ITicket[] | ((a:ITicket[])=>ITicket[]))) => void): MouseEventHandler {
    return (e: MouseEvent) => {
        e.preventDefault();
        if (pTicket.isDraft){
          PublishTicket(pTicket, setTickets)
          return
        } 

        if (pTicket.isDone) MarkcompleteTicket(pTicket, setTickets, false)
        else MarkcompleteTicket(pTicket, setTickets)
    };
}

