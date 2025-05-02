import React from "react"
import { useState, useEffect } from "react"
import { Trans } from "@lingui/react"
import ReactDatepickerCalendar from "../../Components/ReactDatepickerCalendar/ReactDatepickerCalendar"
import ChosenMonthStatus from "../../Components/ChosenMonthStatus/ChosenMonthStatus"
import InfoBox from "../../Components/InfoBox/InfoBox"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService"
import { getChosenMonthStatus } from "../../Services/ChosenMonthStatusService/ChosenMonthStatusService"
import { getSumActualMonthRecorStudyQuery } from "../../Services/StudyStickerService/StudyStickerService"

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
  const [result, setResult] = useState(null)
  const [sumActualMonthYearRecordStudy, setSumActualMonthYearRecordStudy] =
    useState(null)

  useEffect(() => {
    if (currentViewMonth !== null && currentViewYear !== null) {
      const fetchData = async () => {
        try {
          const data = await getChosenMonthStatus(
            userLocal.id,
            currentViewMonth,
            currentViewYear
          )
          // console.log("Data:", data);
          setResult(data)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      fetchData()
    }
  }, [currentViewMonth, currentViewYear])

  useEffect(() => {
    const fetchSumActualMonthRecordStudy = async () => {
      const response = await getSumActualMonthRecorStudyQuery(userLocal.id)
      setSumActualMonthYearRecordStudy(response)
      // console.log(response)
    }
    fetchSumActualMonthRecordStudy()
  }, [])

  const handleMonthChange = (date) => {
    setCurrentViewMonth(date.getMonth())
    setCurrentViewYear(date.getFullYear())
    console.log("Month: ", date.getMonth(), "Year: ", date.getFullYear())
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center text-white display-3 text-shadow-primary py-4">
          <Trans id="calendar.h1">Calendar</Trans>
        </h1>
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
            <InfoBox result={result} studies={sumActualMonthYearRecordStudy} />
          </div>
        </div>
        {/* <div className="d-flex justify-content-center align-items-center mt-5">
          <ChosenMonthStatus result={result} />
           <p>{currentViewMonth}/{currentViewYear}</p>
        </div> */}
      </div>
    </div>
  )
}

export default Calendar
