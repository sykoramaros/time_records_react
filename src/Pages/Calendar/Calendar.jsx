import React from "react"
import { useState, useEffect } from "react"
import { Trans } from "@lingui/react"
import ReactDatepickerCalendar from "../../Components/ReactDatepickerCalendar/ReactDatepickerCalendar"
import InfoBox from "../../Components/InfoBox/InfoBox"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService"
import { getChosenMonthTotalRecordQuery } from "../../Services/ChosenMonthStatusService/ChosenMonthStatusService"

const Calendar = () => {
  // const user = JSON.parse(localStorage.getItem("user"))
  // console.log("Celý user objekt:", user)
  const [currentViewMonth, setCurrentViewMonth] = useState(
    new Date().getMonth()
  )
  const [currentViewYear, setCurrentViewYear] = useState(
    new Date().getFullYear()
  )
  const [chosenMonthRecord, setChosenMonthRecord] = useState(null)

  const userLocal = getUserFromLocalStorage()

  useEffect(() => {
    const fetchRecordByChoosenMonthQuery = async () => {
      const response = await getChosenMonthTotalRecordQuery(
        userLocal.id,
        currentViewMonth,
        currentViewYear
      )
      console.log("Record: " + response)
      setChosenMonthRecord(response)
    }
    fetchRecordByChoosenMonthQuery()
  }, [userLocal.id, currentViewMonth, currentViewYear])

  const handleMonthChange = (date) => {
    setCurrentViewMonth(date.getMonth())
    setCurrentViewYear(date.getFullYear())
    // console.log("Month: ", currentViewMonth, "Year: ", currentViewYear)
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          <Trans id="calendar.h1">Calendar</Trans>
        </h1>
        {/* <span>{currentViewStudies}</span>
        <p>
          {currentViewMonth}/{currentViewYear}
        </p> */}
        {/* <span className="text-warning text-uppercase fw-normal">
          {result?.hours.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
          })}
        </span>
        <span>{result?.hours}</span>
        <p className="text-white text-center fw-semibold mt-3">
          {sumActualMonthYearRecordStudy}
        </p> */}

        {/* <h2>User ID: {user.userId || "No user ID found"}</h2>
        <h3>Role: {user.email}</h3>
        <h4>Role: {user.phoneNumber}</h4> */}
        <div className="row px-4">
          <div className="col-12 mx-auto d-flex justify-content-center">
            <ReactDatepickerCalendar onCalendarChange={handleMonthChange} />
          </div>
          <div className="col-12 col-md-5 col-lg-4 col-xl-3">
            <InfoBox chosenMonthRecord={chosenMonthRecord} />
          </div>
        </div>
        {/* <div className="d-flex justify-content-center align-items-center mt-5">
          <ChosenMonthStatus result={result} />
           <p>{currentViewMonth}/{currentViewYear}</p>
        </div> */}
      </div>
    </>
  )
}

export default Calendar
