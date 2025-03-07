import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import AddModal from "../Users/AddModal"

const CreateAccount = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const navigate = useNavigate()

  const handleOpenCreateModal = () => setShowCreateModal(true)

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Create account
        </h1>
        <div className="row row-cols-1 d-flex justify-content-center align-items-center w-50 mx-auto">
          <button
            type="button"
            className="btn btn-success shadow-sm fs-5 fw-semibold text-info"
            onClick={handleOpenCreateModal}
          >
            Create Account
          </button>
          <span className="text-center text-info text-uppercase fs-4 fw-medium my-3">
            or
          </span>
          <button
            type="button"
            className="btn btn-primary shadow-sm fs-5 fw-semibold text-info"
            onClick={handleOpenCreateModal}
          >
            Google
          </button>
          <GoogleOAuthProvider clientId="680830179798-oquu7npstv9ofbpv781kq9usq7nfjqtg.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(response) => {
                // console.log("Login successful:", response)
                console.log(
                  "Login successful:",
                  response.clientId + " " + response.credential
                )
                navigate("/login")
              }}
              onError={(error) => console.error("Login failed:", error)}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <AddModal showModal={showCreateModal} setShowModal={setShowCreateModal} />
    </div>
  )
}

export default CreateAccount
