import React from "react"
import { useState, useEffect } from "react"
import ReactDatepicker from "react-datepicker"
import "./ReactDatePickerCalendar.css"
import { cs } from "date-fns/locale"
import { getAllRecords } from "../../Services/ReactDatepickerService/ReactDatepickerService"
import AddRecordModal from "../AddRecordModal/AddRecordModal"
import EditRecordModal from "../EditRecordModal/EditRecordModal"

const ReactDatepickerCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [highlightedDates, setHighlightedDates] = useState([])

  useEffect(() => {
    const fetchHighlightedDates = async () => {
      try {
        const records = await getAllRecords()
        const dates = records.map((record) => new Date(record.date))
        setHighlightedDates(dates)
      } catch (error) {
        console.error(error)
      }
    }
    fetchHighlightedDates()
  }, [])

  const handleDateChange = (date) => {
    const isHighlighted = highlightedDates.some(
      (highlightedDate) =>
        highlightedDate.toDateString() === date.toDateString()
    )
    setSelectedDate(date)
    if (!isHighlighted) {
      // AddRecordModal se spustí jen pokud datum není highlightedDates
      setShowModal(true)
      console.log("AddRecordModal set to:", true)
    } else {
      // EditRecordModal se spustí jen pokud datum je highlightedDates
      setShowModal(true)
      console.log("EditRecordModal set to:", true)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
    window.location.reload()
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
        highlightDates={highlightedDates}
      />

      {/* Zobrazí AddRecordModal, pokud datum není zvýrazněné */}
      {!highlightedDates.some(
        (highlightedDate) =>
          highlightedDate.toDateString() === selectedDate.toDateString()
      ) &&
        showModal && (
          <AddRecordModal
            selectedDate={selectedDate}
            show={showModal}
            onClose={handleCloseModal}
          />
        )}

      {/* Zobrazí EditRecordModal, pokud datum je zvýrazněné */}
      {highlightedDates.some(
        (highlightedDate) =>
          highlightedDate.toDateString() === selectedDate.toDateString()
      ) &&
        showModal && (
          <EditRecordModal
            selectedDate={selectedDate}
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        )}

      {/* <AddRecordModal
        selectedDate={selectedDate}
        show={showModal}
        onClose={handleCloseModal}
      />

      <EditRecordModal
        selectedDate={selectedDate}
        show={showModal}
        onClose={handleCloseModal}
      /> */}
    </div>
  )
}

export default ReactDatepickerCalendar
