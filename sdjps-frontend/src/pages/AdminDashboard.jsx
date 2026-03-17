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
























// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer
// } from "recharts"

// function AdminDashboard() {

//   const [stats, setStats] = useState(null)
//   const [classPerformance, setClassPerformance] = useState([])
//   const [insights, setInsights] = useState([])

//   const fetchDashboard = async () => {

//     try {

//       const res = await API.get("/analytics/dashboard")
//       setStats(res.data)

//       const perf = await API.get("/analytics/class-performance")
//       setClassPerformance(perf.data)

//       const insightRes = await API.get("/analytics/insights")
//       setInsights(insightRes.data.insights)

//     } catch (error) {

//       console.log("Dashboard error", error)

//     }

//   }

//   useEffect(() => {
//     fetchDashboard()
//   }, [])

//   if (!stats)
//     return <p className="p-6 text-gray-500">Loading dashboard...</p>

// return (

//   <AdminLayout>

//     <div className="space-y-8">

//       {/* Header */}

//       <div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           Admin Analytics Dashboard
//         </h1>
//         <p className="text-gray-500 text-sm">
//           School performance and analytics overview
//         </p>
//       </div>

//       {/* ========================
//           STAT CARDS
//       ======================== */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         <div className="bg-white shadow-sm rounded-xl p-6 border">
//           <p className="text-gray-500 text-sm">Students</p>
//           <h2 className="text-3xl font-bold text-indigo-600">
//             {stats.students || 0}
//           </h2>
//         </div>

//         <div className="bg-white shadow-sm rounded-xl p-6 border">
//           <p className="text-gray-500 text-sm">Teachers</p>
//           <h2 className="text-3xl font-bold text-green-600">
//             {stats.teachers || 0}
//           </h2>
//         </div>

//         <div className="bg-white shadow-sm rounded-xl p-6 border">
//           <p className="text-gray-500 text-sm">Parents</p>
//           <h2 className="text-3xl font-bold text-blue-600">
//             {stats.parents || 0}
//           </h2>
//         </div>

//         <div className="bg-white shadow-sm rounded-xl p-6 border">
//           <p className="text-gray-500 text-sm">Avg Attendance</p>
//           <h2 className="text-3xl font-bold text-orange-600">
//             {Math.round(stats.average_attendance || 0)}%
//           </h2>
//         </div>

//       </div>

//       {/* ========================
//           CHART SECTION
//       ======================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Top Students */}

//         <div className="bg-white shadow-sm rounded-xl p-6 border">

//           <h2 className="text-lg font-semibold mb-4">
//             Top Students Performance
//           </h2>

//           <div className="h-80">

//             <ResponsiveContainer>

//               <BarChart data={stats.top_students || []}>

//                 <CartesianGrid strokeDasharray="3 3" />

//                 <XAxis dataKey="full_name" tick={{ fontSize: 12 }} />

//                 <YAxis />

//                 <Tooltip />

//                 <Bar
//                   dataKey="final_score"
//                   fill="#6366f1"
//                   radius={[6,6,0,0]}
//                 />

//               </BarChart>

//             </ResponsiveContainer>

//           </div>

//         </div>

//         {/* Class Performance */}

//         <div className="bg-white shadow-sm rounded-xl p-6 border">

//           <h2 className="text-lg font-semibold mb-4">
//             Class Performance
//           </h2>

//           <div className="h-80">

//             <ResponsiveContainer>

//               <BarChart data={classPerformance || []}>

//                 <CartesianGrid strokeDasharray="3 3" />

//                 <XAxis dataKey="class" tick={{ fontSize: 12 }} />

//                 <YAxis />

//                 <Tooltip />

//                 <Bar
//                   dataKey="avg_score"
//                   fill="#10b981"
//                   radius={[6,6,0,0]}
//                 />

//               </BarChart>

//             </ResponsiveContainer>

//           </div>

//         </div>

//       </div>

//       {/* ========================
//           AI INSIGHTS
//       ======================== */}

//       <div className="bg-white shadow-sm rounded-xl p-6 border">

//         <h2 className="text-lg font-semibold mb-4">
//           AI Smart Insights
//         </h2>

//         <ul className="list-disc pl-6 space-y-2 text-gray-700">

//           {insights.length === 0 && (
//             <li>No insights available</li>
//           )}

//           {insights.map((i, index) => (
//             <li key={index}>{i}</li>
//           ))}

//         </ul>

//       </div>

//     </div>

