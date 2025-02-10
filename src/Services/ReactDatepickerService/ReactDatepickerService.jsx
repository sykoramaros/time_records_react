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

export const getAllRecordsQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user")) // Přidáno získání user objektu
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/GetAllRecordsQuery?userId=${user.userId}`
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
