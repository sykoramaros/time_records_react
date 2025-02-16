import React from "react"
import { useState, useEffect } from "react"
import { editUser } from "../../Services/UsersService/UsersService"

const EditModal = ({ show, user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.userName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    monthTimeGoal: user?.monthTimeGoal || 0,
  })

  // pro zpomalene asynchronni nacitani z API
  useEffect(() => {
    setFormData({
      name: user?.userName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      monthTimeGoal: user?.monthTimeGoal || 0,
    })
    console.log("Setting form data:", user)
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    console.log("handleChange:", formData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("handleSubmit:", formData)
    try {
      await editUser(user.id, formData)
      onClose()
      window.location.reload()
    } catch (error) {
      console.error("Error editing user:", error)
    }
  }

  if (!show || !user) {
    return null
  }

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit user</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="phoneNumber">Month time goal</label>
                <input
                  type="number"
                  className="form-control"
                  id="monthTimeGoal"
                  name="monthTimeGoal"
                  value={formData.monthTimeGoal}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Save changes
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal
