import React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { sendGoogleCredentialToApi, getUserFromToken } from "../../Services/GoogleService/GoogleService";
import { Trans } from "@lingui/react"
import { Tooltip } from "bootstrap"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [googleCredential, setGoogleCredential] = useState(null)
  const [googleLoginSuccess, setGoogleLoginSuccess] = useState(false)

  useEffect(() => {
    // Inicializace tooltipů pro obě pole
    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    if (usernameInput) new Tooltip(usernameInput)
    if (passwordInput) new Tooltip(passwordInput)
  }, [])

  // google prihlasovani
  useEffect(() => {
  async function handleSendGoogleCredential() {
    if (googleCredential) {
      try {
        // console.log("Sent google credential from Login page", googleCredential.credential)
        const response = await sendGoogleCredentialToApi(googleCredential.credential)
        const decodedUser = getUserFromToken(response.googleLoginToken)

        if (decodedUser) {
          // console.log("Login.jsx Decoded user:", decodedUser)
          setGoogleLoginSuccess(true)
          navigate("/home")
        } else {
          console.error("Error: decodedUser is null or undefined")
          throw new Error("decodedUser is null or undefined")
        }
      } catch (error) {
        console.error("Error:", error)
        setErrorMessage(`An error occurred during login." ${error.message}`)
      }
    }
  }
  handleSendGoogleCredential()
  }, [googleCredential, navigate])

  return (
      <div style={{height: "100vh"}}>
        <div className="container">
          <h1 className="text-center text-white display-3 text-shadow-primary py-4">
            <Trans id="login.h1">Login</Trans>
          </h1>
          <form className="w-75 mt-5 mx-auto" onSubmit={""}>
            <div className="mb-3">
              <label
                  htmlFor="username"
                  className="form-label text-info fw-semibold text-decoration-line-through"
              >
                <Trans id="login.username">Username</Trans>
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
                  // style={{ cursor: "pointer" }}
                  autoFocus
                  // required
                  readOnly
              />
            </div>
            <div className="mb-3">
              <label
                  htmlFor="password"
                  className="form-label text-info fw-semibold text-decoration-line-through"
              >
                <Trans id="login.password">Password</Trans>
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
                  // style={{ cursor: "pointer" }}
                  // required
                  readOnly
              />
            </div>
            {errorMessage && (
                <div className="error-message my-3" style={{ color: "red" }}>
                  {errorMessage}
                </div>
            )}
            <button
                type="submit"
                className="btn btn-success fs-5 fw-semibold shadow-sm text-decoration-line-through"
                // disabled={isLoading}
                disabled
            >
              {isLoading ? (
                  <>
                <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                ></span>
                    <Trans id="login.loading">Loading...</Trans>
                  </>
              ) : (
                  <Trans id="login.login-button">Login</Trans>
              )}
            </button>
            {/*<Link*/}
            {/*    to="/create-account"*/}
            {/*    className="fs-5 fw-semibold ms-3 text-info text-decoration-underline"*/}
            {/*>*/}
            {/*  Create account*/}
            {/*</Link>*/}
            <span className="text-white fw-normal ms-5"><Trans id="login.info">Please, for this time use only Google login</Trans></span>
            <p id="error-message" className="text-danger"></p>
            <hr />
            <div className="">
            <GoogleLogin
                onSuccess={credentialResponse => {
                  // console.log(credentialResponse);
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
        {/*{googleLoginSuccess ? <div className="text-white mt-3">Google login successful</div> : <div className="text-danger mt-3">Google login failed</div>}*/}
        {/*{googleCredential && <sendGoogleCredentialToApi googleCredential={googleCredential} />}*/}
      </div>
  )
}

export default Login