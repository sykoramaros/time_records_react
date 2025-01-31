import React from "react"
import { useState } from "react"
import ReactDatepicker from "react-datepicker"
import "./ReactDatePickerCalendar.css"
import { cs } from "date-fns/locale"
import AddRecordModal from "../AddRecordModal/AddRecordModal"

const ReactDatepickerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setShowModal(true)
    console.log("showModal set to:", true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    console.log("showModal set to:", false)
  }

  return (
    <div className="datepicker-wrapper">
      <ReactDatepicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={"dd.MM.yyyy"}
        calendarStartDay={1}
        // onBlur={() => setSelectedDate(new Date())}
        locale={cs}
        showYearDropdown
        dropdownMode=""
        fixedHeight
        inline
        className="custom-datepicker"
      />

      <AddRecordModal
        selectedDate={selectedDate}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default ReactDatepickerCalendar
