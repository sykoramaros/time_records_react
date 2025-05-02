import React from "react"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"

const ChosenMonthStatus = ({ result }) => {
  return (
    <div>
      <h2
        className="display-4 text-center fw-normal d-inline-block bg-primary text-info py-3 px-4 rounded-5"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-html="true"
        data-bs-title="<strong>Time</strong> records during <strong>chosen</strong> month"
        style={{ cursor: "pointer" }}
      >
        {result?.hours.toLocaleString("en-US", { minimumIntegerDigits: 2 })} :{" "}
        {result?.minutes.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
      </h2>
    </div>
  )
}
export default ChosenMonthStatus
