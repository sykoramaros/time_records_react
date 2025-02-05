import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  getRoleById,
  modificationsRoleEdit,
} from "../../Services/RolesService/RolesService"

const EditRole = () => {
  const { id } = useParams() // Získání ID role z URL
  const [role, setRole] = useState()
  const [roleName, setRoleName] = useState("") // Název role zobrazený pouze jako text
  const [members, setMembers] = useState([])
  const [nonMembers, setNonMembers] = useState([])
  const [addIds, setAddIds] = useState([])
  const [deleteIds, setDeleteIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoleById(id)
        setRole(response.role)
        setRoleName(response.role.name) // Nastavení názvu role pouze pro zobrazení
        setMembers(response.members || [])
        setNonMembers(response.nonMembers || [])
        console.log("fetchData", response)
      } catch (error) {
        console.error("Error loading role data:", error)
      }
    }
    fetchData()
  }, [id])

  const handleAddIdsChange = (userId) => {
    setAddIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
    console.log("handleAddIdsChange", addIds)
  }

  const handleDeleteIdsChange = (userId) => {
    setDeleteIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
    console.log("handleDeleteIdsChange", deleteIds)
  }

  const handleSave = async () => {
    try {
      const requestData = {
        roleId: id,
        roleName: role.name || roleName,
        addIds: addIds || [],
        deleteIds: (deleteIds || []).filter((id) => id !== ""),
      }
      console.log("Sending data:", requestData) // pro debugging
      // Změna zde - posíláme jen requestData
      await modificationsRoleEdit(requestData)
      alert("Role updated successfully.")
      navigate("/roles")
    } catch (error) {
      console.error("handleSave error:", error)
      alert(`Failed to update role: ${error.message || "Unknown error"}`)
    }
  }

  return (
    <div className="container">
      <h1>Edit Role: {roleName} </h1>
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/roles")}
      >
        Back
      </button>

      <h2 className="h5 mb-3">Add to {roleName}</h2>
      <ul className="list-group mb-4">
        {nonMembers.length === 0 ? (
          <li className="list-group-item text-muted text-center">
            All users are already members
          </li>
        ) : (
          nonMembers.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>{user.userName}</strong>
              <input
                type="checkbox"
                onChange={() => handleAddIdsChange(user.id)}
                checked={addIds.includes(user.id)}
              />
            </li>
          ))
        )}
      </ul>

      <h2 className="h5 mb-3">Remove from {roleName}</h2>
      <ul className="list-group mb-4">
        {members.length === 0 ? (
          <li className="list-group-item text-muted text-center">
            No users are members
          </li>
        ) : (
          members.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <strong>{user.userName}</strong>
              <input
                type="checkbox"
                onChange={() => handleDeleteIdsChange(user.id)}
                checked={deleteIds.includes(user.id)}
              />
            </li>
          ))
        )}
      </ul>

      <div>
        <button className="btn btn-success mt-3" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditRole
