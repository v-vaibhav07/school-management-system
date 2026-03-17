import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "student",
    phone: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await API.post("/auth/register", form)
      alert("Registered successfully ✅")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Error")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>

        <p className="text-sm text-center mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  )
}

export default Register




