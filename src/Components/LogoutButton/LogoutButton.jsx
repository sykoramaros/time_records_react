import React from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../Services/LoginService/LoginService"

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem("token")
    // alert("Logout successful")
    navigate("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="btn bg-danger text-white fs-5 ms-auto"
    >
      Logout
    </button>
  )
}

export default LogoutButton
