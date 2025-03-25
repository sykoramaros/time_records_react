import React, { useState, useEffect } from "react"
import {
  getUserByIdQuery,
  editUserByIdQuery,
} from "../../Services/SettingsService/SettingsService"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService";

const Settings = () => {
  const [user, setUser] = useState([])

  const userLocal = getUserFromLocalStorage()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserByIdQuery(userLocal.id)
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
    console.log("handleDataChange:", user)
  }

  const handleEditUser = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        monthTimeGoal:
          Number(user.monthTimeGoal) === 0 ? 15 : Number(user.monthTimeGoal),
      }
      console.log("handleEditUser - Input user:", user)
      console.log("handleEditUser - Prepared payload:", payload)

      const editedUser = await editUserByIdQuery(userLocal.id, payload)
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
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Settings
        </h1>
        <div className="mx-auto">
          <form
            onSubmit={handleEditUser}
            className="row d-flex g-3 w-75 w-md-25 mx-auto justify-content-start"
          >
            <div className="form-group col-4 col-md-3">
              <label
                htmlFor="monthTimeGoal"
                className="fs-5 text-info fw-medium"
              >
                Goal
              </label>
              <input
                type="number"
                className="form-control bg-info fs-5 fw-semibold text-primary"
                style={{ maxWidth: "7ch" }}
                id="monthTimeGoal"
                name="monthTimeGoal"
                defaultValue={user.monthTimeGoal}
                // defaultValue={userLocal["MonthTimeGoal"]}
                onChange={handleDataChange}
                min="1"
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="userName" className="fs-5 text-info fw-medium">
                Name
              </label>
              <input
                type="text"
                className="form-control bg-info fs-5 fw-semibold text-primary"
                id="userName"
                name="userName"
                defaultValue={user.userName}
                onChange={handleDataChange}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="email" className="fs-5 text-info fw-medium">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-info fs-5 fw-semibold text-primary"
                id="email"
                name="email"
                defaultValue={user.email}
                readOnly
                // onChange={handleDataChange}
              />
            </div>
            <div className="form-group col-8 col-md-9">
              <label htmlFor="phoneNumber" className="fs-5 text-info fw-medium">
                Phone number
              </label>
              <input
                type="text"
                className="form-control bg-info fs-5 fw-semibold text-primary"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={user.phoneNumber || ""}
                onChange={handleDataChange}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success fw-semibold shadow-sm fs-5"
              >
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
