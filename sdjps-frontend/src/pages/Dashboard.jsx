import { useEffect, useState } from "react"
import API from "../services/api"

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

  if (!stats) return <p className="p-6">Loading dashboard...</p>

  return (

    <div className="p-6 w-full min-h-screen bg-gray-50">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Admin Analytics Dashboard
      </h1>

      {/* ========================
         STAT CARDS
      ======================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500">Students</p>
          <h2 className="text-3xl font-bold">
            {stats.students || 0}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500">Teachers</p>
          <h2 className="text-3xl font-bold">
            {stats.teachers || 0}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500">Parents</p>
          <h2 className="text-3xl font-bold">
            {stats.parents || 0}
          </h2>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500">Avg Attendance</p>
          <h2 className="text-3xl font-bold">
            {Math.round(stats.average_attendance || 0)}%
          </h2>
        </div>

      </div>


      {/* ========================
         CHART SECTION
      ======================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* TOP STUDENTS */}

        <div className="bg-white shadow-md rounded-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Top Students Performance
          </h2>

          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={stats.top_students || []}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="full_name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="final_score"
                  fill="#4f46e5"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* CLASS PERFORMANCE */}

        <div className="bg-white shadow-md rounded-lg p-6">

          <h2 className="text-xl font-bold mb-4">
            Class Performance
          </h2>

          <div className="w-full h-[350px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={classPerformance || []}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="class" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="avg_score"
                  fill="#10b981"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* ========================
         AI INSIGHTS
      ======================== */}

      <div className="bg-white shadow-md rounded-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          AI Smart Insights
        </h2>

        <ul className="list-disc pl-6 space-y-2">

          {insights.length === 0 && (
            <li>No insights available</li>
          )}

          {insights.map((i, index) => (
            <li key={index}>
              {i}
            </li>
          ))}

        </ul>

      </div>

    </div>

  )

}

export default AdminDashboard