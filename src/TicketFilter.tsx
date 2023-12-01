import { useContext } from 'react';
import { TicketFilterContext, UserContext } from './Context.tsx';


export function TicketFilter() {
  const {isAdmin ,showOnlyOwned, showCompleted, showDraft, sortOrder, setOnlyOwned, setCompleted, setDraft, setSortOrder } = useContext(TicketFilterContext);
  const { id } = useContext(UserContext)
  return <ul className="nav bg-clear shadow mb-3 rounded-2 p-3 align-items-center">
    <li className="nav-item me-3">
      <label className="me-1" htmlFor="owned">Show only my issues</label>
      <input type="checkbox" className="form-check-input" id="owned" name="owned" checked={(showOnlyOwned !== -1)} onChange={() => { if (showOnlyOwned==-1) {setOnlyOwned(id)} else setOnlyOwned(-1) }}></input>
    </li>
    {isAdmin && (<li className="nav-item me-3">
      <label className="me-1" htmlFor="draft">Show Drafts</label>
      <input type="checkbox" className="form-check-input" id="draft" name="draft" checked={showDraft} onChange={() => { setDraft(!showDraft); }}></input>
    </li>)}
    <li className="nav-item me-3">
      <label className="me-1" htmlFor="completed">Show Completed</label>
      <input type="checkbox" className="form-check-input" id="completed" name="completed" checked={showCompleted} onChange={() => { setCompleted(!showCompleted); }}></input>
    </li>
    <li className="nav-item me-1">
      <label htmlFor="sort_mode" className="">Sort by</label>
    </li>
    <li className="nav-item">
      <select id="sort_mode" name="sort_mode" className="form-control" value={sortOrder} onChange={(e)=>{setSortOrder(e.target.value as ("name"|"urgency"|"date"))}}>
        <option value="name">Name</option>
        <option value="urgency">Urgency</option>
        <option value="date">Due date</option>
      </select>
    </li>
  </ul>;
}
