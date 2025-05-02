import React from "react"
import { useState, useEffect } from "react"
import { Trans } from "@lingui/react"
import ReactDatepickerCalendar from "../../Components/ReactDatepickerCalendar/ReactDatepickerCalendar"
import InfoBox from "../../Components/InfoBox/InfoBox"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService"
import { getChosenMonthStatus } from "../../Services/ChosenMonthStatusService/ChosenMonthStatusService"
import { getSumChosenMonthRecordStudyQuery } from "../../Services/StudyStickerService/StudyStickerService"

const Calendar = () => {
  // const user = JSON.parse(localStorage.getItem("user"))
  // console.log("Celý user objekt:", user)
  const [currentViewMonth, setCurrentViewMonth] = useState(
    new Date().getMonth()
  )
  const [currentViewYear, setCurrentViewYear] = useState(
    new Date().getFullYear()
  )

  const userLocal = getUserFromLocalStorage()
  const [timeResult, setTimeResult] = useState(null)
  const [currentViewStudies, setCurrentViewStudies] = useState(0)

  useEffect(() => {
    if (currentViewMonth !== null && currentViewYear !== null) {
      const fetchData = async () => {
        try {
          const data = await getChosenMonthStatus(
            userLocal.id,
            currentViewMonth,
            currentViewYear
          )
          setTimeResult(data)
          // console.log("Time result:", data)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      fetchData()
    }

    const fetchSumChosenMonthRecordStudy = async () => {
      const response = await getSumChosenMonthRecordStudyQuery(
        userLocal.id,
        currentViewMonth,
        currentViewYear
      )
      setCurrentViewStudies(response)
      // console.log("Studies: " + currentViewStudies)
    }
    fetchSumChosenMonthRecordStudy()
  }, [userLocal.id, currentViewMonth, currentViewYear, currentViewStudies])

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
            <InfoBox timeResult={timeResult} studies={currentViewStudies} />
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
