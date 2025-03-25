import React from "react"
import { useState, useEffect, useRef } from "react"
import { getUserFromLocalStorage} from "../../Services/GoogleService/GoogleService";
import { getSumActualMonthRecorStudyQuery } from "../../Services/StudyStickerService/StudyStickerService"
import { Tooltip } from "bootstrap"
import "./Sticker.css"

const Sticker = () => {
  const [sumActualMonthYearRecordStudy, setSumActualMonthYearRecordStudy] =
    useState(null)
  const divRef = useRef(null)
  const userLocal = getUserFromLocalStorage()

  useEffect(() => {
    const fetchSumActualMonthRecordStudy = async () => {
      const response = await getSumActualMonthRecorStudyQuery(userLocal.id)
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
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      data-bs-html="true"
      data-bs-title="Number of <strong>studies</strong> during <strong>actual</strong> month"
      style={{ cursor: "pointer" }}
      className="sticker d-flex justify-content-center align-items-center"
    >
      <div>
        <p className="text-primary text-center fw-semibold mt-3">
          {sumActualMonthYearRecordStudy}
        </p>
      </div>
    </div>
  )
}

export default Sticker
