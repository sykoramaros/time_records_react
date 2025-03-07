import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Services/GoogleAuthService/GoogleAuthService"
import { GoogleLoginButton } from "../../Components/GoogleLogin/GoogleLogin"

const LoginPage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="login-page">
      <h1>Přihlášení</h1>

      <GoogleLoginButton
        onSuccess={() => navigate("/home")}
        onError={(err) => setError(err)}
      />

      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default LoginPage
