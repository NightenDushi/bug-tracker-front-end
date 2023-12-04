
import { useState, useEffect } from 'react';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";

import './App.css'
import LoginForm from './LoginForm.tsx'
import LoggedApp from './LoggedApp.tsx'
import LandingPage from './LandingPage.tsx'
import ErrorPage from "./error-page.tsx";


function App() {
  const [isLoggedIn, setLogged] = useState<boolean>(false);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage isLogged={isLoggedIn} setLogged={setLogged}/>,
      errorElement: <ErrorPage />,
      children:[
        {
          path: "/login",
          element: <LoginForm SubmitAction={()=>{setLogged(true)}} />,
        },
      ]
    },
    {
      path: "/dashboard",
      element: <LoggedApp isLogged={isLoggedIn} setLogged={setLogged}/>,
      errorElement: <ErrorPage />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App