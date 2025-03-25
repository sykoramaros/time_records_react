import axios from "axios"

// const baseURL = "http://localhost:5113/api/Users"
// const baseURL = "https://localhost:7081/api/Users"
const baseURL = "https://recordsapi.runasp.net/api/Users"

export const getUserByIdQuery = async (id) => {
  const response = await axios.get(
      `${baseURL}/GetUserByIdQuery?userId=${id}`
  )
  // console.log("getUserByIdQuery data:", response.data)
  return response.data
}

export const editUserByIdQuery = async (id, payload) => {
  try {
    const response = await axios.put(
      `${baseURL}/EditUserByIdQuery?userId=${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        }
      }
    )
    return response.data
  } catch (error) {
    console.log(
      "editUserByIdQuery - Error response data:",
      error.response?.data
    )
    console.log("editUserByIdQuery - Error request data:", error.config?.data)
    throw error
  }
}