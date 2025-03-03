import React from "react"
import { useState } from "react"
import AddModal from "../Users/AddModal"

const CreateAccount = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

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
        </div>
      </div>

      <AddModal showModal={showCreateModal} setShowModal={setShowCreateModal} />
    </div>
  )
}

export default CreateAccount
