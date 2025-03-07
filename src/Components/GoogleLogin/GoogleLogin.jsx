import React from "react"
import { useEffect, useRef } from "react"
import { GoogleLogin } from "@react-oauth/google"
import { useAuth } from "../../Services/GoogleAuthService/GoogleAuthService" // Import AuthProvider hook
// Nezapomeňte přidat React Google Login knihovnu:
// npm install @react-oauth/google

export const GoogleLoginButton = ({ onSuccess, onError }) => {
  const { login, loading } = useAuth()

  const handleSuccess = async (response) => {
    try {
      // Získáme id_token z Google odpovědi
      const idToken = response.credential

      if (!idToken) {
        throw new Error("Google neposkytl ID token")
      }

      await login(idToken)
      onSuccess?.()
    } catch (error) {
      console.error("Chyba při přihlášení:", error)
      onError?.(error instanceof Error ? error.message : "Neznámá chyba")
    }
  }

  const handleError = () => {
    const errorMessage = "Google přihlášení selhalo"
    console.error(errorMessage)
    onError?.(errorMessage)
  }

  return (
    <div className="google-login-container">
      {loading ? (
        <div>Načítání...</div>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
        />
      )}
    </div>
  )
}
