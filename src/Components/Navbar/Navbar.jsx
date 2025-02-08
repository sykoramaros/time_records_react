import React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserRole } from "../../Services/AuthenticationService/AuthenticationService"
import LogoutButton from "../LogoutButton/LogoutButton"

const Navbar = () => {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await getUserRole()
      setRole(fetchedRole)
    }
    fetchRole()
  }, [])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-calendar3"
              viewBox="0 0 16 16"
            >
              <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
              <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 fw-light"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5 fw-light" to="/calendar">
                  Calendar
                </Link>
              </li>
              {role === "Admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fs-5 fw-light" to="/users">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fs-5 fw-light" to="/roles">
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
