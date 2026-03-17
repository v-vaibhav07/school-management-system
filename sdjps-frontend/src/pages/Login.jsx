import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      const token = res.data.token
      const user = res.data.user

      // store token
      localStorage.setItem("token", token)

      // store role
      localStorage.setItem("role", user.role)

      // role based redirect
      // if (user.role === "admin") {

      //   navigate("/dashboard")

      // }

      // else if (user.role === "teacher") {

      //   navigate("/teachers")

      // }

      // else if (user.role === "student") {

      //   navigate("/student/dashboard")

      // }

      // else if (user.role === "parent") {

      //   navigate("/parent/dashboard")

      // }


      // role based redirect
      if (user.role === "admin") {
        navigate("/admin/dashboard")
      }
      else if (user.role === "teacher") {
        navigate("/teacher/dashboard")   
      }
      else if (user.role === "student") {
        navigate("/student/dashboard")
      }
      else if (user.role === "parent") {
        navigate("/parent/dashboard")
      }

    } catch (error) {

      console.log("Login error", error)

      alert("Invalid login")

    }

  }

  return (

    <div className="flex items-center justify-center h-screen">

      <div className="bg-white p-6 shadow rounded w-[400px]">

        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>

        {/* // added this */}
        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>

  )

}

export default Login