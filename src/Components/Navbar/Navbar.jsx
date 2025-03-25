import React from "react"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Trans } from "@lingui/react";
import LogoutButton from "../LogoutButton/LogoutButton"

const Navbar = () => {
  const [role, setRole] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navbarCollapseRef = useRef(null)

  useEffect(() => {
    // Simulace načtení role uživatele (např. z API nebo localStorage)
    const userRole = localStorage.getItem("userRole") || "User";
    setRole(userRole);
  }, []);

  // Funkce pro přepínání a zavírání menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-sm bg-primary shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home" onClick={closeMenu}>
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
          </Link>
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
            />
            {/* <span className="navbar-toggler-icon toggler-icon"></span> */}
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarNav"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav gap-2 fw-medium">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4 text-white"
                  aria-current="page"
                  to="/home"
                  onClick={closeMenu}
                >
                  <Trans id="navbar.home">Home</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fs-4 text-white"
                  to="/calendar"
                  onClick={closeMenu}
                >
                  <Trans id="navbar.calendar">Calendar</Trans>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fs-4 text-white"
                  to="/settings"
                  onClick={closeMenu}
                >
                  <Trans id="navbar.settings">Settings</Trans>
                </Link>
              </li>
              {role === "Admin" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link fs-4 text-white"
                      to="/users"
                      onClick={closeMenu}
                    >
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link fs-4 text-white"
                      to="/roles"
                      onClick={closeMenu}
                    >
                      Roles
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <LogoutButton />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