//   </AdminLayout>

// )

// }

// export default AdminDashboard















//ye uper wala niche se replace h









import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell
} from "recharts"
import {
  Users, GraduationCap, UserCheck, CalendarCheck,
  TrendingUp, Sparkles, AlertCircle, ChevronRight
} from "lucide-react"

/* ── tiny helpers ── */
const pulse = `
  @keyframes shimmer {
    0% { background-position: -400px 0 }
    100% { background-position: 400px 0 }
  }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px) }
    to   { opacity:1; transform:translateY(0) }
  }
  @keyframes scaleIn {
    from { opacity:0; transform:scale(0.96) }
    to   { opacity:1; transform:scale(1) }
  }
  .fade-up  { animation: fadeUp  0.45s ease both }
  .scale-in { animation: scaleIn 0.4s  ease both }
  .shimmer-bg {
    background: linear-gradient(90deg,#f0f0f8 25%,#e8e8f4 50%,#f0f0f8 75%);
    background-size: 800px 100%;
    animation: shimmer 1.4s infinite;
  }
`

const STAT_CARDS = [
  {
    key: "students",
    label: "Total Students",
    icon: Users,
    color: "#6366f1",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.18)",
    delay: "0ms",
  },
  {
    key: "teachers",
    label: "Teachers",
    icon: GraduationCap,
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.18)",
    delay: "80ms",
  },
  {
    key: "parents",
    label: "Parents",
    icon: UserCheck,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.18)",
    delay: "160ms",
  },
  {
    key: "average_attendance",
    label: "Avg Attendance",
    icon: CalendarCheck,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.18)",
    suffix: "%",
    round: true,
    delay: "240ms",
  },
]

/* ── custom tooltip ── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: "#1e2340",
      border: "1px solid rgba(99,102,241,0.3)",
      borderRadius: 10,
      padding: "10px 14px",
      color: "#e2e8f0",
      fontSize: 13,
    }}>
      <p style={{ color: "#94a3b8", marginBottom: 4, fontSize: 11 }}>{label}</p>
      <p style={{ fontWeight: 700, color: "#a5b4fc" }}>{payload[0].value}</p>
    </div>
  )
}

/* ── skeleton card ── */
function SkeletonCard() {
  return (
    <div className="shimmer-bg" style={{
      borderRadius: 16, height: 110,
      border: "1px solid rgba(99,102,241,0.1)"
    }} />
  )
}

