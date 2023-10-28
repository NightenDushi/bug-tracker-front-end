import { useContext } from 'react';
import { TicketFilterContext } from './App.tsx';


export function TicketFilter() {
  const { isAdmin, showDraft, setDraft, showCompleted, setCompleted } = useContext(TicketFilterContext);
  return <ul className="nav bg-clear shadow mb-3 rounded-2 p-3">
    <li className="nav-item me-3">
      <label className="me-1" htmlFor="owned">Show only my issues</label>
      <input type="checkbox" className="form-check-input" id="owned" name="owned" defaultChecked></input>
    </li>
    {isAdmin && (<li className="nav-item me-3">
      <label className="me-1" htmlFor="draft">Show Drafts</label>
      <input type="checkbox" className="form-check-input" id="draft" name="draft" checked={showDraft} onChange={() => { setDraft(!showDraft); }}></input>
    </li>)}
    <li className="nav-item me-3">
      <label className="me-1" htmlFor="completed">Show Completed</label>
      <input type="checkbox" className="form-check-input" id="completed" name="completed" checked={showCompleted} onChange={() => { setCompleted(!showCompleted); }}></input>
    </li>
    <li className="nav-item">
      <label htmlFor="sort_mode">Sort by</label>
      <select id="sort_mode" name="sort_mode" className="form-control">
        <option value="foo">Importance</option>
        <option value="foo">Due date</option>
      </select>
    </li>
  </ul>;
}
