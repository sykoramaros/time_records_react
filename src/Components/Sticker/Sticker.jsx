import React from "react"
import { useState, useEffect, useRef } from "react"
import "./Sticker.css"
import { getSumActualMonthRecorStudyQuery } from "../../Services/StudyStickerService/StudyStickerService"
import { Tooltip } from "bootstrap"

const Sticker = () => {
  const [sumActualMonthYearRecordStudy, setSumActualMonthYearRecordStudy] =
    useState(null)
  const divRef = useRef(null)

  useEffect(() => {
    const fetchSumActualMonthRecordStudy = async () => {
      const response = await getSumActualMonthRecorStudyQuery()
      setSumActualMonthYearRecordStudy(response)
      console.log(response)
    }
    fetchSumActualMonthRecordStudy()

    if (divRef.current) {
      new Tooltip(divRef.current)
    }
  }, [])

  return (
    <div
      ref={divRef}
      className="position"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-html="true"
      data-bs-title="Number of <strong>studies</strong> during <strong>actual</strong> month"
      style={{ cursor: "pointer" }}
      required
    >
      <div className="rounded p-4 d-flex justify-content-center align-items-center">
        <span className="text-white text fw-bold">
          {sumActualMonthYearRecordStudy}
        </span>
      </div>
    </div>
  )
}

export default Sticker
