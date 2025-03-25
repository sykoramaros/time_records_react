import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
// const baseURL = "https://localhost:7081/api/RecordsTime"
const baseURL = "https://recordsapi.runasp.net/api/RecordsTime"

// console.log(JSON.parse(localStorage.getItem('user')));


export const getSumTotalRecordTime = async () => {
  const response = await axios.get(`${baseURL}/SumTotalRecordTime`)
  return response.data
}

export const getSumActualMinistryYearTotalRecordTimeQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/SumActualMinistryYearTotalRecordTimeQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total year time:", error)
    throw error
  }
}

export const getYearRecordProgressQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/YearRecordProgressQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total year time:", error)
    throw error
  }
}

export const getYearRemainingTimeQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/YearRemainingTimeQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total year time:", error)
    throw error
  }
}

export const getSumActualMonthTotalRecordTimeQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/SumActualMonthTotalRecordTimeQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total month time:", error)
    throw error
  }
}

export const getMonthRecordProgressQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/MonthRecordProgressQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total month time:", error)
    throw error
  }
}

export const getMonthRemainingTimeQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/MonthRemainingTimeQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total month time:", error)
    throw error
  }
}

export const getSumActualWeekTotalRecordTimeQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/SumActualWeekTotalRecordTimeQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total week time:", error)
    throw error
  }
}

export const getWeekRecordProgressQuery = async (id) => {
  try {
    const response = await axios.get(
      `${baseURL}/WeekRecordProgressQuery?userId=${id}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total week time:", error)
    throw error
  }
}

export const getWeekRemainingTimeQuery = async (id) => {
  try {
    const response = await axios.get(
        `${baseURL}/WeekRemainingTimeQuery?userId=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total week time:", error);
    throw error;
  }
};