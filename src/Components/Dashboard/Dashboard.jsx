import React from "react"
import { useState, useEffect } from "react"
import "./Dashboard.css"
import { Trans } from "@lingui/react";
import YearProgressInfo from "../YearProgressInfo/YearProgressInfo"
import MonthProgressInfo from "../MonthProgressInfo/MonthProgressInfo"
import WeekProgressInfo from "../WeekProgressInfo/WeekProgressInfo"
import Sticker from "../Sticker/Sticker"
import { getUserByIdQuery } from "../../Services/SettingsService/SettingsService"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService";

const Dashboard = () => {
  const [monthTimeGoal, setMonthTimeGoal] = useState(null)
  const [titleZero, setTitleZero] = useState("d-none")

  const userLocal = getUserFromLocalStorage()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByIdQuery(userLocal.id)
        // console.log("Settings fetchData:", response.monthTimeGoal)
        setMonthTimeGoal(response.monthTimeGoal)
        // console.log("fetchData", response.monthTimeGoal + " " + response.userId)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (monthTimeGoal === 0) {
      setTitleZero("text-danger fw-bold")
    }
  }, [monthTimeGoal])

  return (
    <div className="w-100 d-flex justify-content-center ">
      <div
        className="dashboard-container p-5 rounded-4 shadow position-relative"
      >
        <div className="sticker-container position-absolute">
          <Sticker />
        </div>
        <h2 className="text-center text-primary text-uppercase"><Trans id="dashboard.h2">Dashboard</Trans></h2>
        <h3 className={`text-center ${titleZero}`}>
          <Trans id="dashboard.h3">Your month time goal is zero or not set!</Trans>
        </h3>
        <div className="row row-cols-1 mt-5 gap-4 d-flex justify-content-center">
          <div className="week-progress-container">
            <WeekProgressInfo />
          </div>
          <hr className="mx-auto w-75 border-primary" />
          <div className="month-progress-container">
            <MonthProgressInfo />
          </div>
          <hr className="mx-auto w-75 border-primary" />
          <div className="year-progress-container">
            <YearProgressInfo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
