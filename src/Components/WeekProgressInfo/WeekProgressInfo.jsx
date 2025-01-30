import React from "react"
import { useState, useEffect } from "react"
import {
  getSumActualWeekTotalRecordTime,
  getWeekRecordProgress,
} from "../../Services/DashboardService/DashboardService"

const WeekProgressInfo = () => {
  const [sumActualWeekTotalRecordTime, setSumActualWeekTotalRecordTime] =
    useState(0)
  const [weekRecordProgress, setWeekRecordProgress] = useState(0)

  useEffect(() => {
    const fetchSumActualWeekTotalRecordTime = async () => {
      try {
        const response = await getSumActualWeekTotalRecordTime()
        setSumActualWeekTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumActualWeekTotalRecordTime()

    const fetchWeekRecordProgress = async () => {
      try {
        const response = await getWeekRecordProgress()
        setWeekRecordProgress(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchWeekRecordProgress()
  }, [])

  return (
    <div>
      <h3 className="text-center fs-4 fw-light">Month Progress</h3>
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
            className="progress-bar fs-5"
            style={{ width: `${weekRecordProgress}%` }}
          >
            {weekRecordProgress}%
          </div>
        </div>
      </div>
      <p className="text-center fs-5 mt-4">
        {sumActualWeekTotalRecordTime.hours} :{" "}
        {sumActualWeekTotalRecordTime.minutes}
      </p>
    </div>
  )
}

export default WeekProgressInfo
