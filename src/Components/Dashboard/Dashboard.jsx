import React from "react"
import { useState, useEffect } from "react"
import "./Dashboard.css"
import YearProgressInfo from "../YearProgressInfo/YearProgressInfo"
import MonthProgressInfo from "../MonthProgressInfo/MonthProgressInfo"
import WeekProgressInfo from "../WeekProgressInfo/WeekProgressInfo"
import Sticker from "../Sticker/Sticker"
import { getUserByIdQuery } from "../../Services/SettingsService/SettingsService"

const Dashboard = () => {
  const [monthTimeGoal, setMonthTimeGoal] = useState(null)
  const [titleZero, setTitleZero] = useState("d-none")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserByIdQuery()
        console.log("Settings fetchData:", response.monthTimeGoal)
        setMonthTimeGoal(response.monthTimeGoal)
        console.log("fetchData", response.monthTimeGoal + " " + response.userId)
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
    <div className="d-flex justify-content-center">
      <div
        className="dashboard-container w-75 p-5 rounded-4 shadow"
      >
        <Sticker />
        <h2 className="text-center text-primary text-uppercase">Dashboard</h2>
        <h3 className={`text-center ${titleZero}`}>
          Your month time goal is zero or not set!
        </h3>
        <div className="row row-cols-1 mt-5 gap-4">
          <WeekProgressInfo />
          <hr className="mx-auto w-75 border-primary" />
          <MonthProgressInfo />
          <hr className="mx-auto w-75 border-primary" />
          <YearProgressInfo />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
