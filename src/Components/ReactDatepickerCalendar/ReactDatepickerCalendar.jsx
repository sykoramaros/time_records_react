import React from "react"
import { useState, useEffect, useRef } from "react"
import ReactDatepicker from "react-datepicker"
import "./ReactDatePickerCalendar.css"
import {i18n} from "@lingui/core";
import { enAU, cs } from "date-fns/locale"
import { getUserFromLocalStorage } from "../../Services/GoogleService/GoogleService";
import {
  getAllRecordsQuery,
  getRecordByDate,
} from "../../Services/ReactDatepickerService/ReactDatepickerService"
import AddRecordModal from "../AddRecordModal/AddRecordModal"
import EditRecordModal from "../EditRecordModal/EditRecordModal"
import { Tooltip } from "bootstrap/dist/js/bootstrap.bundle.min"

const ReactDatepickerCalendar = ({onCalendarChange}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [highlightedDates, setHighlightedDates] = useState([])
  const [records, setRecords] = useState([])
  const [currentRecord, setCurrentRecord] = useState(null)
  const [error, setError] = useState(null)
  const tooltipInstancesRef = useRef([])
  const [currentLocale, setCurrentLocale] = useState(cs)

  const userLocal = getUserFromLocalStorage()

  const locales = {
    en: enAU,
    cs: cs,
  }

  useEffect(() => {
    if (i18n.locale && locales[i18n.locale]) {
    setCurrentLocale(locales[i18n.locale] && locales[i18n.locale])
    }
  }, [i18n.locale])

  useEffect(() => {
    const fetchHighlightedDates = async () => {
      try {
        const records = await getAllRecordsQuery(userLocal.id)
        setRecords(records)
        const dates = records.map((record) => new Date(record.date))
        setHighlightedDates(dates)
        setError(null)
      } catch (error) {
        console.error("Error fetching highlighted dates:", error)
        setError(error.message)
        setHighlightedDates([])
      }
    }
    fetchHighlightedDates()
  }, [userLocal.id])

  // Inicializace tooltipů po načtení dat
  useEffect(() => {
    if (highlightedDates.length > 0) {
      // Nejprve zrušíme předchozí instance tooltipů
      tooltipInstancesRef.current.forEach((tooltip) => {
        if (tooltip && tooltip.dispose) {
          tooltip.dispose()
        }
      })
      tooltipInstancesRef.current = []

      // Počkáme na dokončení vykreslení
      setTimeout(() => {
        // Inicializujeme nové tooltipy
        const tooltipElements = document.querySelectorAll(
          '[data-bs-toggle="tooltip"]'
        )
        tooltipElements.forEach((element) => {
          const tooltipInstance = new Tooltip(element)
          tooltipInstancesRef.current.push(tooltipInstance)
        })
      }, 200)
    }

    // Cleanup při unmount
    return () => {
      tooltipInstancesRef.current.forEach((tooltip) => {
        if (tooltip && tooltip.dispose) {
          tooltip.dispose()
        }
      })
    }
  }, [highlightedDates])

  const handleDateChange = async (date) => {
    const isHighlighted = highlightedDates.some(
      (highlightedDate) =>
        highlightedDate.toDateString() === date.toDateString()
    )
    setSelectedDate(date)

    if (isHighlighted) {
      try {
        // Použití getRecordByDate pro získání záznamu pro vybrané datum
        const record = await getRecordByDate(date)
        setCurrentRecord(record)
      } catch (error) {
        console.error("Error fetching record:", error)
        setCurrentRecord(null)
      }
    } else {
      setCurrentRecord(null)
    }

    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    window.location.reload()
    // console.log("showModal set to:", false)
  }

  // Asynchronní funkce pro získání záznamu pro konkrétní datum
  const fetchRecordForDate = async (date) => {
    try {
      return await getRecordByDate(date)
    } catch (error) {
      console.error(`Error fetching record for date ${date}:`, error)
      return null
    }
  }

  // Vytvoření obsahu tooltipu pro konkrétní datum
  const getTooltipContent = (date) => {
    const record = records.find(
      (record) => new Date(record.date).toDateString() === date.toDateString()
    )

    if (!record) return ""

    const formattedTime = record.recordTime
      ? record.recordTime.substring(0, 5)
      : ""

    // Upravte podle skutečné struktury vašich záznamů
    let tooltipContent = `<span class="fs-7">Recorded time:</span><br/><strong class="text-warning fs-3">${formattedTime}</strong>`
    if (record.recordStudy) {
      tooltipContent += `<hr class="my-0 mx-auto w-75"/><span class="fs-7">Study:</span><br/><strong class="text-success fs-3">${record.recordStudy}</strong>`
    }
    if (record.description) {
      tooltipContent += `<hr class="m-0 mx-auto w-75"/><span class="fs-7">Description:</span><br/><strong class="text-info fs-6">"${record.description}"</strong>`
    }

    return tooltipContent
  }

  // Vlastní renderer obsahu dne
  const renderDayContents = (day, date) => {
    const isHighlighted = highlightedDates.some(
      (highlightedDate) =>
        highlightedDate.toDateString() === date.toDateString()
    )

    if (isHighlighted) {
      const tooltipContent = getTooltipContent(date)

      return (
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-html="true"
          data-bs-title={tooltipContent}
          className="highlighted-date"
        >
          {day}
        </span>
      )
    }
    return day
  }

  return (
    <div className="datepicker-wrapper">
      <ReactDatepicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={"dd.MM.yyyy"}
        calendarStartDay={1}
        minDate={new Date(2024, 1, 1)}
        maxDate={new Date(2030, 12, 31)}
        locale={currentLocale}
        showYearDropdown
        dropdownMode=""
        fixedHeight
        inline
        className="custom-datepicker"
        highlightDates={highlightedDates}
        renderDayContents={renderDayContents}
        onMonthChange={onCalendarChange}
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
            record={currentRecord}
            show={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
    </div>
  )
}

export default ReactDatepickerCalendar
