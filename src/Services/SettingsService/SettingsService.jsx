import axios from "axios"

// const baseURL = "http://localhost:5113/api/Users"
// const baseURL = "https://localhost:7081/api/Users"
const baseURL = "https://recordsapi.runasp.net/api/Users"

export const getUserByIdQuery = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))

    if (!user?.userId) {
      console.error(
        "getCurrentUserQuery error: UserId not found in localStorage"
      )
      return null
    }
    const response = await axios.get(
      `${baseURL}/GetUserByIdQuery?userId=${user.userId}`
    )
    console.log("getCurrentUserQuery data:", response.data)
    return response.data
  } catch (error) {
    console.error("Error in getCurrentUserQuery:", error.message)
    return null
  }
}

// export const editMonthTimeGoal = async (monthTimeGoal) => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"))
//     // Vytvoříme objekt podle původní struktury
//     const payload = {
//       Name: user.name || "",
//       Email: user.email || "",
//       phoneNumber: user.phoneNumber || "",
//       monthTimeGoal: Number(monthTimeGoal),
//       userId: user.userId,
//     }
//     console.log(
//       "Request URL:",
//       `${baseURL}/EditMonthTimeGoal?userId=${user.userId}`
//     )
//     console.log("Request payload:", payload)
//     console.log("User from localStorage:", user)
//     const response = await axios.put(
//       `${baseURL}/EditMonthTimeGoal?userId=${user.userId}`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     )
//     console.log("Server response:", response)
//     return response.data
//   } catch (error) {
//     // Detailní výpis chyby
//     console.log("Error details:", {
//       data: error.response?.data,
//       status: error.response?.status,
//       headers: error.response?.headers,
//       config: error.config,
//     })
//     throw error
//   }
// }

// export const editUserByIdQuery = async () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"))
//     const response = await axios.put(
//       `${baseURL}/EditUserByIdQuery?userId=${user.userId}`,
//       {
//         name: user.name || "",
//         email: user.email || "",
//         phoneNumber: user.phoneNumber || "",
//         monthTimeGoal: user.monthTimeGoal || 15,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       }
//     )
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

export const editUserByIdQuery = async (userData) => {
  try {
    const userFromStorage = JSON.parse(localStorage.getItem("user"))

    const payload = {
      name: userData.name,
      email: userData.email,
      password: "",
      phoneNumber: userData.phoneNumber,
      monthTimeGoal: userData.monthTimeGoal,
    }
    console.log("editUserByIdQuery - Payload:", payload)
    console.log("editUserByIdQuery - UserId:", userFromStorage.userId)
    console.log(
      "editUserByIdQuery - Full URL:",
      `${baseURL}/EditUserByIdQuery?userId=${userFromStorage.userId}`
    )
    const response = await axios.put(
      `${baseURL}/EditUserByIdQuery?userId=${userFromStorage.userId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    )
    return response.data
  } catch (error) {
    console.log(
      "editUserByIdQuery - Error response data:",
      error.response?.data
    )
    console.log("editUserByIdQuery - Error request data:", error.config?.data)
    throw error
  }
}
