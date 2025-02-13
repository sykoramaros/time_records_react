import React from "react"
import { useState, useEffect, useRef } from "react"
import {
  getSumActualMinistryYearTotalRecordTimeQuery,
  getYearRecordProgressQuery,
  getYearRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"

const YearProgressInfo = () => {
  const [sumMinistryYearTotalRecordTime, setSumMinistryYearTotalRecordTime] =
    useState(0)
  const [yearRecordProgress, setYearRecordProgress] = useState(0)
  const [yearRemainingTime, setYearRemainingTime] = useState(0)
  const [bgProgress, setBgProgress] = useState("bg-danger")
  const [sumTextColor, setSumTextColor] = useState("text-danger")
  const sumMinistryYearTotalRecordTimeRef = useRef(null)

  useEffect(() => {
    const fetchSumMinistryYearTotalRecordTime = async () => {
      try {
        const response = await getSumActualMinistryYearTotalRecordTimeQuery()
        setSumMinistryYearTotalRecordTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumMinistryYearTotalRecordTime()

    const fetchYearRecordProgress = async () => {
      try {
        const response = await getYearRecordProgressQuery()
        setYearRecordProgress(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchYearRecordProgress()

    const fetchYearRemainingTime = async () => {
      try {
        const response = await getYearRemainingTimeQuery()
        setYearRemainingTime(response)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchYearRemainingTime()

    if (sumMinistryYearTotalRecordTimeRef.current) {
      new Tooltip(sumMinistryYearTotalRecordTimeRef.current)
    }
  }, [])

  useEffect(() => {
    if (yearRecordProgress > 30 && yearRecordProgress < 50) {
      setBgProgress("bg-warning")
      setSumTextColor("text-warning")
    } else if (yearRecordProgress >= 50) {
      setBgProgress("bg-success")
      setSumTextColor("text-success")
    } else {
      setBgProgress("bg-danger")
      setSumTextColor("text-danger")
    }
  }, [yearRecordProgress])

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
            className={`progress-bar ${bgProgress} fs-5`}
            style={{ width: `${yearRecordProgress}%` }}
          >
            {yearRecordProgress}%
          </div>
        </div>
      </div>
      <div className="row row-cols-3 d-flex justify-content-center mt-4 mx-auto">
        <div className="col">
          <p
            className={`text-center ${sumTextColor} fs-5 fw-bold mt-4`}
            ref={sumMinistryYearTotalRecordTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Current <strong>year's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {sumMinistryYearTotalRecordTime.hours} :{" "}
            {sumMinistryYearTotalRecordTime.minutes}
          </p>
        </div>
        <div className="col">
          <p className={`text-center ${sumTextColor} fs-5 mt-4`}>
            {yearRemainingTime.hours} : {yearRemainingTime.minutes}
          </p>
        </div>
      </div>
    </div>
  )
}

export default YearProgressInfo
