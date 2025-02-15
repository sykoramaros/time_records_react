import axios from "axios"

// const baseURL = "http://localhost:5113/api/Users"
// const baseURL = "https://localhost:7081/api/Users"
const baseURL = "https://recordsapi.runasp.net/api/Users"

export const getMonthTimeGoalByUserId = async (userId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user.userId) {
      console.error("UserId is required but was null or undefined")
      return null
    }
    const response = await axios.get(`${baseURL}/GetUserById/${user.userId}`)
    console.log("getMonthTimeGoalByUserId data:", response.data)
    return response.data
  } catch (error) {
    console.log("User id:", userId)
    console.log("Error fetching month time goal", error)
    return null
  }
}

export const editMonthTimeGoal = async (userId, monthTimeGoal) => {
  try {
    const response = await axios.put(
      baseURL + `/EditMonthTimeGoal?userId=${userId}`,
      {
        monthTimeGoal: monthTimeGoal,
      }
    )
    return response.data
  } catch (error) {
    console.log("Failed to edit month time goal: ", error)
    throw error
  }
}

// export const getMonthTimeGoalByUserId = async (userId) => {
//   try {
//     const response = await axios.get(baseURL + `/GetUserById/${userId}`)
//     console.log("response data:", response.data)
//     return response.data
//   } catch (error) {
//     console.log("Error fetching month time goal")
//     return null
//   }
// }
