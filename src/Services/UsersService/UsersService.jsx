import axios from "axios"

// const baseURL = "http://localhost:5113/api/Users"
// const baseURL = "https://localhost:7081/api/Users"
const baseURL = "https://recordsapi.runasp.net/api/Users"

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseURL + "/GetAllUsers")
    return response.data
  } catch (error) {
    console.error("Error fetching users:", error)
    return null
  }
}

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(baseURL + `/GetUserByEmail/${email}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const getUserById = async (Id) => {
  try {
    const response = await axios.get(baseURL + `/GetUserById/${Id}`)
    console.log("response.data:", response.data)
    return response.data
  } catch (error) {
    console.log("User Id:", Id)
    console.error("Error fetching user:", error)
    return null
  }
}

export const createUser = async (user) => {
  try {
    const response = await axios.post(
      baseURL + "/CreateUser",
      JSON.stringify(user),
      {
        headers: {
          "Content-Type": "application/json", // Nastavuje typ dat jako JSON
        },
      }
    )
    console.log("Server response:", response)
    return response.data
  } catch (error) {
    console.error("Error creating user:", error)
    return { success: false, error: error.message }
  }
}

export const editUser = async (Id, user) => {
  console.log("editUser:", user)
  try {
    const response = await axios.put(
      baseURL + `/EditUser/${Id}`,
      {
        Name: user.name,
        Email: user.email,
        phoneNumber: user.phoneNumber,
        monthTimeGoal: user.monthTimeGoal,
      },
      {
        headers: {
          "Content-Type": "application/json", // Nastavuje typ dat jako JSON
        },
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteUser = async (Id) => {
  try {
    const response = await axios.delete(baseURL + `/DeleteUser/${Id}`)
    console.log("User deleted successfully:", response.data)
    return response.data
  } catch (error) {
    console.error(
      "Error deleting user:",
      error.response ? error.response.data : error.message
    )
    return { success: false, error: error.message }
  }
}
