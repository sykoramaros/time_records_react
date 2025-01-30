import React from "react"
import { useState, useEffect } from "react"
import {
  getSumMinistryYearTotalRecordTime,
  getYearRecordProgress,
  getYearRemainingTime,
} from "../../Services/DashboardService/DashboardService"

const YearProgressInfo = () => {
  const [sumMinistryYearTotalRecordTime, setSumMinistryYearTotalRecordTime] =
    useState(0)
  const [yearRecordProgress, setYearRecordProgress] = useState(0)
  const [yearRemainingTime, setYearRemainingTime] = useState(0)

  useEffect(() => {
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

    const fetchYearRemainingTime = async () => {
      try {
        const response = await getYearRemainingTime()
        setYearRemainingTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchYearRemainingTime()
  }, [])

  return (
    <div>
      <h3 className="text-center fs-4 fw-light">Year Progress</h3>
      <div className="d-flex justify-content-center mt-4">
        <div
          className="progress rounded-5 w-75"
          style={{ height: "25px" }}
          role="progressbar"
          aria-label="Example progress bar"
          aria-valuenow={yearRecordProgress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar bg-success fs-5"
            style={{ width: `${yearRecordProgress}%` }}
          >
            {yearRecordProgress}%
          </div>
        </div>
      </div>
      <div className="row row-cols-3 d-flex justify-content-center mt-4 mx-auto">
        <div className="col">
          <p className="text-center fs-5 text-success">
            {sumMinistryYearTotalRecordTime.hours} :{" "}
            {sumMinistryYearTotalRecordTime.minutes}
          </p>
        </div>
        <div className="col">
          <p className="text-center fs-5 text-danger">
            {yearRemainingTime.hours} : {yearRemainingTime.minutes}
          </p>
        </div>
      </div>
    </div>
  )
}

export default YearProgressInfo
