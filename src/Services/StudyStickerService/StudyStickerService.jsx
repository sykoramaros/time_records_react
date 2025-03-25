import axios from "axios"

// const baseURL = "http://localhost:5113/api/Roles"
// const baseURL = "https://localhost:7081/api/Roles"
const baseURL = "https://recordsapi.runasp.net/api/Studies"

export const getSumActualMonthRecorStudyQuery = async (id) => {
  const response = await axios.get(
    `${baseURL}/GetSumActualMonthRecordStudyQuery?userId=${id}`)
  return response.data
}
