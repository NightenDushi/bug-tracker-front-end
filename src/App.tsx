
import './App.css'
import LoggedNavBar from './LoggedNavBar.tsx'
import TicketCard from './Tickets/TicketCard.tsx'

function App() {
  return (
    <>
      <LoggedNavBar />
      <div className="container grid">
        <h1>My tickets</h1>
        <a href="#" className="btn btn-primary mb-3">Create a ticket</a>
        <ul className="nav bg-clear shadow mb-3 rounded-2 p-3">
          <li className="nav-item me-3">
            <label className="me-1">Show only my issues</label>
            <input type="checkbox" className="form-check-input" checked></input>
          </li>
          <li className="nav-item me-3">
            <label className="me-1">Show Drafts</label>
            <input type="checkbox" className="form-check-input" checked></input>
          </li>
          <li className="nav-item me-3">
            <label className="me-1">Show Completed</label>
            <input type="checkbox" className="form-check-input"></input>
          </li>
          <li className="nav-item">
            <label for="sort_mode">Sort by</label>
            <select name="sort_mode" className="form-control">
              <option value="foo">Importance</option>
              <option value="foo">Due date</option>
            </select>
          </li>
        </ul>
        <div className="row gap-0 row-gap-2">
          <TicketCard title="World">Hello, this is a test</TicketCard>
          <TicketCard title="World" className="urgent">Hello, I wish I had internet</TicketCard>
          <TicketCard title="World" className="hurry">Hello</TicketCard>
          <TicketCard title="World">Hello</TicketCard>
          <TicketCard title="World">Hello</TicketCard>
          <TicketCard title="World">Hello</TicketCard>
          
        </div>

      </div>
    </>
  )
}

// import avatar from '../public/profile/31c88339bc905db98016c725dd3d418a.jpeg';
export default App