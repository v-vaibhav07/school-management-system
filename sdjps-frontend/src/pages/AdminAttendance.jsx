// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"

// function AdminAttendance() {

//   const [classes, setClasses] = useState([])
//   const [selectedClass, setSelectedClass] = useState("")
//   const [overview, setOverview] = useState(null)
//   const [students, setStudents] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const fetchData = async () => {

//     const cls = await API.get("/classes")
//     setClasses(cls.data)

//     const ov = await API.get("/admin/attendance/overview")
//     setOverview(ov.data)

//   }

//   const fetchClassAttendance = async (id) => {

//     const res = await API.get(`/admin/attendance/class/${id}`)
//     setStudents(res.data)

//   }

//   const fetchTeachers = async () => {

//     const res = await API.get("/admin/attendance/teachers")
//     setTeachers(res.data)

//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   return (

//     <AdminLayout>

//       <div className="space-y-6">

//         <h1 className="text-2xl font-bold">Attendance Analytics</h1>

//         {/* TOP CARDS */}

//         <div className="grid md:grid-cols-3 gap-6">

//           {/* CLASS SELECT */}

//           <div className="bg-white p-6 rounded-xl shadow border">

//             <h2 className="font-semibold mb-2">
//               All Classes
//             </h2>

//             <select
//               className="border p-2 w-full rounded"
//               onChange={(e)=>{
//                 setSelectedClass(e.target.value)
//                 fetchClassAttendance(e.target.value)
//               }}
//             >

//               <option>Select Class</option>

//               {classes.map(c=>(
//                 <option key={c.id} value={c.id}>
//                   {c.class_name}-{c.section}
//                 </option>
//               ))}

//             </select>

//           </div>

//           {/* OVERALL STUDENT ATTENDANCE */}

//           <div className="bg-white p-6 rounded-xl shadow border">

//             <h2 className="font-semibold">
//               Overall Student Attendance
//             </h2>

//             {overview && (

//               <>
//                 <p className="text-4xl font-bold text-indigo-600">
//                   {overview.percentage}%
//                 </p>

//                 <p className="text-gray-500">
//                   {overview.present} / {overview.total}
//                 </p>
//               </>
//             )}

//           </div>

//           {/* TEACHER ATTENDANCE */}

//           <div className="bg-white p-6 rounded-xl shadow border">

//             <h2 className="font-semibold">
//               Teacher Attendance
//             </h2>

//             <button
//               className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
//               onClick={fetchTeachers}
//             >
//               View All Teachers
//             </button>

//           </div>

//         </div>

//         {/* STUDENT TABLE */}

//         {students.length > 0 && (

//           <div className="bg-white rounded-xl shadow border p-6">

//             <h2 className="font-semibold mb-4">
//               Class Attendance
//             </h2>

//             <table className="w-full">

//               <thead>

//                 <tr className="border-b">

//                   <th className="text-left p-2">Student</th>

//                   <th className="text-left p-2">Attendance %</th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {students.map(s=>(
//                   <tr key={s.student_id} className="border-b">

//                     <td className="p-2">
//                       {s.full_name}
//                     </td>

//                     <td className="p-2">
//                       {s.attendance_percentage}%
//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>

//         )}

//         {/* TEACHERS */}

//         {teachers.length > 0 && (

//           <div className="bg-white rounded-xl shadow border p-6">

//             <h2 className="font-semibold mb-4">
//               Teachers Attendance
//             </h2>

//             <table className="w-full">

//               <thead>

//                 <tr className="border-b">

//                   <th className="text-left p-2">Teacher</th>

//                   <th className="text-left p-2">Attendance %</th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {teachers.map(t=>(
//                   <tr key={t.id} className="border-b">

//                     <td className="p-2">
//                       {t.full_name}
//                     </td>

//                     <td className="p-2">
//                       {t.percentage}%
//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>

//         )}

//       </div>

//     </AdminLayout>

//   )

// }

// export default AdminAttendance














