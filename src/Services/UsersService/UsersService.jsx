import axios from "axios"

// const baseURL = "http://localhost:5113/api/Users"
const baseURL = "https://localhost:7081/api/Users"

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
    const response = await axios.get(baseURL + `/GetByEmail/${email}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(baseURL + `/GetUserById/${id}`)
    console.log("response.data:", response.data)
    return response.data
  } catch (error) {
    console.log("userId:", id)
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

export const editUser = async (userId, user) => {
  try {
    const response = await axios.put(
      baseURL + `/EditUser/${userId}`,
      {
        Name: user.name,
        Email: user.email,
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

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(baseURL + `/DeleteUser/${userId}`)
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
