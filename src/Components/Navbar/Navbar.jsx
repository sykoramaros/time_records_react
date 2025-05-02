import React from "react"
import { useState, useRef } from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { Trans } from "@lingui/react"
import LanguageToggler from "../LanguageToggler/LanguageToggler"
import LogoutButton from "../LogoutButton/LogoutButton"

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false)
  const [role, setRole] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const navbarCollapseRef = useRef(null)

  // const handleIsOpen = () => {
  //   setIsOpen(!isOpen)
  // }

  // Funkce pro přepínání a zavírání menu
  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="language-container">
        <LanguageToggler />
      </div>
      <nav className="navbar fixed-top navbar-expand-md bg-primary shadow">
        <div className="container-fluid ">
          <NavLink className="navbar-brand" to="/home" onClick={closeMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-calendar3 text-light"
              viewBox="0 0 16 16"
            >
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
          </NavLink>
          <button
            className="border-0 bg-primary navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="navbarNav"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <img
              src={`${process.env.PUBLIC_URL}/Photos/menu.svg`}
              className=""
              width={40}
              height={40}
              alt="Menu"
            />
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarNav"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav gap-2 fw-medium">
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-4 text-white"
                  aria-current="page"
                  to="/home"
                  onClick={closeMenu}
                >
                  <Trans id="navbar.home">Home</Trans>
                </NavLink>
              </li>
              <span className="d-none d-lg-block my-auto text-white fw-normal">
                |
              </span>
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-4 text-white"
                  to="/calendar"
                  onClick={closeMenu}
                >
                  <Trans id="navbar.calendar">Calendar</Trans>
                </NavLink>
              </li>
              <span className="d-none d-lg-block my-auto text-white fw-normal">
                |
              </span>
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-4 text-white"
                  to="/settings"
                  onClick={closeMenu}
                >
                  <Trans id="navbar.settings">Settings</Trans>
                </NavLink>
              </li>
              {role === "Admin" && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fs-4 text-white"
                      to="/users"
                      onClick={closeMenu}
                    >
                      Users
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fs-4 text-white"
                      to="/roles"
                      onClick={closeMenu}
                    >
                      Roles
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="ms-auto">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