import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import {
  Users, GraduationCap, ChevronDown,
  TrendingUp, Eye, AlertTriangle, CheckCircle2
} from "lucide-react"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(14px) }
    to   { opacity:1; transform:translateY(0) }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0 }
    100% { background-position:  600px 0 }
  }
  .fade-up { animation: fadeUp 0.4s ease both }
  .shimmer {
    background: linear-gradient(90deg,#f1f5ff 25%,#e8eeff 50%,#f1f5ff 75%);
    background-size: 600px 100%;
    animation: shimmer 1.4s infinite;
    border-radius: 12px;
  }
  .att-select {
    width: 100%; padding: 10px 38px 10px 14px;
    border: 1.5px solid rgba(99,102,241,0.18);
    border-radius: 10px; font-size: 13.5px;
    color: #374151; background: #fff;
    appearance: none; outline: none;
    font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: border 0.2s, box-shadow 0.2s;
  }
  .att-select:focus {
    border-color: rgba(99,102,241,0.5);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.09);
  }
  .view-btn {
    display: flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg,#6366f1,#818cf8);
    color: #fff; border: none; border-radius: 10px;
    padding: 10px 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    box-shadow: 0 2px 12px rgba(99,102,241,0.3);
    transition: transform 0.15s, box-shadow 0.15s;
    white-space: nowrap;
  }
  .view-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 18px rgba(99,102,241,0.45);
  }
  .view-btn:active { transform: scale(0.97); }
  .att-table { width: 100%; border-collapse: collapse; }
  .att-table th {
    font-size: 11px; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.6px; color: #94a3b8;
    padding: 10px 16px; text-align: left;
    background: rgba(99,102,241,0.04);
    border-bottom: 1px solid rgba(99,102,241,0.1);
  }
  .att-table td {
    padding: 13px 16px; font-size: 13.5px;
    color: #374151; border-bottom: 1px solid rgba(99,102,241,0.07);
  }
  .att-table tr:last-child td { border-bottom: none }
  .att-table tbody tr { transition: background 0.15s }
  .att-table tbody tr:hover { background: rgba(99,102,241,0.03) }
  .progress-track {
    height: 6px; border-radius: 99px;
    background: rgba(99,102,241,0.1); overflow: hidden;
    min-width: 80px;
  }
  .progress-fill {
    height: 100%; border-radius: 99px;
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
  }
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 9px; border-radius: 99px;
    font-size: 11.5px; font-weight: 600;
  }
  @media (max-width: 640px) {
    .hide-sm { display: none !important }
    .att-table th, .att-table td { padding: 10px 10px }
  }
`

/* ── helpers ── */
function getColor(pct) {
  if (pct >= 85) return { fill: "#10b981", bg: "rgba(16,185,129,0.1)", text: "#065f46" }
  if (pct >= 70) return { fill: "#f59e0b", bg: "rgba(245,158,11,0.1)", text: "#92400e" }
  return { fill: "#ef4444", bg: "rgba(239,68,68,0.1)", text: "#991b1b" }
}

function AttendanceBadge({ pct }) {
  const c = getColor(pct)
  const Icon = pct >= 85 ? CheckCircle2 : AlertTriangle
  return (
    <span className="badge" style={{ background: c.bg, color: c.text }}>
      <Icon size={11} />
      {pct >= 85 ? "Good" : pct >= 70 ? "Average" : "Low"}
    </span>
  )
}

function ProgressBar({ pct }) {
  const c = getColor(pct)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div className="progress-track" style={{ flex: 1 }}>
        <div className="progress-fill" style={{ width: `${pct}%`, background: c.fill }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#374151", minWidth: 38 }}>
        {pct}%
      </span>
    </div>
  )
}

function Card({ children, style = {}, delay = "0ms", accent }) {
  return (
    <div
      className="fade-up"
      style={{
        animationDelay: delay,
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${accent || "rgba(99,102,241,0.12)"}`,
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        padding: "22px 24px",
        fontFamily: "'DM Sans', sans-serif",
        ...style
      }}
    >
      {children}
    </div>
  )
}

