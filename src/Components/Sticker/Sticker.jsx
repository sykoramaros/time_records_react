import React from "react"
import { useEffect, useRef } from "react"
import { Tooltip } from "bootstrap"
import "./Sticker.css"

const Sticker = ({ chosenMonthRecord }) => {
  const divRef = useRef(null)

  useEffect(() => {
    // Inicializace tooltip při mount
    const tooltipInstance = new Tooltip(divRef.current)

    // Cleanup při unmount
    return () => {
      tooltipInstance.dispose()
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
        <p className="text-white text-center fw-semibold mt-3">
          {chosenMonthRecord?.recordStudy}
        </p>
      </div>
    </div>
  )
}

export default Sticker
