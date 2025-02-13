import React from "react"
import { Link } from "react-router-dom"

const AccessDenied = () => {
  return (
    <div>
      <div className="container">
        <div className="row-cols-1 g-4 w-50 m-auto">
          <h1 className="text-center text-danger display-4 mt-4">
            Access denied
          </h1>
          <div className="d-flex justify-content-center">
            <img
              className="img-fluid mt-4 rounded-circle w-75"
              src={`${process.env.PUBLIC_URL}/Photos/AccessDenied.jpg`}
              alt="Forbidden"
            />
          </div>
          <div className="row row-col-2 gap-5 mt-3 mx-auto d-flex justify-content-center">
            <Link
              className="btn btn-lg btn-success w-auto"
              type="button"
              to="/home"
            >
              Home
            </Link>
            <Link
              className="btn btn-lg btn-danger w-auto"
              type="button"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccessDenied
