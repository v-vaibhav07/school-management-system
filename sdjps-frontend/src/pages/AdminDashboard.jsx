// import { useEffect, useState } from "react"
// import API from "../services/api"

// function AdminDashboard() {

//   const [data, setData] = useState(null)

//   const fetchDashboard = async () => {

//     try {

//       const res = await API.get("/analytics/dashboard")
//       setData(res.data)

//     } catch (err) {

//       console.log("Dashboard error", err)

//     }

//   }

//   useEffect(() => {

//     fetchDashboard()

//   }, [])

//   if (!data) return <p>Loading dashboard...</p>

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-6">
//         Admin Dashboard
//       </h1>

//       {/* STATS */}

//       <div className="grid grid-cols-3 gap-6 mb-10">

//         <div className="bg-white shadow p-6 rounded">
//           <h2 className="text-gray-500">Total Students</h2>
//           <p className="text-3xl font-bold">{data.totalStudents}</p>
//         </div>

//         <div className="bg-white shadow p-6 rounded">
//           <h2 className="text-gray-500">Total Teachers</h2>
//           <p className="text-3xl font-bold">{data.totalTeachers}</p>
//         </div>

//         <div className="bg-white shadow p-6 rounded">
//           <h2 className="text-gray-500">Total Classes</h2>
//           <p className="text-3xl font-bold">{data.totalClasses}</p>
//         </div>

//       </div>


//       {/* TOP STUDENTS */}

//       <div className="bg-white shadow rounded p-6 mb-10">

//         <h2 className="text-xl font-bold mb-4">
//           Top 10 Students
//         </h2>

//         <table className="w-full">

//           <thead className="bg-gray-200">

//             <tr>
//               <th className="p-2 text-left">Name</th>
//               <th className="p-2 text-left">Score</th>
//             </tr>

//           </thead>

//           <tbody>

//             {data.topStudents.map((s, index) => (

//               <tr key={index} className="border-b">

//                 <td className="p-2">{s.full_name}</td>
//                 <td className="p-2">{s.final_score}</td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>


//       {/* ATTENDANCE ANALYTICS */}

//       <div className="bg-white shadow rounded p-6">

//         <h2 className="text-xl font-bold mb-4">
//           Attendance Analytics
//         </h2>

//         <table className="w-full">

//           <thead className="bg-gray-200">

//             <tr>
//               <th className="p-2 text-left">Class ID</th>
//               <th className="p-2 text-left">Attendance %</th>
//             </tr>

//           </thead>

//           <tbody>

//             {data.attendanceAnalytics.map((a, index) => (

//               <tr key={index} className="border-b">

//                 <td className="p-2">{a.class_id}</td>
//                 <td className="p-2">
//                   {a.percentage.toFixed(2)}%
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>

//   )

// }

// export default AdminDashboard


import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

function AdminDashboard() {

  const [stats, setStats] = useState(null)
  const [classPerformance, setClassPerformance] = useState([])
  const [insights, setInsights] = useState([])

  const fetchDashboard = async () => {

    try {

      const res = await API.get("/analytics/dashboard")
      setStats(res.data)

      const perf = await API.get("/analytics/class-performance")
      setClassPerformance(perf.data)

      const insightRes = await API.get("/analytics/insights")
      setInsights(insightRes.data.insights)

    } catch (error) {

      console.log("Dashboard error", error)

    }

  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  if (!stats)
    return <p className="p-6 text-gray-500">Loading dashboard...</p>

return (

  <AdminLayout>

    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Analytics Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          School performance and analytics overview
        </p>
      </div>

      {/* ========================
          STAT CARDS
      ======================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-sm rounded-xl p-6 border">
          <p className="text-gray-500 text-sm">Students</p>
          <h2 className="text-3xl font-bold text-indigo-600">
            {stats.students || 0}
          </h2>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 border">
          <p className="text-gray-500 text-sm">Teachers</p>
          <h2 className="text-3xl font-bold text-green-600">
            {stats.teachers || 0}
          </h2>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 border">
          <p className="text-gray-500 text-sm">Parents</p>
          <h2 className="text-3xl font-bold text-blue-600">
            {stats.parents || 0}
          </h2>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6 border">
          <p className="text-gray-500 text-sm">Avg Attendance</p>
          <h2 className="text-3xl font-bold text-orange-600">
            {Math.round(stats.average_attendance || 0)}%
          </h2>
        </div>

      </div>

      {/* ========================
          CHART SECTION
      ======================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Students */}

        <div className="bg-white shadow-sm rounded-xl p-6 border">

          <h2 className="text-lg font-semibold mb-4">
            Top Students Performance
          </h2>

          <div className="h-80">

            <ResponsiveContainer>

              <BarChart data={stats.top_students || []}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="full_name" tick={{ fontSize: 12 }} />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="final_score"
                  fill="#6366f1"
                  radius={[6,6,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Class Performance */}

        <div className="bg-white shadow-sm rounded-xl p-6 border">

          <h2 className="text-lg font-semibold mb-4">
            Class Performance
          </h2>

          <div className="h-80">

            <ResponsiveContainer>

              <BarChart data={classPerformance || []}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="class" tick={{ fontSize: 12 }} />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="avg_score"
                  fill="#10b981"
                  radius={[6,6,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* ========================
          AI INSIGHTS
      ======================== */}

      <div className="bg-white shadow-sm rounded-xl p-6 border">

        <h2 className="text-lg font-semibold mb-4">
          AI Smart Insights
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">

          {insights.length === 0 && (
            <li>No insights available</li>
          )}

          {insights.map((i, index) => (
            <li key={index}>{i}</li>
          ))}

        </ul>

      </div>

    </div>

  </AdminLayout>

)

}

export default AdminDashboard