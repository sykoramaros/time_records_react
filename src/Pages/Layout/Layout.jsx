import React from "react"
import "./Layout.css"
import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"

const Layout = () => {
  return (
    <div>
      <div className="navbar-container w-100">
        <Navbar />
      </div>
      <div className="outlet-container w-100">
        <Outlet />
      </div>
      <div className="footer-container bg-warning d-flex align-items-center">
        <Footer />
      </div>
    </div>
  )
}

export default Layout
