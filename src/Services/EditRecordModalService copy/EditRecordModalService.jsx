import axios from "axios"

// const baseURL = "http://localhost:5113/api/Records"
// const baseURL = "https://localhost:7081/api/Records"
const baseURL = "https://recordsapi.runasp.net/api/Records"

export const getRecordByDateQuery = async (id, date) => {
  const formattedDate = date.toISOString().split("T")[0] // například '2025-02-13'
  const response = await axios.get(
    `${baseURL}/GetRecordByDateQuery?userId=${id}&date=${formattedDate}`
  )
  return response.data
}

export const editRecordByDateQuery = async (id ,date, editedRecord) => {
  try {
    const response = await axios.put(
      `${baseURL}/EditRecordByDateQuery?userId=${id}&date=${date}`,
      editedRecord
    )
    return response.data
  } catch (error) {
    console.error("Error editing record:", error)
    throw error
  }
}

export const deleteRecordByDateQuery = async (id, date) => {
  try {
    const formattedDate = date.toISOString().split("T")[0] // Konvertuje datum do formátu YYYY-MM-DD

    const response = await axios.delete(
      `${baseURL}/DeleteRecordByDateQuery?userId=${id}&date=${formattedDate}`
    )
    return response.data
  } catch (error) {
    console.error("Error deleting record:", error)
    throw error
  }
}
