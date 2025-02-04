import React from "react"
import { useState, useEffect, useRef } from "react"
import { Modal } from "bootstrap"
import {
  getRecordByDate,
  editRecordByDate,
  deleteRecordByDate,
} from "../../Services/EditRecordModalService copy/EditRecordModalService"

const EditRecordModal = ({ selectedDate, show, onClose }) => {
  const [recordTime, setRecordTime] = useState("00:00")
  const [recordStudy, setRecordStudy] = useState(0)
  const [recordText, setRecordText] = useState("")
  const [isModalReady, setIsModalReady] = useState(false)
  const modalRef = useRef(null)
  const modalInstance = useRef(null)

  // První useEffect pro načtení dat
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate) {
        try {
          const recordData = await getRecordByDate(selectedDate)
          if (recordData) {
            setRecordTime(recordData.recordTime || "00:00")
            setRecordStudy(recordData.recordStudy || 0)
            setRecordText(recordData.description || "")
          }
        } catch (error) {
          console.error("Error fetching record data:", error)
        }
      }
    }
    fetchData()
  }, [selectedDate])

  // Druhý useEffect pro inicializaci modalu
  useEffect(() => {
    if (!modalRef.current) return

    // Počkáme jeden frame, aby se DOM stihlo vyrenderovat
    requestAnimationFrame(() => {
      if (!modalInstance.current) {
        modalInstance.current = new Modal(modalRef.current, {
          backdrop: "static",
          keyboard: false,
        })
        setIsModalReady(true)
      }
    })

    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose()
        modalInstance.current = null
      }
      setIsModalReady(false)
    }
  }, [])

  // Třetí useEffect pro zobrazení/skrytí modalu
  useEffect(() => {
    if (!isModalReady || !modalInstance.current) return

    if (show) {
      try {
        modalInstance.current.show()
      } catch (error) {
        console.error("Error showing modal:", error)
      }
    } else {
      try {
        modalInstance.current.hide()
      } catch (error) {
        console.error("Error hiding modal:", error)
      }
    }
  }, [show, isModalReady])

  const handleTimeChange = (e) => {
    setRecordTime(e.target.value)
  }

  const handleStudyChange = (e) => {
    setRecordStudy(e.target.value)
  }

  const handleTextChange = (e) => {
    setRecordText(e.target.value)
  }

  const handleAddRecord = async () => {
    try {
      const recordData = {
        date: selectedDate.toISOString().split("T")[0],
        recordTime: recordTime,
        recordStudy: recordStudy,
        description: recordText,
      }
      const response = await editRecordByDate(recordData, selectedDate)
      console.log("Record edited:", response)
      alert("Record edited successfully!")
      handleCloseModal()
      window.location.reload()
    } catch (error) {
      console.error("Error editing record:", error)
      alert("Error editing record. Please try again.")
    }
  }

  const handleDeleteRecord = async () => {
    try {
      const response = await deleteRecordByDate(selectedDate)
      console.log("Record deleted:", response)
      alert("Record deleted successfully!")
      handleCloseModal()
      window.location.reload()
    } catch (error) {
      console.error("Error deleting record:", error)
      alert("Error deleting record. Please try again.")
    }
  }

  const handleCloseModal = () => {
    if (modalInstance.current) {
      modalInstance.current.hide()
      window.location.reload()
    }
    setRecordTime("00:00")
    setRecordStudy(0)
    setRecordText("")
    if (onClose) onClose()
  }

  return (
    <div
      ref={modalRef}
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="editRecordModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content w-50 w-md-25 mx-auto">
          <div className="modal-header">
            <h5 className="modal-title fs-5" id="editRecordModalLabel">
              {selectedDate?.toDateString()}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label
                  htmlFor="time-picker"
                  className="col-form-label d-block text-center"
                >
                  Recorded time
                </label>
                <input
                  type="time"
                  className="form-control text-center w-75 mx-auto"
                  id="time-picker"
                  value={recordTime}
                  onChange={handleTimeChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="study"
                  className="col-form-label d-block text-center"
                >
                  Study
                </label>
                <input
                  type="number"
                  min={0}
                  className="form-control text-center w-75 mx-auto"
                  id="study"
                  value={recordStudy}
                  onChange={handleStudyChange}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="message-text"
                  className="col-form-label d-block text-center"
                >
                  Message:
                </label>
                <textarea
                  className="form-control text-center w-75 mx-auto"
                  id="message-text"
                  value={recordText}
                  onChange={handleTextChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div className="row g-2 d-flex">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary d-block mx-auto"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-success d-block mx-auto"
                  onClick={handleAddRecord}
                  // disabled={!recordTime || !recordStudy || !recordText}
                >
                  Save
                </button>
              </div>
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-danger d-block mx-auto"
                  onClick={handleDeleteRecord}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditRecordModal
