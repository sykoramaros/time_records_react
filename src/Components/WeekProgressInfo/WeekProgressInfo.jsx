import React from "react"
import { useState, useEffect, useRef } from "react"
import {
  getSumActualWeekTotalRecordTimeQuery,
  getWeekRecordProgressQuery,
  getWeekRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"

const WeekProgressInfo = () => {
  const [sumActualWeekTotalRecordTime, setSumActualWeekTotalRecordTime] =
    useState(0)
  const [weekRecordProgress, setWeekRecordProgress] = useState(0)
  const [weekRemainingTime, setWeekRemainingTime] = useState(0)
  const [bgProgress, setBgProgress] = useState("bg-danger")
  const [sumTextColor, setSumTextColor] = useState("text-danger")
  const sumActualWeekTotalRecordTimeRef = useRef(null)
  const weekRemainingTimeRef = useRef(null)

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

    if (sumActualWeekTotalRecordTimeRef.current) {
      new Tooltip(sumActualWeekTotalRecordTimeRef.current)
    }
    if (weekRemainingTimeRef.current) {
      new Tooltip(weekRemainingTimeRef.current)
    }
  }, [])

  useEffect(() => {
    if (weekRecordProgress > 30 && weekRecordProgress < 50) {
      setBgProgress("bg-warning")
      setSumTextColor("text-warning")
    } else if (weekRecordProgress >= 50) {
      setBgProgress("bg-success")
      setSumTextColor("text-success")
    } else {
      setBgProgress("bg-danger")
      setSumTextColor("text-danger")
    }
  }, [weekRecordProgress])

  return (
    <div>
      <h3 className="text-center text-primary fs-3 fw-light">Week Progress</h3>
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
      <div className="row mt-4 w-75 mx-auto">
        <div className="col-12 col-sm-6">
          <p
            className={`text-center ${sumTextColor} fs-5 fw-bold mt-4`}
            ref={sumActualWeekTotalRecordTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Current <strong>week's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {sumActualWeekTotalRecordTime.hours} :{" "}
            {sumActualWeekTotalRecordTime.minutes}
          </p>
        </div>
        <div className="col-12 col-sm-6">
          <p
            className={`text-center text-primary fs-5 mt-4`}
            ref={weekRemainingTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Remaining <strong>week's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {weekRemainingTime.hours} : {weekRemainingTime.minutes}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeekProgressInfo
