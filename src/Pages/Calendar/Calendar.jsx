import React from "react"
import ReactDatepickerCalendar from "../../Components/ReactDatepickerCalendar/ReactDatepickerCalendar"

const Calendar = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  // console.log("Celý user objekt:", user)

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          Calendar
        </h1>
        {/* <h2>User ID: {user.userId || "No user ID found"}</h2>
        <h3>Role: {user.email}</h3>
        <h4>Role: {user.phoneNumber}</h4> */}
        <div className="row justify-content-center">
          <ReactDatepickerCalendar />
        </div>
      </div>
    </div>
  )
}

export default Calendar
