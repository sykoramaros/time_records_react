import React from "react"
import Dashboard from "../../Components/Dashboard/Dashboard"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService";
// import {useUser} from "../../Services/UserContext/UserContext";

const Home = () => {
    const userLocal = getUserFromLocalStorage();
    console.log("userLocal:", userLocal.userName)

  return (
  <div>
      <div className="w-100">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Welcome {userLocal.userName}
        </h1>
        <div className="">
          <Dashboard />
        </div>
      </div>
  </div>
  )
}

export default Home