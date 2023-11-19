import clockIcon from '../assets/clock-regular.svg';
import Interval from '../utils/interval.ts';

interface TicketDueDateProps {
    dueDate:Date
}
export function TicketDueDate(props:TicketDueDateProps) {
    const DateString:string = props.dueDate.toDateString();
    //1 > Today, 2 > Past
    const isDueDateTodayOrPast:number = (()=>{
        if ((props.dueDate===undefined) || (props.dueDate===null) || (props.dueDate > new Date())) return 0
        const DateGap = (new Date().getTime() - props.dueDate.getTime())
        if (DateGap>86400000) return 2 // 86400000 = 24h
        return 1
    })();
    if (DateString !== undefined && (DateString!=="Invalid Date")) return (<p className={"d-block m-0"+((isDueDateTodayOrPast==2)?" text-danger":((isDueDateTodayOrPast==1)?" text-warning":" text-primary"))}>
        <img alt="clock icon" src={clockIcon} width="10" style={{ marginBottom: 3, marginRight: 5 }} />
        {(isDueDateTodayOrPast==2)?"Overdue since "+Interval(props.dueDate as Date):((isDueDateTodayOrPast==1)?"Due today":"Due in " + Interval(props.dueDate as Date))}</p>);
}
