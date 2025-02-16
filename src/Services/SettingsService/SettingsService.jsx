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

// export const editMonthTimeGoal = async (userId, data) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"))
//     console.log("editMonthTimeGoal:", user)
//     const response = await axios.put(
//       `${baseURL}/EditMonthTimeGoal?userId=${user.userId}`,
//       {
//         monthTimeGoal: user.monthTimeGoal,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     return response.data
//   } catch (error) {
//     console.error("Failed to edit month time goal:", error)
//     throw error
//   }
// }

export const editMonthTimeGoal = async (monthTimeGoal) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    
    // Vytvoříme objekt podle původní struktury
    const payload = {
      Name: user.name || "",
      Email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      monthTimeGoal: Number(monthTimeGoal),
      userId: user.userId
    }
    
    console.log("Request URL:", `${baseURL}/EditMonthTimeGoal?userId=${user.userId}`)
    console.log("Request payload:", payload)
    console.log("User from localStorage:", user)
    
    const response = await axios.put(
      `${baseURL}/EditMonthTimeGoal?userId=${user.userId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      }
    )
    
    console.log("Server response:", response)
    return response.data
  } catch (error) {
    // Detailní výpis chyby
    console.log("Error details:", {
      data: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      config: error.config
    })
    throw error
  }
}

// export const editMonthTimeGoal = async (userId, newMonthTimeGoal) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"))
//     if (!user.userId) {
//       console.error("UserId is required but was null or undefined")
//       return null
//     }
//     const response = await axios.put(
//       `${baseURL}/EditMonthTimeGoal?userId=${userId}`,
//       {
//         monthTimeGoal: newMonthTimeGoal,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     return response.data
//   } catch (error) {
//     console.log("Failed to edit month time goal: ", error)
//     throw error
//   }
// }

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
