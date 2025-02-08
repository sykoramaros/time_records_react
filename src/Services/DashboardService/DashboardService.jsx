import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
const baseURL = "https://localhost:7081/api/RecordsTime"

export const getSumTotalRecordTime = async () => {
  const response = await axios.get(`${baseURL}/SumTotalRecordTime`)
  return response.data
}

// export const getSumActualMinistryYearTotalRecordTime = async () => {
//   const response = await axios.get(
//     `${baseURL}/SumActualMinistryYearTotalRecordTime`
//   )
//   return response.data
// }

export const getSumActualMinistryYearTotalRecordTimeQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/SumActualMinistryYearTotalRecordTimeQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total year time:", error)
    throw error
  }
}

// export const getYearRecordProgress = async () => {
//   const response = await axios.get(`${baseURL}/YearRecordProgress`)
//   return response.data
// }

export const getYearRecordProgressQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/YearRecordProgressQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total year time:", error)
    throw error
  }
}

// export const getYearRemainingTime = async () => {
//   const response = await axios.get(`${baseURL}/YearRemainingTime`)
//   return response.data
// }

export const getYearRemainingTimeQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/YearRemainingTimeQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total year time:", error)
    throw error
  }
}

// export const getSumActualMonthTotalRecordTime = async () => {
//   const response = await axios.get(`${baseURL}/SumActualMonthTotalRecordTime`)
//   return response.data
// }

export const getSumActualMonthTotalRecordTimeQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/SumActualMonthTotalRecordTimeQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total month time:", error)
    throw error
  }
}

// export const getMonthRecordProgress = async () => {
//   const response = await axios.get(`${baseURL}/MonthRecordProgress`)
//   return response.data
// }

export const getMonthRecordProgressQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/MonthRecordProgressQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total month time:", error)
    throw error
  }
}

// export const getMonthRemainingTime = async () => {
//   const response = await axios.get(`${baseURL}/MonthRemainingTime`)
//   return response.data
// }

export const getMonthRemainingTimeQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/MonthRemainingTimeQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total month time:", error)
    throw error
  }
}

// export const getSumActualWeekTotalRecordTime = async () => {
//   const response = await axios.get(`${baseURL}/SumActualWeekTotalRecordTime`)
//   return response.data
// }

export const getSumActualWeekTotalRecordTimeQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/SumActualWeekTotalRecordTimeQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total week time:", error)
    throw error
  }
}

// export const getWeekRecordProgress = async () => {
//   const response = await axios.get(`${baseURL}/WeekRecordProgress`)
//   return response.data
// }

export const getWeekRecordProgressQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/WeekRecordProgressQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total week time:", error)
    throw error
  }
}

// export const getWeekRemainingTime = async () => {
//   const response = await axios.get(`${baseURL}/WeekRemainingTime`)
//   return response.data
// }

export const getWeekRemainingTimeQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user || !user.userId) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/WeekRemainingTimeQuery?userId=${user.userId}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching total week time:", error)
    throw error
  }
}
