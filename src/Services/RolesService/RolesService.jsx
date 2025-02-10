import axios from "axios"

// const baseURL = "http://localhost:5113/api/Roles"
// const baseURL = "https://localhost:7081/api/Roles"
const baseURL = "https://recordsapi.runasp.net/api/Roles"

// Získání seznamu všech rolí
export const getAllRoles = async () => {
  try {
    const response = await axios.get(baseURL + "/GetAllRoles")
    console.log("getAllRoles:", response.data)
    return response.data
  } catch (error) {
    console.error("Error fetching roles:", error)
    throw error
  }
}

// Získání role podle ID
export const getRoleById = async (id) => {
  try {
    const response = await axios.get(baseURL + `/GetRoleById/${id}`)
    return response.data
  } catch (error) {
    console.error("Error loading role data:", error)
    throw error
  }
}
// Vytvoření nové role
export const createRole = async (roleName) => {
  try {
    const response = await axios.post(
      baseURL + `/CreateRole?roleName=${encodeURIComponent(roleName)}`
    )
    return response.data
  } catch (error) {
    console.error("Error creating role:", error)
    throw error
  }
}

// Aktualizace role
// export const updateRole = async (id, data) => {
//   try {
//     const response = await axios.put(baseURL + `/ModificationsRoleEdit`, data)
//     return response.data
//   } catch (error) {
//     console.error("Error updating role:", error)
//     throw error
//   }
// }

// Smazání role
export const deleteRole = async (roleId) => {
  try {
    const response = await axios.delete(baseURL + `/DeleteRole/${roleId}`)
    return response.data
  } catch (error) {
    console.error("Error deleting role:", error)
    throw error
  }
}

export const modificationsRoleEdit = async (modifications) => {
  try {
    const response = await axios.put(baseURL + `/ModificationsRoleEdit`, {
      roleId: modifications.roleId,
      roleName: modifications.roleName,
      addIds: modifications.addIds,
      deleteIds: modifications.deleteIds,
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data
    }
    console.error("modificationsRoleEdit:", error)
    throw error
  }
}
