import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../Services/GoogleAuthService/GoogleAuthService" // Import AuthProvider hook

const OAuthCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  useEffect(() => {
    // Extrakce token parametru z URL
    const params = new URLSearchParams(location.search)
    const idToken = params.get("id_token") || params.get("credential")

    const handleCallback = async () => {
      try {
        if (idToken) {
          await login(idToken)
          navigate("/home")
        } else {
          console.error("Chybí přihlašovací token")
          navigate("/login")
        }
      } catch (error) {
        console.error("Chyba při zpracování callback:", error)
        navigate("/login", { state: { error: "Přihlášení selhalo" } })
      }
    }

    handleCallback()
  }, [location, login, navigate])

  return (
    <div className="oauth-callback-container">
      <h2>Probíhá přihlašování...</h2>
      <p>Prosím čekejte, budete přesměrováni.</p>
    </div>
  )
}

export default OAuthCallback
