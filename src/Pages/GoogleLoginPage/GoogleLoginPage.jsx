import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useAuth } from "../../Services/GoogleAuthService/GoogleAuthService"
import { useAuth } from "../../Services/AuthService/AuthService"
import { GoogleLoginButton } from "../../Components/GoogleLoginButton/GoogleLoginButton"

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
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Login
        </h1>
        <div className="login-page w-50 mx-auto justify-content-center">
          <GoogleLoginButton
            onSuccess={() => navigate("/home")}
            onError={(err) => setError(err)}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
