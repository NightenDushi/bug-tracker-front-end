
import { useState, useEffect } from 'react';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";

import './App.css'
import AuthRedirect from './auth-redirect.tsx'
import LoginForm from './LoginForm.tsx'
import LoggedApp from './LoggedApp.tsx'
import LandingPage from './LandingPage.tsx'
import ErrorPage from "./error-page.tsx";

import ProjectDashboard from './ProjectDashboard';


function App() {
  const [isLoggedIn, setLogged] = useState<number>(-1);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage isLogged={isLoggedIn} setLogged={setLogged}/>,
      errorElement: <ErrorPage />,
      children:[
        {
          path: "/login",
          element: <LoginForm SubmitAction={(pId:number)=>{setLogged(pId)}} />,
        },
      ]
    },
    {
      path: "auth/redirect/:service",
      element: <AuthRedirect setLogged={setLogged} />
    },
    {
      path: "/dashboard",
      element: <LoggedApp isLogged={isLoggedIn} setLogged={setLogged}/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/dashboard/:project_id",
      element: <ProjectDashboard isLogged={isLoggedIn} setLogged={setLogged}/>,
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