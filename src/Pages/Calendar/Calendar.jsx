import React from "react"
import ReactDatepickerCalendar from "../../Components/ReactDatepickerCalendar/ReactDatepickerCalendar"

const Calendar = () => {
  return (
    <div>
      <div className="container">
        <h1 className="text-center py-4">Calendar</h1>
        <div className="row justify-content-center">
          <ReactDatepickerCalendar />
        </div>
      </div>
    </div>
  )
}

export default Calendar
