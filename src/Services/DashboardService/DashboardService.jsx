import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
const baseURL = "https://localhost:7081/api/RecordsTime"

export const getSumTotalRecordTime = async () => {
  const response = await axios.get(`${baseURL}/SumTotalRecordTime`)
  return response.data
}

export const getSumMinistryYearTotalRecordTime = async () => {
  const response = await axios.get(`${baseURL}/SumMinistryYearTotalRecordTime`)
  return response.data
}

export const getYearRecordProgress = async () => {
  const response = await axios.get(`${baseURL}/YearRecordProgress`)
  return response.data
}

export const getSumActualMonthTotalRecordTime = async () => {
  const response = await axios.get(`${baseURL}/SumActualMonthTotalRecordTime`)
  return response.data
}

export const getMonthRecordProgress = async () => {
  const response = await axios.get(`${baseURL}/MonthRecordProgress`)
  return response.data
}

export const getSumActualWeekTotalRecordTime = async () => {
  const response = await axios.get(`${baseURL}/SumActualWeekTotalRecordTime`)
  return response.data
}

export const getWeekRecordProgress = async () => {
  const response = await axios.get(`${baseURL}/WeekRecordProgress`)
  return response.data
}
