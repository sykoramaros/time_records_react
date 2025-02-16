import React, { useState, useEffect } from "react"
import {
  getMonthTimeGoalByUserId,
  editMonthTimeGoal,
} from "../../Services/SettingsService/SettingsService"

const Settings = () => {
  const [editUserId, setEditUserId] = useState(null)
  const [editedMonthTimeGoal, setEditedMonthTimeGoal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMonthTimeGoalByUserId()
        console.log("Settings fetchData:", response.monthTimeGoal)
        setEditedMonthTimeGoal(response.monthTimeGoal)
        setEditUserId(response.userId)
        console.log("fetchData", response.monthTimeGoal + " " + response.userId)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // const handleEditMonthTimeGoal = async () => {
  //   try {
  //     const editedData = {
  //       monthTimeGoal: editedMonthTimeGoal,
  //     }
  //     console.log("Sending data:", editedData)
  //     const sendData = await editMonthTimeGoal(editUserId, editedData)
  //     alert("Month time goal edited successfully")
  //     console.log("Month time goal edited:", sendData)
  //     setEditedMonthTimeGoal(editedData.monthTimeGoal)
  //   } catch (error) {
  //     console.error("Error editing month time goal", error)
  //     alert("Error editing month time goal. Please try again")
  //     window.location.reload()
  //   }
  // }

  const handleEditMonthTimeGoal = async () => {
    try {
      console.log("Input value:", editedMonthTimeGoal)
      console.log("Input value type:", typeof editedMonthTimeGoal)

      if (!editedMonthTimeGoal || isNaN(Number(editedMonthTimeGoal))) {
        alert("Please enter a valid number for month time goal")
        return
      }

      const sendData = await editMonthTimeGoal(editedMonthTimeGoal)
      alert("Month time goal edited successfully")
      setEditedMonthTimeGoal(editedMonthTimeGoal)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message
      alert(`Error editing month time goal: ${errorMessage}`)
      console.error("Full error:", error)
    }
  }

  const handleMonthTimeGoalChange = (e) => {
    setEditedMonthTimeGoal(e.target.value)
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center py-4">Settings</h1>
        <div className="mx-auto">
          <div className="input-group mb-3 d-flex justify-content-center">
            <span className="input-group-text">Monthly time goal</span>
            <input
              type="number"
              className="form-control text-center"
              placeholder="1"
              value={editedMonthTimeGoal}
              min={1}
              onChange={handleMonthTimeGoalChange}
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              style={{ maxWidth: "7ch" }}
            />
            <button
              className="btn btn-outline-success"
              type="button"
              id="button-addon1"
              onClick={handleEditMonthTimeGoal}
              disabled={!editedMonthTimeGoal || editedMonthTimeGoal < 0}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
