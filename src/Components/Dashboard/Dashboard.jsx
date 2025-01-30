import React from "react"
import YearProgressInfo from "../YearProgressInfo/YearProgressInfo"
import MonthProgressInfo from "../MonthProgressInfo/MonthProgressInfo"
import WeekProgressInfo from "../WeekProgressInfo/WeekProgressInfo"

const Dashboard = () => {
  return (
    <div>
      <div className="container-sm bg-light p-5 rounded-4">
        <h2 className="text-center">Dashboard</h2>
        <div className="row row-cols-1 mt-5 gap-4">
          <YearProgressInfo />
          <MonthProgressInfo />
          <WeekProgressInfo />
        </div>
        <hr />
        <div className="row row-cols-1 row-cols-md-3 mt-5">
          <YearProgressInfo />
          <MonthProgressInfo />
          <WeekProgressInfo />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
