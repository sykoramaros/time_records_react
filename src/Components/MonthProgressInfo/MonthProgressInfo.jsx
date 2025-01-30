import React from "react"
import { useState, useEffect } from "react"
import {
  getSumActualMonthTotalRecordTime,
  getMonthRecordProgress,
  getMonthRemainingTime,
} from "../../Services/DashboardService/DashboardService"

const MonthProgressInfo = () => {
  const [sumActualMonthTotalRecordTime, setSumActualMonthTotalRecordTime] =
    useState(0)
  const [monthRecordProgress, setMonthRecordProgress] = useState(0)
  const [monthRemainingTime, setMonthRemainingTime] = useState(0)

  useEffect(() => {
    const fetchSumActualMonthTotalRecordTime = async () => {
      try {
        const response = await getSumActualMonthTotalRecordTime()
        setSumActualMonthTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumActualMonthTotalRecordTime()

    const fetchMonthRecordProgress = async () => {
      try {
        const response = await getMonthRecordProgress()
        setMonthRecordProgress(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMonthRecordProgress()

    const fetchMonthRemainingTime = async () => {
      try {
        const response = await getMonthRemainingTime()
        setMonthRemainingTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchMonthRemainingTime()
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
          aria-valuenow={monthRecordProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar bg-success fs-5"
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
