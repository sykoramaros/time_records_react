import React from "react"
import { useState, useEffect } from "react"
import {
  getSumActualWeekTotalRecordTimeQuery,
  getWeekRecordProgressQuery,
  getWeekRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"

const WeekProgressInfo = () => {
  const [sumActualWeekTotalRecordTime, setSumActualWeekTotalRecordTime] =
    useState(0)
  const [weekRecordProgress, setWeekRecordProgress] = useState(0)
  const [weekRemainingTime, setWeekRemainingTime] = useState(0)
  const [bgProgress, setBgProgress] = useState("bg-danger")

  useEffect(() => {
    const fetchSumActualWeekTotalRecordTime = async () => {
      try {
        const response = await getSumActualWeekTotalRecordTimeQuery()
        setSumActualWeekTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumActualWeekTotalRecordTime()

    const fetchWeekRecordProgress = async () => {
      try {
        const response = await getWeekRecordProgressQuery()
        setWeekRecordProgress(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchWeekRecordProgress()

    const fetchWeekRemainingTime = async () => {
      try {
        const response = await getWeekRemainingTimeQuery()
        setWeekRemainingTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchWeekRemainingTime()
  }, [])

  useEffect(() => {
    if (weekRecordProgress > 30 && weekRecordProgress < 50) {
      setBgProgress("bg-warning")
    } else if (weekRecordProgress >= 50) {
      setBgProgress("bg-success")
    } else {
      setBgProgress("bg-danger")
    }
  }, [weekRecordProgress])

  return (
    <div>
      <h3 className="text-center fs-4 fw-light">Week Progress</h3>
      <div className="d-flex justify-content-center mt-4">
        <div
          className="progress rounded-5 w-75"
          style={{ height: "25px" }}
          role="progressbar"
          aria-label="Example progress bar"
          aria-valuenow={weekRecordProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className={`progress-bar ${bgProgress} fs-5`}
            style={{ width: `${weekRecordProgress}%` }}
          >
            {weekRecordProgress}%
          </div>
        </div>
      </div>
      <div className="row row-cols-3 d-flex justify-content-center mt-4 mx-auto">
        <div className="col">
          <p className="text-center text-success fs-5 mt-4">
            {sumActualWeekTotalRecordTime.hours} :{" "}
            {sumActualWeekTotalRecordTime.minutes}
          </p>
        </div>
        <div className="col">
          <p className="text-center text-danger fs-5 mt-4">
            {weekRemainingTime.hours} : {weekRemainingTime.minutes}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeekProgressInfo
