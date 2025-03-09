import React from "react"
import Dashboard from "../../Components/Dashboard/Dashboard"

const Home = () => {
  const userJson = localStorage.getItem("user")
  const user = userJson ? JSON.parse(localStorage.getItem("user")) : null

  if (!user) {
    return (
      <div>
        <div className="container">
          <h1 className="text-center text-white display-3 text-shadow-primary py-4">
            Welcome unknown
          </h1>
          <p>If your name didn't appear, please contact me:)</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          🤓😊Welcome {user.username}
        </h1>
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          🤓😊Welcome {user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}
        </h1>
        <p>{user.id}</p>
        <p>{user["Id"]}</p>
        <Dashboard />
      </div>
    </div>
  )
}

export default Home
