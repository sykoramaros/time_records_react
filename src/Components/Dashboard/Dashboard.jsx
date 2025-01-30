import React from "react"
import { useState, useEffect } from "react"
import {
  getSumTotalRecordTime,
  getSumMinistryYearTotalRecordTime,
  getSumActualMonthTotalRecordTime,
  getYearRecordProgress,
} from "../../Services/DashboardService/DashboardService"

const Dashboard = () => {
  const [sumTotalRecordTime, setSumTotalRecordTime] = useState(0)
  const [sumMinistryYearTotalRecordTime, setSumMinistryYearTotalRecordTime] =
    useState(0)
  const [yearRecordProgress, setYearRecordProgress] = useState(0)
  const [sumActualMonthTotalRecordTime, setSumActualMonthTotalRecordTime] =
    useState(0)
  const [actualMonthProgress, setActualMonthProgress] = useState(0)

  useEffect(() => {
    const fetchSumTotalRecordTime = async () => {
      try {
        const response = await getSumTotalRecordTime()
        setSumTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumTotalRecordTime()

    const fetchSumMinistryYearTotalRecordTime = async () => {
      try {
        const response = await getSumMinistryYearTotalRecordTime()
        setSumMinistryYearTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumMinistryYearTotalRecordTime()

    const fetchYearRecordProgress = async () => {
      try {
        const response = await getYearRecordProgress()
        setYearRecordProgress(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchYearRecordProgress()

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

    const getActualMonthProgress = () => {
      const progress = (sumActualMonthTotalRecordTime.hours * 100) / 50
      setActualMonthProgress(progress)
    }
    getActualMonthProgress()
  }, [])

  return (
    <div>
      <p className="text-center">
        {sumTotalRecordTime.hours} : {sumTotalRecordTime.minutes}
      </p>
      <div className="container-sm bg-light p-5 rounded-4">
        <h2 className="text-center">Dashboard</h2>
        <div className="row row-cols-1 mt-5 gap-4">
          <h3 className="text-center fs-4 fw-light">Year Progress</h3>
          <div className="d-flex justify-content-center">
            <div
              className="progress w-75"
              role="progressbar"
              aria-label="Example progress bar"
              aria-valuenow={yearRecordProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                style={{ width: `${yearRecordProgress}%` }}
              >
                {yearRecordProgress}%
              </div>
            </div>
          </div>
          <p className="text-center fs-5">
            {sumMinistryYearTotalRecordTime.hours} :{" "}
            {sumMinistryYearTotalRecordTime.minutes}
          </p>
          <hr className="my-3 w-75 mx-auto" />
          <h3 className="text-center fs-4 fw-light">Month Progress</h3>
          <div className="d-flex justify-content-center">
            <div
              className="progress w-75"
              role="progressbar"
              aria-label="Example progress bar"
              aria-valuenow={actualMonthProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar"
                style={{ width: `${actualMonthProgress}%` }}
              >
                {actualMonthProgress.toFixed(0)}%
              </div>
            </div>
          </div>
          <p className="text-center fs-5">
            {sumActualMonthTotalRecordTime.hours} :{" "}
            {sumActualMonthTotalRecordTime.minutes}
          </p>
          <hr className="my-3 w-75 mx-auto" />
          <h3 className="text-center fs-4 fw-light">Week Progress</h3>
          <div className="d-flex justify-content-center">
            <div
              className="progress w-75"
              role="progressbar"
              aria-label="Example progress bar"
              aria-valuenow="85"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar" style={{ width: "85%" }}>
                85%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
