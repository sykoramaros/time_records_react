import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
// import { AuthProvider } from "./Services/GoogleAuthService/GoogleAuthService"
import { AuthProvider } from "./Services/AuthService/AuthService"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import "./App.css"
import Layout from "./Pages/Layout/Layout"
import Login from "./Pages/Login/Login"
import GoogleOAuthCallback from "./Components/GoogleOAuthCallback/GoogleOAuthCallback"
import CreateAccount from "./Pages/CreateAccount/CreateAccount"
import Home from "./Pages/Home/Home"
import Calendar from "./Pages/Calendar/Calendar"
import Users from "./Pages/Users/Users"
import Roles from "./Pages/Roles/Roles"
import EditRole from "./Pages/Roles/EditRole"
import Settings from "./Pages/Settings/Settings"
import AccessDenied from "./Pages/AccessDenied/AccessDenied"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
// import {UserProvider} from "./Services/UserContext/UserContext";

const App = () => {
  const GOOGLE_CLIENT_ID =
    "680830179798-oquu7npstv9ofbpv781kq9usq7nfjqtg.apps.googleusercontent.com"

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
          {/*<UserProvider>*/}
        <HashRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/google-callback" element={<GoogleOAuthCallback />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />

              {/* Layout s chranenymi trasami */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute roles={["Admin"]}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <ProtectedRoute roles={["Admin"]}>
                    <Roles />
                  </ProtectedRoute>
                }
              />
              <Route
                path="roles/edit/:id"
                element={
                  <ProtectedRoute roles={["Admin"]}>
                    <EditRole />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<AccessDenied />} />
            </Route>
          </Routes>
        </HashRouter>
          {/*</UserProvider>*/}
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App
