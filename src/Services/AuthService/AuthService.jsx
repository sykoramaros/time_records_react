// import axios from "axios"
// import { jwtDecode } from "jwt-decode"
//
// // Funkce pro získání tokenu
// export const getAuthToken = () => {
//   // console.log(
//   //   "getAuthToken token in localStorage:",
//   //   localStorage.getItem("token")
//   // )
//   return localStorage.getItem("token") // Získání tokenu z localStorage
// }
//
// export const getDecodedToken = () => {
//   const token = getAuthToken() // Získání tokenu
//   if (!token) {
//     // console.error("getDecodedToken: return null.") // Chybová zpráva
//     return null
//   }
//   try {
//     // console.log("getDecodedToken:", token)
//     const decodedToken = jwtDecode(token) // Získání dekodovaného tokenu
//     return decodedToken
//   } catch (error) {
//     // console.error("getDecodedToken:", error) // Chybová zpráva
//     return null
//   }
// }
//
// // Generická funkce pro požadavky s autentifikací
// export const authAxios = (method, url, data = null) => {
//   const token = getAuthToken() // Získání tokenu
//   if (!token) {
//     // console.error("authAxios:", token) // Chybová zpráva
//     return Promise.reject("Authentiation token not found")
//   }
//   const headers = {
//     Authorization: `Bearer ${token}`, // Přidání tokenu do hlavičky
//   }
//   const config = {
//     method,
//     url,
//     headers,
//   }
//   if (data) {
//     config.data = data // Pokud je potřeba, přidáme data (pro POST, PUT, atd.)
//   }
//   // console.log("Config:", config)
//   return axios(config)
// }
//
// export const getUserRole = () => {
//   const token = getAuthToken()
//   if (!token) {
//     // console.error("Token is missing.")
//     return null
//   }
//   try {
//     const decodedToken = jwtDecode(token)
//     console.log("Decoded Token:", decodedToken)
//     // Použití správného klíče pro roli
//     const role =
//       decodedToken[
//         "https://schemas.microsoft.com/ws/2008/06/identity/claims/role"
//       ]
//     if (!role) {
//       // console.error("Role not found in token.")
//       return null
//     }
//     // console.log("getUserRole: Role:", role)
//     // console.log("getUserRole: Token:", token)
//     return role // Získání správné role
//   } catch (error) {
//     // console.error("Error decoding token:", error)
//     return null
//   }
// }

import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { authService } from "../GoogleLoginService/GoogleLoginService"

// Vytvoření AuthContext
const AuthContext = createContext(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth musí být použit uvnitř AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  // Jednotný název pro token v localStorage
  const TOKEN_KEY = "auth_token"
  const EXPIRATION_KEY = "auth_expiration"

  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [expiration, setExpiration] = useState(
      localStorage.getItem(EXPIRATION_KEY)
          ? new Date(localStorage.getItem(EXPIRATION_KEY))
          : null
  )
  const [loading, setLoading] = useState(false)
  const [userRole, setUserRole] = useState(null)

  // Inicializace role uživatele při načtení
  useEffect(() => {
    if (token) {
      const role = extractUserRole(token)
      setUserRole(role)
    }
  }, [ token ])

  // Kontrola expirace tokenu
  useEffect(() => {
    if (token && expiration && new Date() > expiration) {
      console.log("Token vypršel")
      logout()
    }
  }, [token, expiration])

  // Pomocná funkce pro extrakci role z tokenu
  const extractUserRole = (jwtToken) => {
    if (!jwtToken) return null

    try {
      const decodedToken = jwtDecode(jwtToken)
      return decodedToken["https://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null
    } catch (error) {
      console.error("Chyba při získávání role:", error)
      return null
    }
  }

  // Pomocná funkce pro uložení tokenu a jeho parametrů
  const saveToken = (jwtToken, tokenExpiration) => {
    setToken(jwtToken)
    console.log("Token uložen:", jwtToken)
    setExpiration(tokenExpiration)

    // Extrakce role z tokenu
    const role = extractUserRole(jwtToken)
    setUserRole(role)

    // Uložení do localStorage
    localStorage.setItem(TOKEN_KEY, jwtToken)
    console.log("Token uložen do LocalStorage:", jwtToken)
    if (tokenExpiration) {
      localStorage.setItem(EXPIRATION_KEY, tokenExpiration.toISOString())
    }
  }

  // Google přihlášení
  const loginWithGoogle = async (importedGoogleLoginToken) => {
    setLoading(true)
    try {
      const result = await authService.googleLogin(importedGoogleLoginToken)

      // Ověření formátu výsledku
      if (!result || !result.importedGoogleLoginToken) {
        throw new Error("Google přihlášení neposkytlo platný token")
      }

      saveToken(result.importedGoogleLoginToken, result.expiration)
      return result
    } catch (error) {
      console.error("Google přihlášení selhalo:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Klasické přihlášení pomocí uživatelského jména a hesla
  const loginWithCredentials = async (username, password) => {
    setLoading(true)
    try {
      // Použití správného formátu parametrů a withCredentials
      const response = await axios.post(
          "https://recordsapi.runasp.net/api/Account/Jwt-login",
          {
            userName: username, // Pozor na správný název parametru!
            password: password
          },
          {
            withCredentials: true, // Důležité pro cookies
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
      );

      console.log("Login result:", response.data);

      const { token: jwtToken, expiration: expStr } = response.data;

      if (!jwtToken) {
        throw new Error("Přihlášení neposkytlo platný token");
      }

      // Převod expirace na Date objekt
      const tokenExpiration = expStr ? new Date(expStr) : null;

      saveToken(jwtToken, tokenExpiration);

      // DESERIALIZACE JWT DAT Z BACKENDU do klíče "user" - stejně jako u Google přihlášení
      const userData = authService.parseJwt(jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("Deserializována data z backendu: ", userData);

      return response.data;
    } catch (error) {
      console.error("Přihlášení selhalo:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // const loginWithCredentials = async (username, password) => {
  //   setLoading(true)
  //   try {
  //     // Zde upravte URL podle vaší API
  //     const response = await axios.post("https://recordsapi.runasp.net/api/Account/Jwt-login", { username, password })
  //
  //     // Předpokládáme, že API vrací objekt s token a expiration
  //     const { token: jwtToken, expiration: expStr } = response.data
  //     console.log("Login result:", response.data)
  //
  //     if (!jwtToken) {
  //       throw new Error("Přihlášení neposkytlo platný token")
  //     }
  //
  //     // Převod expirace na Date objekt
  //     const tokenExpiration = expStr ? new Date(expStr) : null
  //
  //     saveToken(jwtToken, tokenExpiration)
  //     return response.data
  //   } catch (error) {
  //     console.error("Přihlášení selhalo:", error)
  //     throw error
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // Manuální nastavení tokenu (např. po refresh stránky)
  const setAuthToken = (jwtToken, tokenExpiration = null) => {
    try {
      if (!jwtToken) {
        throw new Error("Nelze nastavit prázdný token")
      }

      // Dekódování tokenu pro ověření platnosti
      const decodedToken = jwtDecode(jwtToken)

      // Pokud není zadána expirace, zkusit ji získat z tokenu
      if (!tokenExpiration && decodedToken.exp) {
        tokenExpiration = new Date(decodedToken.exp * 1000)
      }

      saveToken(jwtToken, tokenExpiration)
      return { token: jwtToken, decodedToken, expiration: tokenExpiration }
    } catch (error) {
      console.error("Nastavení tokenu selhalo:", error)
      throw error
    }
  }

  // Odhlášení
  const logout = () => {
    setToken(null)
    setExpiration(null)
    setUserRole(null)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EXPIRATION_KEY)
    localStorage.removeItem('auth_user')
    localStorage.removeItem('user')
    // localStorage.clear()
    console.log("Local storage po vyčištění:", localStorage)  }

  // Získání dekódovaných dat z tokenu
  const getDecodedToken = () => {
    if (!token) return null

    try {
      return jwtDecode(token)
    } catch (error) {
      console.error("Chyba při dekódování tokenu:", error)
      return null
    }
  }

  // Kontrola autentifikace
  const isAuthenticated = !!token && (!expiration || new Date() < expiration)

  // Generická funkce pro autentifikované požadavky
  const authRequest = (method, url, data = null) => {
    if (!token) {
      return Promise.reject("Autentifikační token nenalezen")
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    }

    const config = {
      method,
      url,
      headers,
    }

    if (data) {
      config.data = data
    }

    return axios(config)
  }

  // Pomocné metody pro jednotlivé HTTP metody
  const authGet = (url) => authRequest("get", url)
  const authPost = (url, data) => authRequest("post", url, data)
  const authPut = (url, data) => authRequest("put", url, data)
  const authDelete = (url) => authRequest("delete", url)

  const contextValue = {
    isAuthenticated,
    token,
    userRole,
    loading,

    // Přihlašovací metody
    loginWithCredentials,
    loginWithGoogle,
    setAuthToken, // Pro manuální nastavení
    logout,

    // Informace o uživateli
    getDecodedToken,
    getUserRole: () => userRole,

    // Autentifikované požadavky
    authRequest,
    authGet,
    authPost,
    authPut,
    authDelete
  }

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  )
}

// Pomocné exporty pro zpětnou kompatibilitu
export const getAuthToken = () => localStorage.getItem("auth_token")

export const getDecodedToken = () => {
  const token = getAuthToken()
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch (error) {
    console.error("Chyba při dekódování tokenu:", error)
    return null
  }
}

export const getUserRole = () => {
  const token = getAuthToken()
  if (!token) return null

  try {
    const decodedToken = jwtDecode(token)
    return decodedToken["https://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null
  } catch (error) {
    console.error("Chyba při získávání role:", error)
    return null
  }
}

export const authAxios = (method, url, data = null) => {
  const token = getAuthToken()
  if (!token) {
    return Promise.reject("Autentifikační token nenalezen")
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const config = {
    method,
    url,
    headers,
  }

  if (data) {
    config.data = data
  }

  return axios(config)
}
