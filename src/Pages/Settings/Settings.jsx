import React, { useState, useEffect } from "react"
import {
  getUserByIdQuery,
  editUserByIdQuery,
} from "../../Services/SettingsService/SettingsService"

const Settings = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserByIdQuery()
        console.log("fetchedUser:", fetchedUser)
        if (!fetchedUser) {
          console.error("Failed to fetch user data")
          return
        }
        console.log("fetchedUser:", fetchedUser)
        setUser(fetchedUser)
      } catch (error) {
        console.error("Error in fetchUsers:", error)
      }
    }
    fetchUser()
  }, [])

  const handleDataChange = (e) => {
    const { id, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }))
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        name: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        monthTimeGoal:
          Number(user.monthTimeGoal) === 0 ? 15 : Number(user.monthTimeGoal),
      }
      console.log("handleEditUser - Input user:", user)
      console.log("handleEditUser - Prepared payload:", payload)
      const editedUser = await editUserByIdQuery(payload)
      console.log("handleEditUser - Response:", editedUser)
      alert("User edited successfully")
    } catch (error) {
      console.log("handleEditUser - Full error response:", error.response)
      const errorMessage = error.response?.data?.message || error.message
      alert(`Error editing user: ${errorMessage}`)
      console.error("Full error:", error)
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center py-4">Settings</h1>
        <div className="mx-auto">
          <form
            onSubmit={handleEditUser}
            className="row d-flex g-3 w-75 w-md-25 mx-auto justify-content-start"
          >
            <div className="form-group col-4 col-md-3">
              <label htmlFor="monthTimeGoal">Goal</label>
              <input
                type="number"
                className="form-control"
                style={{ maxWidth: "7ch" }}
                id="monthTimeGoal"
                name="monthTimeGoal"
                defaultValue={user.monthTimeGoal}
                onChange={handleDataChange}
                min="1"
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="userName">Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={user.userName || ""}
                onChange={handleDataChange}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email || ""}
                onChange={handleDataChange}
              />
            </div>
            <div className="form-group col-8 col-md-9">
              <label htmlFor="phoneNumber">Phone number</label>
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={handleDataChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings
