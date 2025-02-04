import React from "react"
import { useState } from "react"
import {
  createUser,
  setUsers,
  getAllUsers,
  getUserByEmail,
} from "../../Services/UsersService/UsersService"

const AddModal = ({ showModal, setShowModal }) => {
  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleNameType = (e) => setName(e.target.value)
  const handleEmailType = (e) => setEmail(e.target.value)
  const handlePasswordType = (e) => setPassword(e.target.value)
  const handlePhoneNumberType = (e) => setPhoneNumber(e.target.value)

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const userData = { name, email, password, phoneNumber }
  //   handleCreateUser(userData)
  //   window.location.reload()
  // }

  // const handleCreateUser = async (userData) => {
  //   const result = await createUser(userData) // Zavolá API pro vytvoření uživatele
  //   if (result.success) {
  //     setUsers([...users, result.user]) // Přidá nového uživatele do seznamu
  //     handleCloseModal() // Zavře modal pro přidání uživatele
  //     console.log("User created successfully:", result.user)
  //   } else {
  //     console.error("Chyba při vytvaření uživatele:", result)
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = { name, email, password, phoneNumber }
    const result = await createUser(userData) // Zavolá API pro vytvoření uživatele
    if (result.success) {
      setUsers([...users, result.user]) // Přidá nového uživatele do seznamu
      handleCloseModal() // Zavře modal pro přidání uživatele
      console.log("User created successfully:", result.user)
    } else {
      console.error("Chyba při vytvaření uživatele:", result)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  if (!showModal) return null

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New User</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={handleNameType}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmailType}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handlePasswordType}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="text">Phone number</label>
                <input
                  type="phoneNumber"
                  className="form-control"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberType}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Create User
              </button>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddModal
