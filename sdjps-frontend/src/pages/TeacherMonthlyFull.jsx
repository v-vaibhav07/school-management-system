import { useEffect, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function TeacherMonthlyFull() {

  const { classId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const month = searchParams.get("month")
  const [data, setData] = useState([])

  // ✅ SAFE MONTH
  const safeMonth = month || new Date().toISOString().slice(0, 7)

  // ✅ DYNAMIC DAYS
  const daysInMonth = new Date(
    new Date(safeMonth + "-01").getFullYear(),
    new Date(safeMonth + "-01").getMonth() + 1,
    0
  ).getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // ✅ MONTH CHANGE HANDLER
  const handleMonthChange = (e) => {
    const newMonth = e.target.value

    navigate(
      `/teacher/attendance/monthly/${classId}?month=${newMonth}`
    )
  }

  // ✅ FETCH DATA
  const fetchData = async () => {
    try {
      const res = await API.get(
        `/teacher/attendance/monthly/${classId}/full?month=${safeMonth}`
      )
      setData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // ✅ USE EFFECT
  useEffect(() => {
    if (safeMonth) fetchData()
  }, [safeMonth, classId])

  return (

    <div className="p-4 md:p-6">

      {/* 🔥 HEADER + MONTH PICKER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">

        <h1 className="text-xl md:text-2xl font-bold">
          Monthly Attendance ({safeMonth})
        </h1>

        <input
          type="month"
          value={safeMonth}
          onChange={handleMonthChange}
          className="border px-3 py-2 rounded-lg"
        />

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2">Roll</th>
              <th className="p-2">Name</th>

              {days.map(d => (
                <th key={d} className="p-2">{d}</th>
              ))}

            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {data.map((s) => (

              <tr key={s.id} className="border-b">

                <td className="p-2 font-medium">{s.roll}</td>
                <td className="p-2">{s.name}</td>

                {days.map(d => {

                  const status = s.attendance[d]

                  return (
                    <td
                      key={d}
                      className={`p-2 text-center rounded
                        ${status === "present" ? "bg-green-100 text-green-700 font-bold" : ""}
                        ${status === "absent" ? "bg-red-100 text-red-700 font-bold" : ""}
                        ${!status ? "text-gray-300" : ""}
                      `}
                    >

                      {status === "present" && "P"}
                      {status === "absent" && "A"}
                      {!status && "-"}

                    </td>
                  )
                })}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default TeacherMonthlyFull