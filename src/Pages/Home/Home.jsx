import React from "react"
import Dashboard from "../../Components/Dashboard/Dashboard"
// import {useUser} from "../../Services/UserContext/UserContext";

const Home = () => {
  const userJson = localStorage.getItem("user")
  const userLocal = userJson ? JSON.parse(localStorage.getItem("user")) : null

  return (
  <div>
      <div className="w-100">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Welcome {userLocal["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}
        </h1>
        {/*<p>{userLocal["Id"]}</p>*/}
        <div className="">
          <Dashboard />
        </div>
      </div>
  </div>
  )
}

export default Home
