import React from "react"
import { useState, useEffect } from "react";
import { Trans } from "@lingui/react";
import ReactDatepickerCalendar from "../../Components/ReactDatepickerCalendar/ReactDatepickerCalendar"
import ChosenMonthStatus   from "../../Components/ChosenMonthStatus/ChosenMonthStatus";

const Calendar = () => {
  // const user = JSON.parse(localStorage.getItem("user"))
  // console.log("Celý user objekt:", user)
  const [currentViewMonth, setCurrentViewMonth] = useState(new Date().getMonth())
  const [currentViewYear, setCurrentViewYear] = useState(new Date().getFullYear())

  const handleMonthChange = (date) => {
    setCurrentViewMonth(date.getMonth())
    setCurrentViewYear(date.getFullYear())
    console.log("Month: ", date.getMonth(), "Year: ", date.getFullYear())
  }

  // useEffect(() => {
  //   const currentMonth = new Date().getMonth()
  //   const currentYear = new Date().getFullYear()
  //   setCurrentViewMonth(currentMonth)
  //   setCurrentViewYear(currentYear)
  // }, []);


  return (
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          <Trans id="calendar.h1">Calendar</Trans>
        </h1>
        {/* <h2>User ID: {user.userId || "No user ID found"}</h2>
        <h3>Role: {user.email}</h3>
        <h4>Role: {user.phoneNumber}</h4> */}
        <div className="row justify-content-center">
          <ReactDatepickerCalendar
              onCalendarChange={handleMonthChange}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mt-5">
          <ChosenMonthStatus
          month={currentViewMonth}
          year={currentViewYear}
          />
          {/*<p>{currentViewMonth}/{currentViewYear}</p>*/}
        </div>
      </div>
    </div>
  )
}

export default Calendar
