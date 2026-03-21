// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { Link } from "react-router-dom"

// function TeacherDashboard() {

//     const [classes, setClasses] = useState([])

//     const fetchClasses = async () => {

//         try {

//             const res = await API.get("/classes")
//             setClasses(res.data)

//         } catch (error) {

//             console.log("Error loading classes", error)

//         }

//     }

//     useEffect(() => {

//         fetchClasses()

//     }, [])

//     return (

//         <div className="p-6">

//             <h1 className="text-3xl font-bold mb-6">
//                 Teacher Dashboard
//             </h1>

//             <div className="grid grid-cols-3 gap-6">

//                 {classes.map((cls) => (

//                     <div
//                         key={cls.id}
//                         className="bg-white shadow rounded p-4"
//                     >

//                         <h2 className="text-xl font-bold">
//                             Class {cls.class_name} {cls.section}
//                         </h2>

//                         <p className="text-gray-500 mb-4">
//                             Academic Year: {cls.academic_year}
//                         </p>

//                         <div className="flex flex-col gap-2">

//                             <Link to={`/teacher/class/${cls.id}/attendance`}>
//                                 Mark Attendance
//                             </Link>

//                             <Link to={`/teacher/class/${cls.id}/marks`}>
//                                 Upload Marks
//                             </Link>

//                             <Link to={`/teacher/class/${cls.id}/chat`}>
//                                 Class Chat
//                             </Link>

//                             <Link to={`/teacher/class/${cls.id}/homework`}>
//                                 Post Homework
//                             </Link>

//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>

//     )

// }

// export default TeacherDashboard


// import { useState } from "react"
// import { Outlet } from "react-router-dom"
// import TeacherSidebar from "../components/TeacherSidebar"
// import TeacherNavbar from "../components/TeacherNavbar"

// function TeacherLayout() {

//   const [open, setOpen] = useState(true)

//   return (
//     <div className="flex">

//       {/* Sidebar */}
//       <TeacherSidebar open={open} setOpen={setOpen} />

//       {/* Main Section */}
//       <div className="flex-1 flex flex-col">

//         {/* Navbar */}
//         <TeacherNavbar toggleSidebar={() => setOpen(!open)} />

//         {/* Content */}
//         <div className="bg-gray-100 min-h-screen p-6">
//           <Outlet />
//         </div>

//       </div>

//     </div>
//   )
// }

// export default TeacherLayout

// import { useEffect, useState } from "react"
// import API from "../services/api"
// import { useNavigate } from "react-router-dom"

// function TeacherDashboard() {

//   const [myClass, setMyClass] = useState(null)
//   const navigate = useNavigate()

//   const [monthlyData, setMonthlyData] = useState(null)
//   const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))

//   const fetchClass = async () => {
//     try {
//       const res = await API.get("/teacher/my-class")
//       setMyClass(res.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const fetchMonthly = async () => {
//   try {
//     const res = await API.get(`/teacher/attendance/monthly/${myClass.id}?month=${month}`)
//     setMonthlyData(res.data)
//   } catch (err) {
//     console.log(err)
//   }
// }
//   useEffect(() => {
//     fetchClass()
//   }, [])

//   useEffect(() => {
//   if (myClass) fetchMonthly()
// }, [myClass, month])

//   return (

//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Teacher Dashboard
//       </h1>

//       {/* CLASS CARD */}
//       {myClass && (
//         <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-3 w-full md:w-[400px]">

//           <h2 className="text-xl font-bold">
//             Class {myClass.class_name} {myClass.section}
//           </h2>

//           <p className="text-gray-500">
//             Academic Year: {myClass.academic_year}
//           </p>

//           <p>
//             👨‍🎓 Students: {myClass.student_count || 0}
//           </p>

//           <p>
//             👑 Monitor: {myClass.monitor_student || "Not Assigned"}
//           </p>

//           <button
//             onClick={() => navigate(`/teacher/class/${myClass.id}`)}
//             className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//           >
//             Open Class
//           </button>

//           <button
//   onClick={() => navigate(`/teacher/class/${myClass.id}/attendance`)}
//   className="bg-green-600 text-white px-4 py-2 rounded-lg"
// >
//   Mark Attendance
// </button>

//         </div>
//       )}

//     </div>



//   )
// }

// export default TeacherDashboard

import { useEffect, useState } from "react"
import API from "../services/api"
import { useNavigate } from "react-router-dom"

