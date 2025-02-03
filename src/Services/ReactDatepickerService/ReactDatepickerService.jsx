import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
const baseURL = "https://localhost:7081/api/Records"

export const getAllRecords = async () => {
  const response = await axios.get(`${baseURL}/getAllRecords`)
  return response.data
}

export const getRecordByDate = async (date) => {
  const response = await axios.get(`${baseURL}/getRecordByDate/${date}`)
  return response.data
}
