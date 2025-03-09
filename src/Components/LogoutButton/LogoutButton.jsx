// import React from "react"
// import { useNavigate } from "react-router-dom"
// // import { logout } from "../../Services/LoginService/LoginService"
// import { AuthProvider } from "../../Services/AuthService/AuthService"
//
// const LogoutButton = () => {
//   const navigate = useNavigate()
//
//   const handleLogout = async () => {
//     await AuthProvider.logout()
//     localStorage.removeItem("token")
//     // alert("Logout successful")
//     navigate("/login")
//   }
//
//   return (
//     <button
//       onClick={handleLogout}
//       className="btn bg-danger text-white fs-5 ms-auto"
//       style={{ fontWeight: "600" }}
//     >
//       Logout
//     </button>
//   )
// }
//
// export default LogoutButton

import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Services/AuthService/AuthService"

const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()  // Použití useAuth hooku

  const handleLogout = async () => {
    logout()  // Volání funkce logout z kontextu
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