function SectionHeader({ icon: Icon, color, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <Icon size={17} color={color} />
      </div>
      <div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#1e2340", margin: 0 }}>{title}</p>
        {subtitle && <p style={{ fontSize: 11.5, color: "#94a3b8", margin: 0 }}>{subtitle}</p>}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════ */
function AdminAttendance() {
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [overview, setOverview] = useState(null)
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loadingOverview, setLoadingOverview] = useState(true)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [loadingTeachers, setLoadingTeachers] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cls, ov] = await Promise.all([
          API.get("/classes"),
          API.get("/admin/attendance/overview"),
        ])
        setClasses(cls.data)
        setOverview(ov.data)
      } finally {
        setLoadingOverview(false)
      }
    }
    fetchData()
  }, [])

  const fetchClassAttendance = async (id) => {
    if (!id) return
    setLoadingStudents(true)
    try {
      const res = await API.get(`/admin/attendance/class/${id}`)
      setStudents(res.data)
    } finally {
      setLoadingStudents(false)
    }
  }

  const fetchTeachers = async () => {
    setLoadingTeachers(true)
    try {
      const res = await API.get("/admin/attendance/teachers")
      setTeachers(res.data)
    } finally {
      setLoadingTeachers(false)
    }
  }

  const ovPct = overview ? Math.round(overview.percentage) : 0
  const ovColor = getColor(ovPct)

  return (
    <AdminLayout>
      <style>{css}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Page Header ── */}
        <div className="fade-up" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 4, height: 26, borderRadius: 4,
              background: "linear-gradient(180deg,#6366f1,#a78bfa)"
            }} />
            <h1 style={{ fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, color: "#1e2340", margin: 0, letterSpacing: "-0.4px" }}>
              Attendance Analytics
            </h1>
          </div>
          <p style={{ color: "#94a3b8", fontSize: 13.5, marginLeft: 14 }}>
            Track and monitor student & teacher attendance records
          </p>
        </div>

        {/* ── Top 3 Cards ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
          marginBottom: 24,
        }}>

          {/* Class Selector */}
          <Card delay="0ms">
            <SectionHeader icon={Users} color="#6366f1" title="Select Class" subtitle="Filter attendance by class" />
            <div style={{ position: "relative" }}>
              <select
                className="att-select"
                value={selectedClass}
                onChange={e => {
                  setSelectedClass(e.target.value)
                  fetchClassAttendance(e.target.value)
                }}
              >
                <option value="">— Choose a class —</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.class_name} – {c.section}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} color="#94a3b8" style={{
                position: "absolute", right: 12, top: "50%",
                transform: "translateY(-50%)", pointerEvents: "none"
              }} />
            </div>
          </Card>

          {/* Overall Student Attendance */}
          <Card delay="80ms" accent={`${ovColor.fill}30`}>
            <SectionHeader icon={TrendingUp} color={ovColor.fill} title="Student Attendance" subtitle="Overall school average" />
            {loadingOverview ? (
              <div className="shimmer" style={{ height: 52 }} />
            ) : overview ? (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
                <span style={{
                  fontSize: "clamp(2rem,5vw,2.6rem)", fontWeight: 800,
                  color: ovColor.fill, letterSpacing: "-1.5px", lineHeight: 1
                }}>
                  {ovPct}%
                </span>
                <div style={{ paddingBottom: 4 }}>
                  <AttendanceBadge pct={ovPct} />
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: "4px 0 0" }}>
                    {overview.present} present / {overview.total} total
                  </p>
                </div>
              </div>
            ) : null}
          </Card>

          {/* Teacher Attendance */}
          <Card delay="160ms" accent="rgba(16,185,129,0.2)">
            <SectionHeader icon={GraduationCap} color="#10b981" title="Teacher Attendance" subtitle="View all teacher records" />
            <button className="view-btn" onClick={fetchTeachers} disabled={loadingTeachers}>
              <Eye size={15} />
              {loadingTeachers ? "Loading…" : "View All Teachers"}
            </button>
          </Card>

        </div>

        {/* ── Student Table ── */}
        {(loadingStudents || students.length > 0) && (
          <Card delay="0ms" style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
            <div style={{ padding: "20px 24px 12px" }}>
              <SectionHeader
                icon={Users} color="#6366f1"
                title="Class Attendance"
                subtitle={`${students.length} students · ${selectedClass ? classes.find(c => String(c.id) === String(selectedClass))?.class_name || "" : ""}`}
              />
            </div>

            {loadingStudents ? (
              <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[1,2,3,4].map(i => <div key={i} className="shimmer" style={{ height: 44 }} />)}
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="att-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Attendance</th>
                      <th className="hide-sm">Progress</th>
                      <th className="hide-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s, i) => {
                      const pct = Math.round(s.attendance_percentage)
                      return (
                        <tr key={s.student_id}>
                          <td style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12 }}>{i + 1}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                background: `rgba(99,102,241,${0.08 + (i * 0.015)})`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700, color: "#6366f1"
                              }}>
                                {s.full_name?.[0]?.toUpperCase()}
                              </div>
                              <span style={{ fontWeight: 500 }}>{s.full_name}</span>
                            </div>
                          </td>
                          <td style={{ fontWeight: 700, color: getColor(pct).fill }}>{pct}%</td>
                          <td className="hide-sm" style={{ minWidth: 140 }}>
                            <ProgressBar pct={pct} />
                          </td>
                          <td className="hide-sm">
                            <AttendanceBadge pct={pct} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

        {/* ── Teachers Table ── */}
        {(loadingTeachers || teachers.length > 0) && (
          <Card delay="0ms" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px 12px" }}>
              <SectionHeader
                icon={GraduationCap} color="#10b981"
                title="Teachers Attendance"
                subtitle={`${teachers.length} teachers on record`}
              />
            </div>

            {loadingTeachers ? (
              <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                {[1,2,3].map(i => <div key={i} className="shimmer" style={{ height: 44 }} />)}
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="att-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Teacher Name</th>
                      <th>Attendance</th>
                      <th className="hide-sm">Progress</th>
                      <th className="hide-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t, i) => {
                      const pct = Math.round(t.percentage)
                      return (
                        <tr key={t.id}>
                          <td style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12 }}>{i + 1}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{
                                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                background: `rgba(16,185,129,${0.1 + (i * 0.015)})`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 12, fontWeight: 700, color: "#10b981"
                              }}>
                                {t.full_name?.[0]?.toUpperCase()}
                              </div>
                              <span style={{ fontWeight: 500 }}>{t.full_name}</span>
                            </div>
                          </td>
                          <td style={{ fontWeight: 700, color: getColor(pct).fill }}>{pct}%</td>
                          <td className="hide-sm" style={{ minWidth: 140 }}>
                            <ProgressBar pct={pct} />
                          </td>
                          <td className="hide-sm">
                            <AttendanceBadge pct={pct} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}

      </div>
    </AdminLayout>
  )
}

export default AdminAttendance