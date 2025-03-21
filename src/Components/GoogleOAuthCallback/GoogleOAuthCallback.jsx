import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../Services/AuthService/AuthService"

const OAuthCallback = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginWithGoogle } = useAuth()  // Změna názvu funkce

  useEffect(() => {
    // Extrakce token parametru z URL
    const params = new URLSearchParams(location.search)
    const importedGoogleLoginToken = params.get("id_token") || params.get("credential")

    const handleCallback = async () => {
      try {
        if (importedGoogleLoginToken) {
          await loginWithGoogle(importedGoogleLoginToken)
          console.log("Navigating to calendar")
          navigate("/calendar")
        } else {
          console.error("Chybí přihlašovací token. Navigate to login")
          navigate("/login")
        }
      } catch (error) {
        console.error("Chyba při zpracování callback:", error)
        navigate("/login", { state: { error: "Přihlášení selhalo" } })
      }
    }

    handleCallback().catch(error => {
      console.error("Neošetřená chyba v callback:", error)
      navigate("/login", { state: { error: "Neočekávaná chyba" } })
    })
  }, [location, loginWithGoogle, navigate])

  return (
      <div className="oauth-callback-container">
        <h2>Probíhá přihlašování...</h2>
        <p>Prosím čekejte, budete přesměrováni.</p>
      </div>
  )
}

export default OAuthCallback