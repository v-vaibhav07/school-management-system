import { useNavigate } from "react-router-dom"
import AdminLayout from "../layouts/AdminLayout"
import { Megaphone, Users, School } from "lucide-react"

function Announcements() {

  const navigate = useNavigate()

  return (

    <AdminLayout>

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Announcements
        </h1>

        <p className="text-gray-500">
          Send announcements to students, teachers or specific classes
        </p>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* STUDENTS */}

          <div
            onClick={()=>navigate("/announcements/students")}
            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg cursor-pointer transition"
          >

            <Megaphone className="text-indigo-600 mb-3" size={28} />

            <h2 className="text-lg font-semibold">
              Student Announcement
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Send message to all students
            </p>

          </div>

          {/* CLASS */}

          <div
            onClick={()=>navigate("/announcements/class")}
            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg cursor-pointer transition"
          >

            <School className="text-green-600 mb-3" size={28} />

            <h2 className="text-lg font-semibold">
              Class Announcement
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Send message to specific class
            </p>

          </div>

          {/* TEACHERS */}

          <div
            onClick={()=>navigate("/announcements/teachers")}
            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg cursor-pointer transition"
          >

            <Users className="text-orange-600 mb-3" size={28} />

            <h2 className="text-lg font-semibold">
              Teacher Announcement
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Send message to all teachers
            </p>

          </div>

        </div>

      </div>

    </AdminLayout>

  )

}

export default Announcements


// import { Link } from "react-router-dom"
// import AdminLayout from "../layouts/AdminLayout"
// import { Megaphone, Users, GraduationCap } from "lucide-react"

// function Announcements() {

//   const cards = [
//     {
//       title: "All Students",
//       desc: "Send announcement to all students",
//       icon: Users,
//       link: "/announcements/students",
//       color: "bg-blue-600"
//     },
//     {
//       title: "Class Announcement",
//       desc: "Send announcement to specific class",
//       icon: Megaphone,
//       link: "/announcements/class",
//       color: "bg-indigo-600"
//     },
//     {
//       title: "Teachers",
//       desc: "Send announcement to all teachers",
//       icon: GraduationCap,
//       link: "/announcements/teachers",
//       color: "bg-green-600"
//     }
//   ]

//   return (

//     <AdminLayout>

//       <div className="p-6 space-y-6">

//         <h1 className="text-3xl font-bold text-gray-800">
//           Announcements
//         </h1>

//         <p className="text-gray-500">
//           Send announcements to students, classes or teachers
//         </p>

//         {/* Cards */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {cards.map((card, index) => {

//             const Icon = card.icon

//             return (

//               <Link
//                 key={index}
//                 to={card.link}
//                 className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
//               >

//                 <div>

//                   <div
//                     className={`${card.color} w-12 h-12 flex items-center justify-center rounded-lg text-white mb-4`}
//                   >
//                     <Icon size={22} />
//                   </div>

//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {card.title}
//                   </h2>

//                   <p className="text-gray-500 text-sm mt-2">
//                     {card.desc}
//                   </p>

//                 </div>

//                 <button
//                   className="mt-6 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
//                 >
//                   Open
//                 </button>

//               </Link>

//             )

//           })}

//         </div>

//       </div>

//     </AdminLayout>

//   )

// }

// export default Announcements



















// import { Link } from "react-router-dom"
// import AdminLayout from "../layouts/AdminLayout"
// import { Users, School, GraduationCap } from "lucide-react"

// function Announcements() {

//   return (

//     <AdminLayout>

//       <div className="p-6">

//         {/* Header */}

//         <div className="mb-8">

//           <h1 className="text-3xl font-bold text-gray-800">
//             Announcements
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Send announcements to students, teachers or specific class
//           </p>

//         </div>


//         {/* 3 Cards */}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {/* STUDENT CARD */}

//           <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between">

//             <div>

//               <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
//                 <Users size={22} />
//               </div>

//               <h2 className="text-xl font-semibold">
//                 All Students
//               </h2>

//               <p className="text-gray-500 text-sm mt-2">
//                 Send announcement to all students in the school
//               </p>

//             </div>

//             <Link
//               to="/announcements/students"
//               className="mt-6 bg-blue-600 text-white py-2 text-center rounded-lg hover:bg-blue-700"
//             >
//               Open
//             </Link>

//           </div>


//           {/* CLASS CARD */}

//           <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between">

//             <div>

//               <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
//                 <School size={22} />
//               </div>

//               <h2 className="text-xl font-semibold">
//                 Class Announcement
//               </h2>

//               <p className="text-gray-500 text-sm mt-2">
//                 Send announcement to a specific class
//               </p>

//             </div>

//             <Link
//               to="/announcements/class"
//               className="mt-6 bg-indigo-600 text-white py-2 text-center rounded-lg hover:bg-indigo-700"
//             >
//               Open
//             </Link>

//           </div>


//           {/* TEACHER CARD */}

//           <div className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between">

//             <div>

//               <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
//                 <GraduationCap size={22} />
//               </div>

//               <h2 className="text-xl font-semibold">
//                 Teachers
//               </h2>

//               <p className="text-gray-500 text-sm mt-2">
//                 Send announcement to all teachers
//               </p>

//             </div>

//             <Link
//               to="/announcements/teachers"
//               className="mt-6 bg-green-600 text-white py-2 text-center rounded-lg hover:bg-green-700"
//             >
//               Open
//             </Link>

//           </div>

//         </div>

//       </div>

//     </AdminLayout>

//   )

// }

// export default Announcements