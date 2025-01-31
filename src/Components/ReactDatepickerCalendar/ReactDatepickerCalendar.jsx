import React from "react"
import { useState } from "react"
import ReactDatepicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
import "./ReactDatePickerCalendar.css"
import { cs } from "date-fns/locale"

const ReactDatepickerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="datepicker-wrapper">
      <ReactDatepicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat={"dd.MM.yyyy"}
        calendarStartDay={1}
        onBlur={() => setSelectedDate(new Date())}
        locale={cs}
        showYearDropdown
        dropdownMode=""
        fixedHeight
        inline
        className="custom-datepicker"
      />
    </div>
  )
}

export default ReactDatepickerCalendar
