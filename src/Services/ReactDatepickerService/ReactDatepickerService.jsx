import axios from "axios"

// const baseURL = "http://localhost:5113/api/Records"
// const baseURL = "https://localhost:7081/api/Records"
const baseURL = "https://recordsapi.runasp.net/api/Records"

// export const getAllRecords = async () => {
//   try {
//     const response = await axios.get(`${baseURL}/GetAllRecords`)
//     return response.data
//   } catch (error) {
//     console.error("Error fetching records:", error)
//     throw error
//   }
// }

export const getAllRecordsQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/GetAllRecordsQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching records:", error)
    throw error
  }
}

export const getRecordByDate = async (date) => {
  const response = await axios.get(`${baseURL}/GetRecordByDate/${date}`)
  return response.data
}
