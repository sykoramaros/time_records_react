import React from "react"
import { useState, useEffect, useRef } from "react"
import {
  getSumActualMonthTotalRecordTimeQuery,
  getMonthRecordProgressQuery,
  getMonthRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"
import "./MonthProgressInfo.css"

const MonthProgressInfo = () => {
  const [sumActualMonthTotalRecordTime, setSumActualMonthTotalRecordTime] =
    useState(0)
  const [monthRecordProgress, setMonthRecordProgress] = useState(0)
  const [monthRemainingTime, setMonthRemainingTime] = useState(0)
  const [bgProgress, setBgProgress] = useState("bg-danger")
  const [sumTextColor, setSumTextColor] = useState("text-danger")
  const sumActualMonthTotalRecordTimeRef = useRef(null)
  const monthRemainingTimeRef = useRef(null)

  useEffect(() => {
    const fetchSumActualMonthTotalRecordTime = async () => {
      try {
        const response = await getSumActualMonthTotalRecordTimeQuery()
        setSumActualMonthTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumActualMonthTotalRecordTime()

    const fetchMonthRecordProgress = async () => {
      try {
        const response = await getMonthRecordProgressQuery()
        setMonthRecordProgress(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMonthRecordProgress()

    const fetchMonthRemainingTime = async () => {
      try {
        const response = await getMonthRemainingTimeQuery()
        setMonthRemainingTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMonthRemainingTime()

    if (sumActualMonthTotalRecordTimeRef.current) {
      new Tooltip(sumActualMonthTotalRecordTimeRef.current)
    }
    if (monthRemainingTimeRef.current) {
      new Tooltip(monthRemainingTimeRef.current)
    }
  }, [])

  useEffect(() => {
    if (monthRecordProgress > 30 && monthRecordProgress < 50) {
      setBgProgress("bg-warning")
      setSumTextColor("text-warning")
    } else if (monthRecordProgress >= 50) {
      setBgProgress("bg-success")
      setSumTextColor("text-success")
    } else {
      setBgProgress("bg-danger")
      setSumTextColor("text-danger")
    }
  }, [monthRecordProgress])

  return (
    <div>
      <h3 className="text-center fs-3 fw-light text-primary">Month Progress</h3>
      <div className="d-flex justify-content-center mt-4 w-100">
        <div
          className="progress rounded-5 w-100"
          style={{ height: "25px" }}
          role="progressbar"
          aria-label="Example progress bar"
          aria-valuenow={monthRecordProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className={`progress-bar ${bgProgress} fs-5`}
            style={{ width: `${monthRecordProgress}%` }}
          >
            {monthRecordProgress}%
          </div>
        </div>
      </div>
      <div className="row w-100 mx-auto">
        <div className="col-6">
          <p
            className={`month-total-time text-center ${sumTextColor} fw-bold mt-4`}
            ref={sumActualMonthTotalRecordTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Current <strong>month's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {sumActualMonthTotalRecordTime.hours} :
            {sumActualMonthTotalRecordTime.minutes}
          </p>
        </div>
        <div className="col-6">
          <p
            className="month-remaining-time text-center text-primary mt-4"
            ref={monthRemainingTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Remaining <strong>month's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {monthRemainingTime.hours} : {Math.abs(monthRemainingTime.minutes)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MonthProgressInfo
