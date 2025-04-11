import React from "react"
import { useState, useEffect, useRef } from "react"
import { Trans } from "@lingui/react"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService"
import {
  getSumActualWeekTotalRecordTimeQuery,
  getWeekRecordProgressQuery,
  getWeekRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"
import "./WeekProgressInfo.css"

const WeekProgressInfo = () => {
  const [sumActualWeekTotalRecordTime, setSumActualWeekTotalRecordTime] =
    useState(0)
  const [weekRecordProgress, setWeekRecordProgress] = useState(0)
  const [weekRemainingTime, setWeekRemainingTime] = useState({})
  const [formattedRemainingTime, setFormattedRemainingTime] = useState({})
  const [bgProgress, setBgProgress] = useState("bg-danger")
  const [sumTextColor, setSumTextColor] = useState("text-danger")
  const sumActualWeekTotalRecordTimeRef = useRef(null)
  const weekRemainingTimeRef = useRef(null)
  const userLocal = getUserFromLocalStorage()
  const [numberSign, setNumberSign] = useState("")

  useEffect(() => {
    const fetchSumActualWeekTotalRecordTime = async () => {
      try {
        const response = await getSumActualWeekTotalRecordTimeQuery(userLocal.id)
        setSumActualWeekTotalRecordTime(response)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumActualWeekTotalRecordTime()

    const fetchWeekRecordProgress = async () => {
      try {
        const response = await getWeekRecordProgressQuery(userLocal.id)
        setWeekRecordProgress(response)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchWeekRecordProgress()

    const fetchWeekRemainingTime = async () => {
      try {
        const response = await getWeekRemainingTimeQuery(userLocal.id)
        setWeekRemainingTime(response)
        // console.log(response)
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
  }, [userLocal.id])

  useEffect(() => {
  // console.log(weekRemainingTime)
    const formatted = {
      hours: Math.abs(weekRemainingTime.hours),
      minutes: Math.abs(weekRemainingTime.minutes),
    }
  if (weekRemainingTime?.hours + weekRemainingTime?.minutes > 0) {
    setNumberSign("- ")
  } else if (weekRemainingTime?.hours + weekRemainingTime?.minutes < 0) {
    setNumberSign("+ ")
  } else {
    setNumberSign("")
  }
  setFormattedRemainingTime(formatted)
  // console.log(numberSign)
  }, [numberSign, weekRemainingTime]);

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
      <h3 className="text-center text-primary fs-3 fw-light"><Trans id="weekProgressInfo.actual-week-progress">Actual Week Progress</Trans></h3>
      <div className="d-flex justify-content-center mt-4 w-100">
        <div
          className="progress rounded-5 w-100"
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
      <div className="row w-100 mx-auto">
        <div className="col-6">
          <p
            className={`week-total-time text-center ${sumTextColor} fw-bold mt-4`}
            ref={sumActualWeekTotalRecordTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Current <strong>week's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {sumActualWeekTotalRecordTime.hours?.toLocaleString("en-US", { minimumIntegerDigits: 2 })} : {" "}
            {sumActualWeekTotalRecordTime.minutes?.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
          </p>
        </div>
        <div className="col-6">
          <p
            className="week-remaining-time text-center text-primary mt-4"
            ref={weekRemainingTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Remaining <strong>week's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {numberSign} {formattedRemainingTime.hours?.toLocaleString("en-US", { minimumIntegerDigits: 2 })} : {" "}
            {formattedRemainingTime.minutes?.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WeekProgressInfo