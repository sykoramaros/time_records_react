import axios from "axios"

// const baseURL = "http://localhost:5113/api/Records"
// const baseURL = "https://localhost:7081/api/Records"
const baseURL = "https://recordsapi.runasp.net/api/Records"

// export const createRecord = async (record) => {
//   try {
//     const response = await axios.post(`${baseURL}/createRecord`, record, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     return response.data
//   } catch (error) {
//     console.error("Error creating record:", error)
//     throw error
//   }
// }

export const createRecordQuery = async (record) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }
    const response = await axios.post(
      `${baseURL}/CreateRecordQuery?userId=${user.userId}`,
      record
    )
    return response.data
  } catch (error) {
    console.error("Error creating record:", error)
    throw error
  }
}
