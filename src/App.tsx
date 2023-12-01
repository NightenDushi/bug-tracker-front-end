
import { useState, useEffect } from 'react';

import './App.css'
import LoggedApp from './LoggedApp.tsx'
import LandingPage from './LandingPage.tsx'

function App() {
  const [isLoggedIn, setLogged] = useState<boolean>(false);

  return (
    <>
      {(isLoggedIn==true)&&(<LoggedApp setLogged={setLogged}/>)||(<LandingPage setLogged={setLogged}/>)}
    </>
  )

}

export default App