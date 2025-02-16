import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  getAllUsers,
  getUserById,
  deleteUser,
} from "../../Services/UsersService/UsersService"
import AddModal from "./AddModal"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"

const Users = () => {
  const [users, setUsers] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)

  const navigate = useNavigate()

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getAllUsers()
      setUsers(fetchedUsers)
    }
    fetchUsers()
  }, [])

  // Open create user modal
  const handleOpenCreateModal = () => setShowCreateModal(true)

  // Edit user handler
  const handleLoadUser = async (userId) => {
    try {
      const user = await getUserById(userId)
      if (user) {
        setUserToEdit(user)
        setShowEditModal(true)
        console.log("User loaded:", user)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  // Open delete user modal
  const handleOpenDeleteModal = (userId) => {
    setShowDeleteModal(true)
    setUserToDelete(userId)
  }

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
  }

  // Delete user handler
  const handleDeleteUser = async (userId) => {
    const result = await deleteUser(userId)
    if (result.success) {
      setUsers(users.filter((user) => user.id !== userId))
      handleCloseDeleteModal()
    } else {
      console.error("Chyba při mazání uživatele:", result)
      navigate(0)
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center py-4">Users</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleOpenCreateModal}
        >
          ＋ Add User
        </button>
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {users.map((user, index) => (
            <div key={index} className="col">
              <div className="card border-primary mb-3 shadow-sm w-100 h-100">
                <h5 className="card-header bg-transparent border-primary">
                  Info
                </h5>
                <div className="card-body">
                  <h4 className="card-title text-success">{user.userName}</h4>
                  <p className="card-text fst-italic">
                    <span>ID: {user.id}</span>
                    <br />
                    Name: {user.userName}
                    <br />
                    Email: {user.email}
                    <br />
                    Phone number: {user.phoneNumber}
                    <br />
                    Month time goal: {user.monthTimeGoal}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-primary">
                  <div className="row">
                    <div className="col">
                      <button
                        onClick={() => handleLoadUser(user.id)}
                        type="button"
                        className="btn btn-warning w-100 rounded-1"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-danger w-100 rounded-1"
                        onClick={() => handleOpenDeleteModal(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      <AddModal showModal={showCreateModal} setShowModal={setShowCreateModal} />

      {/* Edit User Modal */}
      <EditModal
        show={showEditModal}
        user={userToEdit}
        onClose={() => {
          setShowEditModal(false)
          setUserToEdit(null)
        }}
      />

      {/* Delete User Modal */}
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        handleDeleteUser={handleDeleteUser}
        userId={userToDelete}
      />
    </div>
  )
}

export default Users

// import React from "react"
// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import {
//   getAllUsers,
//   deleteUser,
//   editUser,
// } from "../../Services/UsersService/UsersService"
// import AddModal from "./AddModal"
// import EditModal from "./EditModal"
// import DeleteModal from "./DeleteModal"

// const Users = () => {
//   const [users, setUsers] = useState([])
//   const [showCreateModal, setShowCreateModal] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [userToDelete, setUserToDelete] = useState(null)
//   const [userToEdit, setUserToEdit] = useState(null)

//   const navigate = useNavigate()

//   // Fetch users on component mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const fetchedUsers = await getAllUsers()
//       setUsers(fetchedUsers)
//     }
//     fetchUsers()
//   }, [])

//   // Open create user modal
//   const handleOpenCreateModal = () => setShowCreateModal(true)

//   // Open edit user modal
//   const handleOpenEditModal = (user) => {
//     setShowEditModal(true)
//     setUserToEdit(user)
//   }

//   // Edit user handler
//   const handleEditUser = async (updatedUser) => {
//     try {
//       // Call API to update user
//       const result = await editUser(updatedUser)
//       if (result.success) {
//         // Update users list in state
//         setUsers(
//           users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//         )
//         // Close edit modal
//         setShowEditModal(false)
//       } else {
//         console.error("Error updating user:", result)
//         // Optionally reload the page or show an error message
//         navigate(0)
//       }
//     } catch (error) {
//       console.error("Error updating user:", error)
//       navigate(0)
//     }
//   }

//   // Open delete user modal
//   const handleOpenDeleteModal = (userId) => {
//     setShowDeleteModal(true)
//     setUserToDelete(userId)
//   }

//   // Close delete modal
//   const handleCloseDeleteModal = () => {
//     setShowDeleteModal(false)
//   }

//   // Delete user handler
//   const handleDeleteUser = async (userId) => {
//     const result = await deleteUser(userId)
//     if (result.success) {
//       setUsers(users.filter((user) => user.id !== userId))
//       handleCloseDeleteModal()
//     } else {
//       console.error("Chyba při mazání uživatele:", result)
//       navigate(0)
//     }
//   }

//   return (
//     <div>
//       <div className="container">
//         <h1 className="text-center py-4">Users</h1>
//         <button
//           type="button"
//           className="btn btn-success"
//           onClick={handleOpenCreateModal}
//         >
//           ＋ Add User
//         </button>
//         <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
//           {users.map((user, index) => (
//             <div key={index} className="col">
//               <div className="card border-primary mb-3 shadow-sm w-100 h-100">
//                 <h5 className="card-header bg-transparent border-primary">
//                   Info
//                 </h5>
//                 <div className="card-body">
//                   <h4 className="card-title text-success">{user.userName}</h4>
//                   <p className="card-text fst-italic">
//                     <span>ID: {user.id}</span>
//                     <br />
//                     Name: {user.userName}
//                     <br />
//                     Email: {user.email}
//                     <br />
//                     Phone number: {user.phoneNumber}
//                   </p>
//                 </div>
//                 <div className="card-footer bg-transparent border-primary">
//                   <div className="row">
//                     <div className="col">
//                       <button
//                         onClick={() => handleOpenEditModal(user)}
//                         type="button"
//                         className="btn btn-warning w-100 rounded-1"
//                       >
//                         Edit
//                       </button>
//                     </div>
//                     <div className="col">
//                       <button
//                         className="btn btn-danger w-100 rounded-1"
//                         onClick={() => handleOpenDeleteModal(user.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add User Modal */}
//       <AddModal showModal={showCreateModal} setShowModal={setShowCreateModal} />

//       {/* Edit User Modal */}
//       <EditModal
//         showModal={showEditModal}
//         setShowModal={setShowEditModal}
//         initialUser={userToEdit}
//         onSubmit={handleEditUser}
//       />

//       {/* Delete User Modal */}
//       <DeleteModal
//         showModal={showDeleteModal}
//         setShowModal={setShowDeleteModal}
//         handleCloseModal={handleCloseDeleteModal}
//         handleDeleteUser={handleDeleteUser}
//         userId={userToDelete}
//       />
//     </div>
//   )
// }

// export default Users
