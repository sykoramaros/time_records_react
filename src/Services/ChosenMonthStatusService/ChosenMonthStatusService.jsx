import axios from "axios"

// const baseURL = "http://localhost:5113/api/RecordsTime"
// const baseURL = "https://localhost:7081/api/RecordsTime"
const baseURL = "https://recordsapi.runasp.net/api/RecordsTime"

export const getChosenMonthStatus = async (id, chosenMonth, chosenYear) => {
    const response = await axios.get(`${baseURL}/SumChosenMonthTotalRecordTimeQuery`, {
        params: {
            userId: id,
            chosenMonth: chosenMonth + 1,
            chosenYear: chosenYear
        }
    })
    // console.log(response.data)
    return response.data
}