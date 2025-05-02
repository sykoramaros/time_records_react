import React from "react"
import { useNavigate } from "react-router-dom"
import { Trans } from "@lingui/react"
import { logoutUser } from "../../Services/GoogleService/GoogleService"
import "./LogoutButton.css"

const LogoutButton = () => {
  const navigate = useNavigate() // Použití useAuth hooku

  const handleLogout = async () => {
    await logoutUser()
    // Volání funkce logout z kontextu
    // Není potřeba, AuthProvider to už dělá: localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <button
        onClick={handleLogout}
        className="logout-btn btn bg-danger text-white fs-5"
        style={{ fontWeight: "600" }}
      >
        <Trans id="logout.logout-button">Logout</Trans>
      </button>
    </>
  )
}

export default LogoutButton
