import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
const baseURL = "https://localhost:7081/api/Records"

export const getAllRecords = async () => {
  const response = await axios.get(`${baseURL}/GetAllRecords`)
  return response.data
}

export const getRecordByDate = async (date) => {
  const response = await axios.get(`${baseURL}/GetRecordByDate/${date}`)
  return response.data
}

