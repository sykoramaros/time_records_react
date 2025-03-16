import React from "react"
import Dashboard from "../../Components/Dashboard/Dashboard"
// import {useUser} from "../../Services/UserContext/UserContext";

const Home = () => {
  const userJson = localStorage.getItem("user")
  const userLocal = userJson ? JSON.parse(localStorage.getItem("user")) : null

  // const user = useUser();

  if (!userLocal) {
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

  // // Bezpečnostní kontroly, aby se zajistilo, že user není null nebo undefined
  // const userName = user?.username ?? "Unknown";
  // const userId = user?.id ?? "No ID";
  // const userEmail = user?.email ?? "No Email";
  // const userPhoneNumber = user?.phoneNumber ?? "No Phone Number";
  // const userMonthTimeGoal = user?.monthTimeGoal ?? "No Time Goal"

  return (
    <div>
      <div className="container">
        {/*<h1 className="text-center text-white display-3 text-shadow-primary py-4">*/}
        {/*  ✅🤓😊Welcome {userName}*/}
        {/*  <p>{userId}</p>*/}
        {/*  <p>{userEmail}></p>*/}
        {/*  <p>{user.phoneNumber}</p>*/}
        {/*  <p>{user.monthTimeGoal}</p>*/}
        {/*</h1>*/}
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Welcome {userLocal["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}
        </h1>
        {/*<p>{userLocal["Id"]}</p>*/}
        <Dashboard />
      </div>
    </div>
  )
}

export default Home
