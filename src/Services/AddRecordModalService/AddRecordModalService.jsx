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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }
    const response = await axios.post(
      `${baseURL}/CreateRecordQuery?userId=${user.Id}`,
      record
    )
    return response.data
  } catch (error) {
    console.error("Error creating record:", error)
    throw error
  }
}
