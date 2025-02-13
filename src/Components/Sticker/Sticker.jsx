import React from "react"
import { useState, useEffect } from "react"
import "./Sticker.css"
import { getSumActualMonthRecorStudyQuery } from "../../Services/StudyStickerService/StudyStickerService"

const Sticker = () => {
  const [sumActualMonthYearRecordStudy, setSumActualMonthYearRecordStudy] =
    useState(null)

  useEffect(() => {
    const fetchSumActualMonthRecordStudy = async () => {
      const response = await getSumActualMonthRecorStudyQuery()
      setSumActualMonthYearRecordStudy(response)
      console.log(response)
    }
    fetchSumActualMonthRecordStudy()
  })

  return (
    <div className="position">
      <div className="rounded p-4 d-flex justify-content-center align-items-center">
        <span className="text-white text fw-bold">
          {sumActualMonthYearRecordStudy}
        </span>
      </div>
    </div>
  )
}

export default Sticker
