import axios from "axios"

// const baseURL = "http://localhost:5113/api/Records"
const baseURL = "https://localhost:7081/api/Records"

export const createRecord = async (record) => {
  try {
    const response = await axios.post(`${baseURL}/createRecord`, record, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  } catch (error) {
    console.error("Error creating record:", error)
    throw error
  }
}
