import clockIcon from '../assets/clock-regular.svg';

interface TicketDueDateProps {
    dueDate:(Date|undefined)
}
export function TicketDueDate(props:TicketDueDateProps) {
    const DateString = props.dueDate?.toDateString();
    
    if (DateString !== undefined && (DateString!=="Invalid Date")) return (<p className="d-block m-0"><img alt="clock icon" src={clockIcon} width="10" style={{ marginBottom: 3, marginRight: 5 }} />{"Due on " + DateString.slice(0, -5)}</p>);
}
