import React from "react"
import { useState, useEffect, useRef } from "react"
import { Modal } from "bootstrap"
import { createRecordQuery } from "../../Services/AddRecordModalService/AddRecordModalService"

const AddRecordModal = ({ selectedDate, show, onClose }) => {
  const [recordTime, setRecordTime] = useState("00:00")
  const [recordStudy, setRecordStudy] = useState(0)
  const [recordText, setRecordText] = useState("")
  const modalRef = useRef(null)
  const modalInstance = useRef(null)

  useEffect(() => {
    if (!modalRef.current) return

    // Inicializace modalu s dodatečnými options pro stabilitu
    modalInstance.current = new Modal(modalRef.current, {
      backdrop: true,
      keyboard: true,
    })

    if (show) {
      modalInstance.current.show()
    }
  }, [show, onClose])

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
      // Formátování času na HH:MM:SS
      const formattedTime = `${recordTime}:00`
      const formattedStudy = `${recordStudy}`
      const formattedText = `${recordText}`
      const recordData = {
        date: selectedDate.toISOString().split("T")[0], // Formát YYYY-MM-DD
        recordTime: formattedTime,
        recordStudy: formattedStudy, // Nastavte podle potřeby
        description: formattedText, // Nastavte podle potřeby
      }

      const response = await createRecordQuery(recordData)
      console.log("Record created:", response)
      alert("Record created successfully!")
      // Zavření modálu po úspěšném vytvoření
      window.location.reload()
      onClose()
    } catch (error) {
      console.error("Failed to create record:", error + error.response.data)
      // Zde můžete přidat logiku pro zobrazení chyby uživateli
    }
  }

  return (
    <div>
      <div
        ref={modalRef}
        className="modal fade"
        id="staticBackdrop"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="staticBackdropLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content w-50 w-md-25 mx-auto">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="calendarModal">
                {selectedDate.toDateString()}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
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
                <div>
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
                <div>
                  <label
                    htmlFor="message-text"
                    className="col-form-label d-block text-center"
                  >
                    Message:
                  </label>
                  <textarea
                    className="form-control w-75 mx-auto"
                    id="message-text"
                    value={recordText}
                    onChange={handleTextChange}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
                data-bs-target="#staticBackdrop"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddRecord}
                disabled={!recordTime}
              >
                Add time
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRecordModal
