import React, { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../GoogleLoginService/GoogleLoginService"

// Vytvoření AuthContext bez typových anotací
const AuthContext = createContext(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth musí být použit uvnitř AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("auth_token"))
  const [expiration, setExpiration] = useState(
    localStorage.getItem("auth_expiration")
      ? new Date(localStorage.getItem("auth_expiration"))
      : null
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token && expiration && new Date() > expiration) {
      // Token vypršel
      logout()
    }
  }, [token, expiration])

  const login = async (idToken) => {
    setLoading(true)
    try {
      const result = await authService.googleLogin(idToken)
      setToken(result.token)
      setExpiration(result.expiration)
      localStorage.setItem("auth_token", result.token)
      localStorage.setItem("auth_expiration", result.expiration.toISOString())
    } catch (error) {
      console.error("Přihlášení selhalo:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setExpiration(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_expiration")
  }

  const isAuthenticated = !!token && !!(expiration && new Date() < expiration)

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
