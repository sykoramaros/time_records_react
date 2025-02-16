import React from "react"
import { useState, useEffect } from "react"
import YearProgressInfo from "../YearProgressInfo/YearProgressInfo"
import MonthProgressInfo from "../MonthProgressInfo/MonthProgressInfo"
import WeekProgressInfo from "../WeekProgressInfo/WeekProgressInfo"
import Sticker from "../Sticker/Sticker"
import { getMonthTimeGoalByUserId } from "../../Services/SettingsService/SettingsService"

const Dashboard = () => {
  const [monthTimeGoal, setMonthTimeGoal] = useState(null)
  const [titleZero, setTitleZero] = useState("text-danger fw-bold")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonthTimeGoalByUserId()
        console.log("Settings fetchData:", response.monthTimeGoal)
        setMonthTimeGoal(response.monthTimeGoal)
        console.log("fetchData", response.monthTimeGoal + " " + response.userId)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
    if (monthTimeGoal > 0) {
      setTitleZero("d-none")
    }
  }, [monthTimeGoal])

  return (
    <div className="d-flex justify-content-center">
      <div
        className="w-75 bg-light p-5 rounded-4"
        style={{ position: "absolute" }}
      >
        <Sticker />
        <h2 className="text-center">Dashboard</h2>
        <h3 className={`text-center ${titleZero}`}>
          Your month time goal is zero or not set!
        </h3>
        <div className="row row-cols-1 mt-5 gap-4">
          <WeekProgressInfo />
          <hr className="mx-auto w-75" />
          <MonthProgressInfo />
          <hr className="mx-auto w-75" />
          <YearProgressInfo />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
