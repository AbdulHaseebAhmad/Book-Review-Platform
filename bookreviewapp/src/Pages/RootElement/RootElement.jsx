import React from 'react'
import Navbar from "../../Components/Navbar/Navbar"
import { Outlet } from 'react-router-dom'; // Correct import
export default function RootElement() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}
