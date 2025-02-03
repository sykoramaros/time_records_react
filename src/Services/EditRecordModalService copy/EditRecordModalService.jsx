import axios from "axios"

// const baseURL = "http://localhost:5113/api/Records"
const baseURL = "https://localhost:7081/api/Records"

export const getRecordByDate = async (date) => {
  // Převod datumu na formát YYYY-MM-DD
  const formattedDate = date.toISOString().split("T")[0] // například '2025-02-13'
  // Vytvoření správné URL cesty
  const response = await axios.get(
    `${baseURL}/GetRecordByDate/${formattedDate}`
  )
  return response.data
}

export const editRecordByDate = async (recordData, selectedDate) => {
  try {
    // Vytvoříme správný formát dat pro API
    const formattedData = {
      date: selectedDate.toISOString().split("T")[0],
      recordTime: recordData.recordTime,
      recordStudy: parseInt(recordData.recordStudy), // Zajistíme, že study je číslo
      description: recordData.description,
    }
    // Log pro kontrolu dat před odesláním
    console.log("Odesílaná data:", formattedData)
    const response = await axios.put(
      `${baseURL}/EditRecordByDate/${formattedData.date}`,
      formattedData
    )
    return response.data
  } catch (error) {
    console.error("Error updating record:", error)
    // Přidáme více detailů o chybě
    if (error.response) {
      console.error("Response data:", error.response.data)
      console.error("Response status:", error.response.status)
    }
    throw error
  }
}
