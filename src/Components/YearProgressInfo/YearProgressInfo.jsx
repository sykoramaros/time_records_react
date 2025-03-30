import React from "react"
import { useState, useEffect, useRef } from "react"
import { Trans } from "@lingui/react"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService";
import {
  getSumActualMinistryYearTotalRecordTimeQuery,
  getYearRecordProgressQuery,
  getYearRemainingTimeQuery,
} from "../../Services/DashboardService/DashboardService"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"
import "./YearProgressInfo.css"

const YearProgressInfo = () => {
  const [sumMinistryYearTotalRecordTime, setSumMinistryYearTotalRecordTime] =
    useState(0)
  const [yearRecordProgress, setYearRecordProgress] = useState(0)
  const [yearRemainingTime, setYearRemainingTime] = useState({})
  const [formattedRemainingTime, setFormattedRemainingTime] = useState({})
  const [bgProgress, setBgProgress] = useState("bg-danger")
  const [sumTextColor, setSumTextColor] = useState("text-danger")
  const sumMinistryYearTotalRecordTimeRef = useRef(null)
  const yearRemainingTimeRef = useRef(null)
  const userLocal = getUserFromLocalStorage()
  const [numberSign, setNumberSign] = useState("")


  useEffect(() => {
    const fetchSumMinistryYearTotalRecordTime = async () => {
      try {
        const response = await getSumActualMinistryYearTotalRecordTimeQuery(userLocal.id)
        setSumMinistryYearTotalRecordTime(response)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSumMinistryYearTotalRecordTime()

    const fetchYearRecordProgress = async () => {
      try {
        const response = await getYearRecordProgressQuery(userLocal.id)
        setYearRecordProgress(response)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchYearRecordProgress()

    const fetchYearRemainingTime = async () => {
      try {
        const response = await getYearRemainingTimeQuery(userLocal.id)
        setYearRemainingTime(response)
        // console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
    fetchYearRemainingTime()

    if (sumMinistryYearTotalRecordTimeRef.current) {
      new Tooltip(sumMinistryYearTotalRecordTimeRef.current)
    }
    if (yearRemainingTimeRef.current) {
      new Tooltip(yearRemainingTimeRef.current)
    }
  }, [userLocal.id])

  useEffect(() => {
    const formatted = {
      hours: Math.abs(yearRemainingTime.hours),
      minutes: Math.abs(yearRemainingTime.minutes),
    }
    if (yearRemainingTime?.hours + yearRemainingTime?.minutes > 0) {
      setNumberSign("-")
    } else if (yearRemainingTime?.hours + yearRemainingTime?.minutes < 0) {
      setNumberSign("+")
    } else {
      setNumberSign("")
    }
    setFormattedRemainingTime(formatted)
  }, [numberSign, yearRemainingTime]);

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
      <h3 className="text-center fs-3 fw-light text-primary"><Trans id="yearProgressInfo.actual-year-progress">Actual Year Progress</Trans></h3>
      <div className="d-flex justify-content-center mt-4 w-100">
        <div
          className="progress rounded-5 w-100"
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
      <div className="row w-100 mx-auto">
        <div className="col-6">
          <p
            className={`year-total-time text-center ${sumTextColor} fw-bold mt-4`}
            ref={sumMinistryYearTotalRecordTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Current <strong>year's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {sumMinistryYearTotalRecordTime.hours?.toLocaleString("en-US", {minimumIntegerDigits: 2})} :{" "}
            {sumMinistryYearTotalRecordTime.minutes?.toLocaleString("en-US", {minimumIntegerDigits: 2})}
          </p>
        </div>
        <div className="col-6">
          <p
            className="year-remaining-time text-center text-primary mt-4"
            ref={yearRemainingTimeRef}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-html="true"
            data-bs-title="Current <strong>year's</strong> time"
            style={{ cursor: "pointer" }}
          >
            {numberSign} {formattedRemainingTime.hours?.toLocaleString("en-US", {minimumIntegerDigits: 2})} : {formattedRemainingTime.minutes?.toLocaleString("en-US", {minimumIntegerDigits: 2})}
          </p>
        </div>
      </div>
    </div>
  )
}

export default YearProgressInfo
