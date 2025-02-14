import React from "react"
import YearProgressInfo from "../YearProgressInfo/YearProgressInfo"
import MonthProgressInfo from "../MonthProgressInfo/MonthProgressInfo"
import WeekProgressInfo from "../WeekProgressInfo/WeekProgressInfo"
import Sticker from "../Sticker/Sticker"

const Dashboard = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="w-75 bg-light p-5 rounded-4"
        style={{ position: "absolute" }}
      >
        <Sticker />
        <h2 className="text-center">Dashboard</h2>
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
