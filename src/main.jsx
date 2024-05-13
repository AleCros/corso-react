import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Navbar from './navbar.jsx'
import './styles.css'
import ListAtt from './ListAtt.jsx'
import AddPro from './AddPro.jsx'
import ListPro from './ListPro.jsx'
import DettaglioAtt from './DettaglioAtt.jsx'
import DettaglioPro from './DettaglioPro.jsx'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:'/',
    element: <ListAtt></ListAtt>
  },
  {
    path:'/progetti',
    element: <ListPro/>
  },
  {
    path:'/progetti/add',
    element:<AddPro></AddPro>
  },
  {
    path:'/attivita',
    element:<ListAtt></ListAtt>
  },
  {
    path:'/attivita/add',
    element:<App></App>
  },
  {
    path:'/attivita/:id',
    element: <DettaglioAtt></DettaglioAtt>
  },
  {
    path:'/progetti/:id',
    element:<DettaglioPro></DettaglioPro>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Navbar/> */}
    {/* <App /> */}
    {/* <ListAtt></ListAtt> */}
    {/* <AddPro/> */}
    {/* <ListPro></ListPro> */}
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
