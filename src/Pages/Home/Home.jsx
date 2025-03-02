import React from "react"
import Dashboard from "../../Components/Dashboard/Dashboard"

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Welcome {user.username}
        </h1>
        <Dashboard />
      </div>
    </div>
  )
}

export default Home
