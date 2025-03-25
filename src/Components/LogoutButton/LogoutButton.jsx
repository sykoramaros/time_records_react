import React from "react"
import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
  const navigate = useNavigate()// Použití useAuth hooku

  const handleLogout = async () => {
 // Volání funkce logout z kontextu
    // Není potřeba, AuthProvider to už dělá: localStorage.removeItem("token")
    navigate("/login")
  }

  return (
      <button
          onClick={handleLogout}
          className="btn bg-danger text-white fs-5 ms-auto"
          style={{ fontWeight: "600" }}
      >
        Logout
      </button>
  )
}

export default LogoutButton