/* ── main component ── */
function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [classPerformance, setClassPerformance] = useState([])
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [res, perf, insightRes] = await Promise.all([
          API.get("/analytics/dashboard"),
          API.get("/analytics/class-performance"),
          API.get("/analytics/insights"),
        ])
        setStats(res.data)
        setClassPerformance(perf.data)
        setInsights(insightRes.data.insights)
      } catch (err) {
        console.error("Dashboard error", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const studentColors = ["#6366f1","#818cf8","#a5b4fc","#c7d2fe","#4f46e5"]
  const classColors   = ["#10b981","#34d399","#6ee7b7","#059669","#047857"]

  return (
    <AdminLayout>
      <style>{pulse}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div className="fade-up" style={{ marginBottom: 32, animationDelay: "0ms" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 4, height: 28, borderRadius: 4,
              background: "linear-gradient(180deg,#6366f1,#a78bfa)"
            }} />
            <h1 style={{
              fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
              fontWeight: 800,
              color: "#1e2340",
              letterSpacing: "-0.5px",
              margin: 0
            }}>
              Admin Analytics Dashboard
            </h1>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 14, marginLeft: 14 }}>
            School performance and analytics overview
          </p>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 18,
          marginBottom: 28,
        }}>
          {loading
            ? [1,2,3,4].map(i => <SkeletonCard key={i} />)
            : STAT_CARDS.map((card) => {
                const Icon = card.icon
                const raw = stats?.[card.key] ?? 0
                const value = card.round ? Math.round(raw) : raw
                return (
                  <div
                    key={card.key}
                    className="fade-up"
                    style={{
                      animationDelay: card.delay,
                      background: "#fff",
                      borderRadius: 16,
                      padding: "22px 22px 18px",
                      border: `1px solid ${card.border}`,
                      boxShadow: `0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px ${card.border}`,
                      position: "relative",
                      overflow: "hidden",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "default",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-3px)"
                      e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px ${card.border}`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = `0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px ${card.border}`
                    }}
                  >
                    {/* bg circle */}
                    <div style={{
                      position: "absolute", top: -20, right: -20,
                      width: 90, height: 90, borderRadius: "50%",
                      background: card.bg,
                    }} />

                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: card.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 14,
                    }}>
                      <Icon size={18} color={card.color} />
                    </div>

                    <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>
                      {card.label}
                    </p>
                    <p style={{
                      fontSize: "clamp(1.6rem, 4vw, 2rem)",
                      fontWeight: 800,
                      color: card.color,
                      lineHeight: 1,
                      letterSpacing: "-1px"
                    }}>
                      {value}{card.suffix || ""}
                    </p>
                  </div>
                )
              })
          }
        </div>

        {/* ── Charts ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
          marginBottom: 24,
        }}>

          {/* Top Students */}
          <div className="scale-in" style={{
            animationDelay: "200ms",
            background: "#fff",
            borderRadius: 18,
            padding: "24px 24px 16px",
            border: "1px solid rgba(99,102,241,0.12)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1e2340", margin: 0 }}>
                  Top Students
                </h2>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>Performance scores</p>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "rgba(99,102,241,0.08)", borderRadius: 8,
                padding: "5px 10px", fontSize: 12, color: "#6366f1", fontWeight: 600
              }}>
                <TrendingUp size={13} />
                Final Score
              </div>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.top_students || []} barSize={28}>
                  <defs>
                    {studentColors.map((c, i) => (
                      <linearGradient key={i} id={`sg${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={c} stopOpacity={1} />
                        <stop offset="100%" stopColor={c} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.07)" vertical={false} />
                  <XAxis dataKey="full_name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
                  <Bar dataKey="final_score" radius={[8, 8, 0, 0]}>
                    {(stats?.top_students || []).map((_, i) => (
                      <Cell key={i} fill={`url(#sg${i % studentColors.length})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Class Performance */}
          <div className="scale-in" style={{
            animationDelay: "300ms",
            background: "#fff",
            borderRadius: 18,
            padding: "24px 24px 16px",
            border: "1px solid rgba(16,185,129,0.12)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1e2340", margin: 0 }}>
                  Class Performance
                </h2>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>Average class scores</p>
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "rgba(16,185,129,0.08)", borderRadius: 8,
                padding: "5px 10px", fontSize: 12, color: "#10b981", fontWeight: 600
              }}>
                <TrendingUp size={13} />
                Avg Score
              </div>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={classPerformance || []} barSize={28}>
                  <defs>
                    {classColors.map((c, i) => (
                      <linearGradient key={i} id={`cg${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={c} stopOpacity={1} />
                        <stop offset="100%" stopColor={c} stopOpacity={0.55} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.07)" vertical={false} />
                  <XAxis dataKey="class" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(16,185,129,0.05)" }} />
                  <Bar dataKey="avg_score" radius={[8, 8, 0, 0]}>
                    {(classPerformance || []).map((_, i) => (
                      <Cell key={i} fill={`url(#cg${i % classColors.length})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── AI Insights ── */}
        <div className="fade-up" style={{
          animationDelay: "350ms",
          background: "linear-gradient(135deg, #fefeff 0%, #f5f3ff 100%)",
          borderRadius: 18,
          padding: "24px 28px",
          border: "1px solid rgba(99,102,241,0.15)",
          boxShadow: "0 2px 20px rgba(99,102,241,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg,#6366f1,#a78bfa)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <Sparkles size={16} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1e2340", margin: 0 }}>
                AI Smart Insights
              </h2>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>
                Powered by school analytics
              </p>
            </div>
          </div>

          {insights.length === 0 ? (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              color: "#94a3b8", fontSize: 13, padding: "12px 0"
            }}>
              <AlertCircle size={16} />
              No insights available yet
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="fade-up"
                  style={{
                    animationDelay: `${400 + index * 60}ms`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "13px 16px",
                    background: "#fff",
                    borderRadius: 12,
                    border: "1px solid rgba(99,102,241,0.1)",
                    boxShadow: "0 1px 6px rgba(99,102,241,0.05)",
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                    background: `rgba(99,102,241,${0.08 + (index * 0.02)})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#6366f1"
                  }}>
                    {index + 1}
                  </div>
                  <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.6, margin: 0, flex: 1 }}>
                    {insight}
                  </p>
                  <ChevronRight size={14} color="#c7d2fe" style={{ flexShrink: 0, marginTop: 2 }} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  )
}

export default AdminDashboard