function TeacherDashboard() {

    const [myClass, setMyClass] = useState(null)
    const [monthlyData, setMonthlyData] = useState(null)
    const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
    const [todayData, setTodayData] = useState(null)
    const [todos, setTodos] = useState([])
    const [text, setText] = useState("")
    const navigate = useNavigate()

    const fetchClass = async () => {
        try {
            const res = await API.get("/teacher/my-class")
            setMyClass(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchMonthly = async () => {
        try {
            if (!myClass) return

            const res = await API.get(
                `/teacher/attendance/monthly/${myClass.id}?month=${month}`
            )

            setMonthlyData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchToday = async () => {
        try {
            const res = await API.get(`/teacher/attendance/today/${myClass.id}`)
            setTodayData(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchTodos = async () => {
        try {
            const res = await API.get("/teacher/todos")
            setTodos(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const addTodo = async () => {
        try {
            if (!text) return

            await API.post("/teacher/todos", { text })

            setText("")      // clear input
            fetchTodos()     // refresh list

        } catch (err) {
            console.log(err)
        }
    }

    const toggleTodo = async (id) => {
  try {
    await API.put(`/teacher/todos/${id}`)
    fetchTodos()
  } catch (err) {
    console.log(err)
  }
}

    const deleteTodo = async (id) => {
  try {
    await API.delete(`/teacher/todos/${id}`)
    setTodos(prev => prev.filter(t => t.id !== id)) // instant UI update 🔥
  } catch (err) {
    console.log(err)
  }
}


    useEffect(() => {
        fetchClass()
    }, [])

    useEffect(() => {
        if (myClass) fetchMonthly()
    }, [myClass, month])

    useEffect(() => {
        if (myClass) fetchToday()
    }, [myClass])

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Teacher Dashboard
            </h1>

            {/* WRAPPER */}
            <div className="flex flex-wrap gap-6">

                {/* CLASS CARD */}
                {myClass && (
                    <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-3 w-full md:w-[400px]">

                        <h2 className="text-xl font-bold">
                            Class {myClass.class_name} {myClass.section}
                        </h2>

                        <p className="text-gray-500">
                            Academic Year: {myClass.academic_year}
                        </p>

                        <p>👨‍🎓 Students: {myClass.student_count || 0}</p>

                        <p>👑 Monitor: {myClass.monitor_student || "Not Assigned"}</p>

                        <button
                            onClick={() => navigate(`/teacher/class/${myClass.id}`)}
                            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                        >
                            Open Class
                        </button>

                        <button
                            onClick={() => navigate(`/teacher/class/${myClass.id}/attendance`)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                            Mark Attendance
                        </button>

                    </div>
                )}

                {todayData && (
                    <div className="bg-white shadow rounded-xl p-5 w-full md:w-[400px]">

                        <h2 className="text-lg font-semibold mb-4">
                            Today's Attendance
                        </h2>

                        <div className="grid grid-cols-3 gap-4 text-center">

                            <div className="bg-green-100 p-3 rounded">
                                <p className="text-sm">Present</p>
                                <h3 className="font-bold text-green-700">
                                    {todayData.present}
                                </h3>
                            </div>

                            <div className="bg-red-100 p-3 rounded">
                                <p className="text-sm">Absent</p>
                                <h3 className="font-bold text-red-700">
                                    {todayData.absent}
                                </h3>
                            </div>

                            <div className="bg-blue-100 p-3 rounded">
                                <p className="text-sm">%</p>
                                <h3 className="font-bold text-blue-700">
                                    {todayData.percentage}%
                                </h3>
                            </div>

                        </div>
                        <button
  onClick={() => navigate(`/teacher/attendance/today/${myClass.id}`)}
  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
>
  View Details
</button>

                    </div>
                )}

                {/* MONTHLY CARD */}
                {monthlyData && (
                    <div className="bg-white shadow rounded-xl p-5 w-full md:w-[400px]">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">
                                Monthly Attendance
                            </h2>

                            <input
                                type="month"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="border px-2 py-1 rounded"
                            />
                        </div>

                        <div className="space-y-2">

                            <p>✅ Present: {monthlyData.present}</p>
                            <p>❌ Absent: {monthlyData.absent}</p>
                            <p>📊 Total: {monthlyData.total}</p>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                                <div
                                    className="bg-green-500 h-3 rounded-full"
                                    style={{ width: `${monthlyData.percentage}%` }}
                                ></div>
                            </div>

                            <p className="text-center font-bold mt-2 text-green-600">
                                {monthlyData.percentage}%
                            </p>

                        </div>
                        <button
  onClick={() => navigate(`/teacher/attendance/monthly/${myClass.id}?month=${month}`)}
  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
>
  View Full Month
</button>

                    </div>
                )}

<div className="bg-white shadow rounded-xl p-5 w-full min-h-[350px]">

    <h2 className="text-lg font-semibold mb-4">
      📝 To Do
    </h2>

    <input
      type="text"
      placeholder="Write note..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="border p-2 w-full rounded mb-3"
    />

    <button
      onClick={addTodo}
      className="bg-indigo-600 text-white px-4 py-1 rounded"
    >
      Add
    </button>

 <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto">

  {todos.map((t) => (

    <div
      key={t.id}
      className={`flex justify-between items-center p-3 rounded-lg border 
      ${t.completed ? "bg-gray-100 opacity-70" : "bg-white"}`}
    >

      {/* TEXT */}
      <p
        className={`text-sm 
        ${t.completed ? "line-through text-gray-500" : ""}`}
      >
        {t.text}
      </p>

      {/* DONE BUTTON */}
<button
  onClick={() => deleteTodo(t.id)}
  className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-600 text-white hover:scale-105 transition"
>
  ✔
</button>
      

    </div>

  ))}

</div>

                </div>

            </div>

        </div>
    )
}

export default TeacherDashboard