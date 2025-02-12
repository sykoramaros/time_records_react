import React from "react"
import { useState, useEffect } from "react"
import {
  getSumActualMonthTotalRecordTimeQuery,
  getMonthRecordProgressQuery,
  getMonthRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"

const MonthProgressInfo = () => {
  const [sumActualMonthTotalRecordTime, setSumActualMonthTotalRecordTime] =
    useState(0)
  const [monthRecordProgress, setMonthRecordProgress] = useState(0)
  const [monthRemainingTime, setMonthRemainingTime] = useState(0)
  const [bgProgress, setBgProgress] = useState("bg-danger")

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
  }, [])

  useEffect(() => {
    if (monthRecordProgress > 30 && monthRecordProgress < 50) {
      setBgProgress("bg-warning")
    } else if (monthRecordProgress >= 50) {
      setBgProgress("bg-success")
    } else {
      setBgProgress("bg-danger")
    }
  }, [monthRecordProgress])

  return (
    <div>
      <h3 className="text-center fs-4 fw-light">Month Progress</h3>
      <div className="d-flex justify-content-center mt-4">
        <div
          className="progress rounded-5 w-75"
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
      <div className="row row-cols-3 d-flex justify-content-center mt-4 mx-auto">
        <div className="col">
          <p className="text-center text-success fs-5 mt-4">
            {sumActualMonthTotalRecordTime.hours} :{" "}
            {sumActualMonthTotalRecordTime.minutes}
          </p>
        </div>
        <div className="col">
          <p className="text-center text-danger fs-5 mt-4">
            {monthRemainingTime.hours} : {monthRemainingTime.minutes}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MonthProgressInfo
