// import { Navigate } from "react-router-dom"

// function ProtectedRoute({ children }) {

//   const token = localStorage.getItem("token")

//   if (!token) {

//     return <Navigate to="/login" />

//   }
//   return children
// }
// export default ProtectedRoute




//niche wale se replce h 







import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token")
  const userRole = localStorage.getItem("role")

  if (!token) {
    return <Navigate to="/login" />
  }

  if (role && role !== userRole) {
    return <Navigate to={`/${userRole}/dashboard`} />
  }

  return children
}

export default ProtectedRoute