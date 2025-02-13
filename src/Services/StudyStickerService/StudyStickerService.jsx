import axios from "axios"

// const baseURL = "http://localhost:5113/api/Roles"
// const baseURL = "https://localhost:7081/api/Roles"
const baseURL = "https://recordsapi.runasp.net/api/Studies"

export const getSumActualMonthRecorStudyQuery = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const response = await axios.get(
    `${baseURL}/GetSumActualMonthRecordStudyQuery?userId=${user.userId}`)
  return response.data
}
