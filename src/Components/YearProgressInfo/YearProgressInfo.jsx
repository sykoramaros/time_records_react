import React from "react"
import { useState, useEffect } from "react"
import {
  getSumMinistryYearTotalRecordTime,
  getYearRecordProgress,
} from "../../Services/DashboardService/DashboardService"

const YearProgressInfo = () => {
  const [sumMinistryYearTotalRecordTime, setSumMinistryYearTotalRecordTime] =
    useState(0)
  const [yearRecordProgress, setYearRecordProgress] = useState(0)

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
            className="progress-bar fs-5"
            style={{ width: `${yearRecordProgress}%` }}
          >
            {yearRecordProgress}%
          </div>
        </div>
      </div>
      <p className="text-center fs-5 mt-4">
        {sumMinistryYearTotalRecordTime.hours} :{" "}
        {sumMinistryYearTotalRecordTime.minutes}
      </p>
    </div>
  )
}

export default YearProgressInfo
