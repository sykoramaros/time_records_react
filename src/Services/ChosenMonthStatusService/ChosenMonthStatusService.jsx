import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
// const baseURL = "https://localhost:7081/api/RecordsTime"
const baseURL = "https://recordsapi.runasp.net/api/RecordsTime"

export const getChosenMonthStatus = async (userId, chosenMonth, chosenYear) => {
    try {
        const userJson = localStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;
        if (!user || !user.Id) {
            throw new Error("User information not found")
        }
    const response = await axios.get(`${baseURL}/SumChosenMonthTotalRecordTimeQuery`, {
        params: {
            userId: user.Id,
            chosenMonth: chosenMonth,
            chosenYear: chosenYear
        }
    })
    console.log(response.data)
    return response.data
    } catch (error) {
        console.error("Error fetching total month time:", error)
        throw error
    }
}