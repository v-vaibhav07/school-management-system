import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

function AdminAttendance() {

  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [overview, setOverview] = useState(null)
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])

  const fetchData = async () => {

    const cls = await API.get("/classes")
    setClasses(cls.data)

    const ov = await API.get("/admin/attendance/overview")
    setOverview(ov.data)

  }

  const fetchClassAttendance = async (id) => {

    const res = await API.get(`/admin/attendance/class/${id}`)
    setStudents(res.data)

  }

  const fetchTeachers = async () => {

    const res = await API.get("/admin/attendance/teachers")
    setTeachers(res.data)

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (

    <AdminLayout>

      <div className="space-y-6">

        <h1 className="text-2xl font-bold">Attendance Analytics</h1>

        {/* TOP CARDS */}

        <div className="grid md:grid-cols-3 gap-6">

          {/* CLASS SELECT */}

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="font-semibold mb-2">
              All Classes
            </h2>

            <select
              className="border p-2 w-full rounded"
              onChange={(e)=>{
                setSelectedClass(e.target.value)
                fetchClassAttendance(e.target.value)
              }}
            >

              <option>Select Class</option>

              {classes.map(c=>(
                <option key={c.id} value={c.id}>
                  {c.class_name}-{c.section}
                </option>
              ))}

            </select>

          </div>

          {/* OVERALL STUDENT ATTENDANCE */}

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="font-semibold">
              Overall Student Attendance
            </h2>

            {overview && (

              <>
                <p className="text-4xl font-bold text-indigo-600">
                  {overview.percentage}%
                </p>

                <p className="text-gray-500">
                  {overview.present} / {overview.total}
                </p>
              </>
            )}

          </div>

          {/* TEACHER ATTENDANCE */}

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="font-semibold">
              Teacher Attendance
            </h2>

            <button
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
              onClick={fetchTeachers}
            >
              View All Teachers
            </button>

          </div>

        </div>

        {/* STUDENT TABLE */}

        {students.length > 0 && (

          <div className="bg-white rounded-xl shadow border p-6">

            <h2 className="font-semibold mb-4">
              Class Attendance
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-2">Student</th>

                  <th className="text-left p-2">Attendance %</th>

                </tr>

              </thead>

              <tbody>

                {students.map(s=>(
                  <tr key={s.student_id} className="border-b">

                    <td className="p-2">
                      {s.full_name}
                    </td>

                    <td className="p-2">
                      {s.attendance_percentage}%
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* TEACHERS */}

        {teachers.length > 0 && (

          <div className="bg-white rounded-xl shadow border p-6">

            <h2 className="font-semibold mb-4">
              Teachers Attendance
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-2">Teacher</th>

                  <th className="text-left p-2">Attendance %</th>

                </tr>

              </thead>

              <tbody>

                {teachers.map(t=>(
                  <tr key={t.id} className="border-b">

                    <td className="p-2">
                      {t.full_name}
                    </td>

                    <td className="p-2">
                      {t.percentage}%
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </AdminLayout>

  )

}

export default AdminAttendance