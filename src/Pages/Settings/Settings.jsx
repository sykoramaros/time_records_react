import React, { useState, useEffect } from "react"
import {
  getMonthTimeGoalByUserId,
  editMonthTimeGoal,
} from "../../Services/SettingsService/SettingsService"

const Settings = () => {
  const [userId, setUserId] = useState(null)
  const [monthTimeGoal, setMonthTimeGoal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonthTimeGoalByUserId(userId)
        console.log("fetchData:", response)
        setMonthTimeGoal(response.monthTimeGoal)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  })

  return (
    <div>
      <div className="container">
        <h1 className="text-center py-4">Settings</h1>
        <div className="mx-auto">
          <div className="input-group mb-3 d-flex justify-content-center">
            <span className="input-group-text">Monthly time goal</span>
            <input
              type="text"
              className="form-control text-center"
              placeholder="0 h"
              value={monthTimeGoal}
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              style={{ maxWidth: "7ch" }}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              id="button-addon1"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
