import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import ErrorPage from "./components/Error/ErrorPage.jsx";
import Ranking from "./components/Ranking/Ranking.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import RegisterService from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Problems from "./components/Problems/Problems.jsx";
import Problems3 from "./components/problems/Problems3.jsx";
import Problems1 from "./components/problems/Problems1.jsx";
import Problems2 from "./components/problems/Problems2.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        children: [
            {
                path: "/rank",
                element: <Ranking />
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path:"/signup",
                element: <RegisterService />
            },
            {
                path:"/signin",
                element: <Login/>
            },
            {
                path: "/problems",
                element: <Problems/>,

            },
            {
                path: "/problems/3",
                element: <Problems3  />
            },
            {
                path: "/problems/1",
                element: <Problems1  />
            },
            {
                path: "/problems/2",
                element: <Problems2  />
            }


        ],


        errorElement: <ErrorPage />
    },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
