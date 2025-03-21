import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../Services/AuthService/AuthService"
import { GoogleLogin } from "@react-oauth/google"
import { SendGoogleCredentialToApi } from "../../Services/GoogleService/GoogleService";
import { Tooltip } from "bootstrap"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithCredentials } = useAuth() // Správné použití hooku useAuth
  const [googleCredential, setGoogleCredential] = useState(null)
  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false)

  useEffect(() => {
    // Inicializace tooltipů pro obě pole
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    if (usernameInput) new Tooltip(usernameInput)
    if (passwordInput) new Tooltip(passwordInput)
  }, [])

  // normalni prihlasovani pres jmeno a heslo
  const handleLogin = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      console.log("Logging in...")
      // Správné volání loginWithCredentials funkce
      const result = await loginWithCredentials(username.trim(), password)
      console.log("Login result:", result)

      // Upraveno podle očekávaného výstupu z vašeho AuthService
      if (result && result.token) {
        console.log("Login successful, redirecting to home")
        navigate("/home")
      } else {
        console.log("Login failed")
        setErrorMessage("Login failed. Please check your credentials.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrorMessage("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // google prihlasovani
  useEffect(() => {
  async function sendGoogleCredential() {
    if (googleCredential) {
      try {
        console.log("Sent google credential from Login page", googleCredential.credential)
        await SendGoogleCredentialToApi(googleCredential.credential)
        setGoogleLoginSuccess(true)
        // navigate("/home")
      } catch (error) {
        console.error("Error:", error)
        setErrorMessage("An error occurred during login. Please try again.", error)
      }
    }
  }
    sendGoogleCredential()
  }, [googleCredential])

  return (
      <div style={{height: "100vh"}}>
        <div className="container">
          <h1 className="text-center text-white display-3 text-shadow-primary py-4">
            Login
          </h1>
          <form className="w-75 mt-5 mx-auto" onSubmit={handleLogin}>
            {/* Zbytek kódu zůstává stejný */}
            <div className="mb-3">
              <label
                  htmlFor="username"
                  className="form-label text-info fw-semibold"
              >
                Username
              </label>
              <input
                  type="text"
                  className="form-control bg-info"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  data-bs-toggle="tooltip"
                  data-bs-title="Username: '<strong class='text-warning'>sef</strong>' or '<strong class='text-warning'>guest</strong>'"
                  data-bs-html="true"
                  data-bs-placement="top"
                  style={{ cursor: "pointer" }}
                  autoFocus
                  required
              />
            </div>
            <div className="mb-3">
              <label
                  htmlFor="password"
                  className="form-label text-info fw-semibold"
              >
                Password
              </label>
              <input
                  type="password"
                  className="form-control bg-info"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  data-bs-toggle="tooltip"
                  data-bs-title="Password: '<strong class='text-warning'>Abcd1234.</strong>' (same for sef and guest)"
                  data-bs-html="true"
                  data-bs-placement="top"
                  required
              />
            </div>
            {errorMessage && (
                <div className="error-message my-3" style={{ color: "red" }}>
                  {errorMessage}
                </div>
            )}
            <button
                type="submit"
                className="btn btn-success fs-5 fw-semibold shadow-sm"
                disabled={isLoading}
            >
              {isLoading ? (
                  <>
                <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                ></span>
                    Loading...
                  </>
              ) : (
                  "Login"
              )}
            </button>
            <Link
                to="/create-account"
                className="fs-5 fw-semibold ms-3 text-info text-decoration-underline"
            >
              Create account
            </Link>
            <p id="error-message" className="text-danger"></p>
            <hr />
            <div className="ms-2">
            <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  // credential je parametr se musi tak jmenovat a je z prichazejiciho objektu z Googlu
                  setGoogleCredential(credentialResponse)
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
            />
            </div>
          </form>
        </div>
        {googleLoginSuccess ? <div className="text-success mt-3">Google login successful</div> : null}
        {/*{googleCredential && <SendGoogleCredentialToApi googleCredential={googleCredential} />}*/}
      </div>
  )
}

export default Login