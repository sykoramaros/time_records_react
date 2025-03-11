import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
// const baseURL = "https://localhost:7081/api/RecordsTime"
const baseURL = "https://recordsapi.runasp.net/api/RecordsTime"

// console.log(JSON.parse(localStorage.getItem('user')));


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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/SumActualMinistryYearTotalRecordTimeQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/YearRecordProgressQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/YearRemainingTimeQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/SumActualMonthTotalRecordTimeQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/MonthRecordProgressQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/MonthRemainingTimeQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/SumActualWeekTotalRecordTimeQuery?userId=${user.Id}`
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
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) {
      throw new Error("User information not found")
    }

    const response = await axios.get(
      `${baseURL}/WeekRecordProgressQuery?userId=${user.Id}`
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


// export const getWeekRemainingTimeQuery = async () => {
//   try {
//     // Získání dat uživatele z localStorage
//     const user = JSON.parse(localStorage.getItem("user"))
//   // Získání tokenu z localStorage
//     const token = localStorage.getItem("token")
//
//     if (!user || !user.userId) {
//       throw new Error("User information not found")
//     }
//   // Vytvoření API požadavku s autorizační hlavičkou a správným ID uživatele
//     const response = await axios.get(
//         `${baseURL}/WeekRemainingTimeQuery?userId=${user.Id}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//     )
//     return response.data
//   } catch (error) {
//     console.error("Error fetching total week time:", error)
//     throw error
//   }
// }

export const getWeekRemainingTimeQuery = async () => {
  try {
    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    if (!user || !user.Id) { // Zkontrolujte, zda je přítomno Id
      throw new Error("User information not found");
    }

    const response = await axios.get(
        `${baseURL}/WeekRemainingTimeQuery?userId=${user.Id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total week time:", error);
    throw error;
  }
};