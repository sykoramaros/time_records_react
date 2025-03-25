import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
// import { AuthProvider } from "./Services/GoogleAuthService/GoogleAuthService"
// import { AuthProvider } from "./Services/AuthService/AuthService"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import "./App.css"
import Layout from "./Pages/Layout/Layout"
import Login from "./Pages/Login/Login"
import Home from "./Pages/Home/Home"
import Calendar from "./Pages/Calendar/Calendar"
import Users from "./Pages/Users/Users"
import Roles from "./Pages/Roles/Roles"
import EditRole from "./Pages/Roles/EditRole"
import Settings from "./Pages/Settings/Settings"
import AccessDenied from "./Pages/AccessDenied/AccessDenied"
// import {UserProvider} from "./Services/UserContext/UserContext";
// import GoogleLoginPage from "./Pages/GoogleLoginPage/GoogleLoginPage";

import csLogin from "./locales/cs/login.json"
import enLogin from "./locales/en/login.json"

i18n.load({cs: csLogin})
i18n.load({en: enLogin})

i18n.activate("en")

const App = () => {
  const GOOGLE_CLIENT_ID =
    "680830179798-oquu7npstv9ofbpv781kq9usq7nfjqtg.apps.googleusercontent.com"

  return (
    <I18nProvider i18n={i18n}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/*<AuthProvider>*/}
          {/*<UserProvider>*/}
        <HashRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/google-login" element={<GoogleLoginPage />} />*/}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />

              {/* Layout s chranenymi trasami */}
              <Route
                path="/users"
                element={<Users />}
              />
              <Route
                path="/roles"
                element={<Roles />}
              />
              <Route
                path="roles/edit/:id"
                element={<EditRole />}
              />
              <Route path="*" element={<AccessDenied />} />
            </Route>
          </Routes>
        </HashRouter>
          {/*</UserProvider>*/}
      {/*</AuthProvider>*/}
    </GoogleOAuthProvider>
    </I18nProvider>
  )
}

export default App
