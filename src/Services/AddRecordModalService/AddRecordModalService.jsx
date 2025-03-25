import axios from "axios"

// const baseURL = "http://localhost:5113/api/Records"
// const baseURL = "https://localhost:7081/api/Records"
const baseURL = "https://recordsapi.runasp.net/api/Records"

export const createRecordQuery = async (id, record) => {
  try {
    const response = await axios.post(
      `${baseURL}/CreateRecordQuery?userId=${id}`,
      record
    )
    return response.data
  } catch (error) {
    console.error("Error creating record:", error)
    throw error
  }
}
