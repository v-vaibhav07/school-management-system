// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

// import Dashboard from "./pages/Dashboard"
// import Students from "./pages/Students"
// import Classes from "./pages/Classes"
// import Teachers from "./pages/Teachers"
// import ClassStudents from "./pages/ClassStudents"
// import ClassAnnouncements from "./pages/ClassAnnouncements"
// import ClassChat from "./pages/ClassChat"
// import AdminDashboard from "./pages/AdminDashboard"
// import BusTracking from "./pages/BusTracking"
// import Notifications from "./components/Notifications"
// import ReportCard from "./pages/ReportCard"
// import TeacherDashboard from "./pages/TeacherDashboard"
// import TeacherAttendance from "./pages/TeacherAttendance"
// import TeacherMarks from "./pages/TeacherMarks"
// import TeacherHomework from "./pages/TeacherHomework"
// import StudentDashboard from "./pages/StudentDashboard"
// import StudentAttendance from "./pages/StudentAttendance"
// import StudentMarks from "./pages/StudentMarks"
// import Login from "./pages/Login"
// import ParentDashboard from "./pages/ParentDashboard"
// import ProtectedRoute from "./components/ProtectedRoute"

// function App() {
//   return (
//     <BrowserRouter>

//       <Routes>

//         {/* Default route */}
//         <Route path="/" element={<Navigate to="/dashboard" />} />

//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/students" element={<Students />} />
//         <Route path="/teachers" element={<Teachers />} />
//         <Route path="/classes" element={<Classes />} />
//         <Route path="/classes/:id" element={<ClassStudents />} />
//         <Route path="/classes/:id/announcements" element={<ClassAnnouncements />} />
//         <Route path="/classes/:id/chat" element={<ClassChat />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/transport" element={<BusTracking />} />
//         <Route path="/notifications" element={<Notifications />} />
//         <Route path="/report-card/:student_id" element={<ReportCard />} />
//         <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
//         <Route path="/teacher/class/:id/attendance" element={<TeacherAttendance />} />
//         <Route path="/teacher/class/:id/marks" element={<TeacherMarks />} />
//         <Route
//           path="/homework/class/:id"
//           element={<TeacherHomework />}
//         />
//         <Route path="/student/dashboard" element={<StudentDashboard />} />
//         <Route path="/student/attendance" element={<StudentAttendance />} />
//         <Route path="/student/marks" element={<StudentMarks />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/parent/dashboard" element={<ParentDashboard />} />
//       </Routes>

//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import AdminDashboard from "./pages/AdminDashboard"
import Students from "./pages/Students"
import Classes from "./pages/Classes"
import Teachers from "./pages/Teachers"
import ClassStudents from "./pages/ClassStudents"
import ClassAnnouncements from "./pages/ClassAnnouncements"
import ClassChat from "./pages/ClassChat"
import BusTracking from "./pages/BusTracking"
import Notifications from "./components/Notifications"
import ReportCard from "./pages/ReportCard"

import TeacherDashboard from "./pages/TeacherDashboard"
import TeacherAttendance from "./pages/TeacherAttendance"
import TeacherMarks from "./pages/TeacherMarks"
import TeacherHomework from "./pages/TeacherHomework"

import StudentDashboard from "./pages/StudentDashboard"
import StudentAttendance from "./pages/StudentAttendance"
import StudentMarks from "./pages/StudentMarks"

import ParentDashboard from "./pages/ParentDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"

import TeacherLayout from "./layouts/TeacherLayout"

import StudentProfile from "./pages/StudentProfile"
import ClassDetails from "./pages/ClassDetails"

import ProtectedRoute from "./components/ProtectedRoute"

import AdminAttendance from "./pages/AdminAttendance"

// Announcement pages
import Announcements from "./pages/Announcements"
import StudentAnnouncements from "./pages/StudentAnnouncements"
import TeacherAnnouncements from "./pages/TeacherAnnouncements"
import ClassAnnouncementsAdmin from "./pages/ClassAnnouncementsAdmin"

// 🔥 NEW
import AdminAnnouncements from "./pages/AdminAnnouncements"

// 🏆 LEADERBOARD
import LeaderboardClasses from "./pages/LeaderboardClasses"
import LeaderboardPage from "./pages/LeaderboardPage"

import AdminFeesDashboard from "./pages/AdminFeesDashboard"

import ClassFeesPage from "./pages/ClassFeesPage"

import TransportDashboard from "./pages/TransportDashboard"
import BusStudentsPage from "./pages/BusStudentsPage"

import AddBus from "./pages/AddBus"
import AddBusStudent from "./pages/AddBusStudent"

import ClassChats from "./pages/ClassChats"

import ClassChatRoom from "./pages/ClassChatRoom"

import TeacherClassStudents from "./pages/TeacherClassStudents"
import TeacherTodayAttendance from "./pages/TeacherTodayAttendance"
import TeacherMonthlyFull from "./pages/TeacherMonthlyFull"
import TeacherMyClasses from "./pages/TeacherMyClasses"
import TeacherAddHomework from "./pages/TeacherAddHomework"
import TeacherStudents from "./pages/TeacherStudents"
import TeacherMessages from "./pages/TeacherMessages"
import TeacherWithAllClassRoomChat from "./pages/TeacherWithAllClassRoomChat"
import TeacherViewAnnouncements from "./pages/TeacherViewAnnouncements"
import TeacherMarksDashboard from "./pages/TeacherMarksDashboard"
import TeacherMarksEntry from "./pages/TeacherMarksEntry"
import AdminCreateExam from "./pages/AdminCreateExam"
import AdminTeacherSalary from "./pages/AdminTeacherSalary"
import TeacherSalary from "./pages/TeacherSalary"
import AdminSalaryHistory from "./pages/AdminSalaryHistory"
import TeacherLeaderboardClasses from "./pages/TeacherLeaderboardClasses"
import TeacherLeaderboardPage from "./pages/TeacherLeaderboardPage"


function App() {

return (

<BrowserRouter>

<Routes>

{/* DEFAULT */}

<Route path="/" element={<Navigate to="/login" />} />

<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />


{/* ================= ADMIN ================= */}

<Route
path="/admin/dashboard"
element={
<ProtectedRoute role="admin">
<AdminDashboard />
</ProtectedRoute>
}
/>

<Route
path="/admin/attendance"
element={
<ProtectedRoute>
<AdminAttendance />
</ProtectedRoute>
}
/>

{/* NEW ADMIN ANNOUNCEMENTS */}

<Route
path="/admin/announcements"
element={
<ProtectedRoute>
<Announcements />
</ProtectedRoute>
}
/>


{/* ================= ANNOUNCEMENTS ================= */}

<Route
path="/announcements"
element={
<ProtectedRoute>
<Announcements />
</ProtectedRoute>
}
/>

<Route
path="/announcements/students"
element={
<ProtectedRoute>
<StudentAnnouncements />
</ProtectedRoute>
}
/>

<Route
path="/announcements/class"
element={
<ProtectedRoute>
<ClassAnnouncementsAdmin />
</ProtectedRoute>
}
/>

<Route
path="/announcements/teachers"
element={
<ProtectedRoute>
<TeacherAnnouncements />
</ProtectedRoute>
}
/>

<Route path="/admin/create-exam" element={<AdminCreateExam />} />

<Route
  path="/admin/teacher-salary"
  element={
    <ProtectedRoute>
      <AdminTeacherSalary />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/salary-history/:teacherId"
  element={
    <ProtectedRoute>
      <AdminSalaryHistory />
    </ProtectedRoute>
  }
/>
{/* ================= STUDENTS ================= */}

<Route
path="/students"
element={
<ProtectedRoute>
<Students />
</ProtectedRoute>
}
/>

<Route
path="/students/class/:id"
element={
<ProtectedRoute>
<ClassStudents />
</ProtectedRoute>
}
/>

<Route
path="/students/profile/:id"
element={
<ProtectedRoute>
<StudentProfile />
</ProtectedRoute>
}
/>


{/* ================= TEACHERS ================= */}

<Route
path="/teachers"
element={
<ProtectedRoute>
<Teachers />
</ProtectedRoute>
}
/>


{/* ================= CLASSES ================= */}

<Route
path="/classes"
element={
<ProtectedRoute>
<Classes />
</ProtectedRoute>
}
/>

<Route
path="/classes/:id"
element={
<ProtectedRoute>
<ClassDetails />
</ProtectedRoute>
}
/>

<Route
path="/classes/:id/announcements"
element={
<ProtectedRoute>
<ClassAnnouncements />
</ProtectedRoute>
}
/>

<Route
path="/classes/:id/chat"
element={
<ProtectedRoute>
<ClassChat />
</ProtectedRoute>
}
/>

{/* ✅ NEW CLASS CHATS PAGE */}
<Route
 path="/chats"
 element={
  <ProtectedRoute>
   <ClassChats />
  </ProtectedRoute>
 }
/>

<Route
 path="/class-chat/:class_id"
 element={
  <ProtectedRoute>
   <ClassChatRoom />
  </ProtectedRoute>
 }
/>

{/* ================= 🏆 LEADERBOARD ================= */}

<Route
path="/leaderboard"
element={
<ProtectedRoute>
<LeaderboardClasses />
</ProtectedRoute>
}
/>

{/* <Route
path="/leaderboard/:classId/:examId"
element={
<ProtectedRoute>
<LeaderboardPage />
</ProtectedRoute>
}
/> */}

{/* <Route
 path="/leaderboard/view/:classId/:examId"
 element={
  <ProtectedRoute>
   <LeaderboardPage />
  </ProtectedRoute>
 }
/> */}

<Route path="/leaderboard/:classId" element={<LeaderboardPage />} />

{/* ================= FEES ================= */}

<Route
path="/fees"
element={
<ProtectedRoute>
<AdminFeesDashboard />
</ProtectedRoute>
}
/>
<Route
path="/fees/class/:class_id"
element={
<ProtectedRoute>
<ClassFeesPage />
</ProtectedRoute>
}
/>

{/* ================= TRANSPORT ================= */}

<Route
 path="/transport"
 element={
  <ProtectedRoute>
   <TransportDashboard />
  </ProtectedRoute>
 }
/>


<Route
path="/transport"
element={
<ProtectedRoute>
<BusTracking />
</ProtectedRoute>
}
/>


<Route
 path="/transport/bus/:bus_id"
 element={
  <ProtectedRoute>
   <BusStudentsPage/>
  </ProtectedRoute>
 }
/>

<Route
 path="/transport/add-bus"
 element={
  <ProtectedRoute>
   <AddBus/>
  </ProtectedRoute>
 }
/>

<Route
 path="/transport/add-student"
 element={
  <ProtectedRoute>
   <AddBusStudent/>
  </ProtectedRoute>
 }
/>

{/* ================= NOTIFICATIONS ================= */}

<Route
path="/notifications"
element={
<ProtectedRoute>
<Notifications />
</ProtectedRoute>
}
/>


{/* ================= REPORT CARD ================= */}

<Route
path="/report-card/:student_id"
element={
<ProtectedRoute>
<ReportCard />
</ProtectedRoute>
}
/>


{/* ================= TEACHER ================= */}

<Route
path="/teacher"
element={
<ProtectedRoute role="teacher">
<TeacherLayout />
</ProtectedRoute>   
}
>

<Route path="dashboard" element={<TeacherDashboard />} />
{/* <Route path="leaderboard" element={<LeaderboardPage />} /> */}
<Route path="class/:id" element={<TeacherClassStudents />} /> 

<Route path="class/:id/attendance" element={<TeacherAttendance />} />

<Route path="class/:id/marks" element={<TeacherMarks />} />

<Route path="class/:id/homework" element={<TeacherHomework />} />

<Route path="class/:id/chat" element={<ClassChat />} />

<Route
  path="attendance/today/:classId"
  element={<TeacherTodayAttendance />}
/>

<Route
  path="attendance/monthly/:classId"
  element={<TeacherMonthlyFull />}
/>

{/* <Route path="/teacher/classes" element={<TeacherMyClasses />} /> */}
<Route path="classes" element={<TeacherMyClasses />} />

<Route path="homework" element={<TeacherHomework />} />
<Route path="homework/:classId" element={<TeacherAddHomework />} />
<Route path="students" element={<TeacherStudents />} />
<Route path="messages" element={<TeacherMessages />} />
<Route path="chat/:class_id" element={<TeacherWithAllClassRoomChat />} />
<Route path="/teacher/announcements" element={<TeacherViewAnnouncements />} />
<Route 
  path="/teacher/marks-dashboard" 
  element={<TeacherMarksDashboard />} 
/>
<Route 
  path="/teacher/marks-entry" 
  element={<TeacherMarksEntry />} 
/>

<Route path="salary" element={<TeacherSalary />} />
<Route path="leaderboard" element={<TeacherLeaderboardClasses />} />
<Route path="leaderboard/:classId" element={<TeacherLeaderboardPage />} />


</Route>


{/* ================= STUDENT ================= */}

<Route
path="/student/dashboard"
element={
<ProtectedRoute>
<StudentDashboard />
</ProtectedRoute>
}
/>

<Route
path="/student/attendance"
element={
<ProtectedRoute>
<StudentAttendance />
</ProtectedRoute>
}
/>

<Route
path="/student/marks"
element={
<ProtectedRoute>
<StudentMarks />
</ProtectedRoute>
}
/>


{/* ================= PARENT ================= */}

<Route
path="/parent/dashboard"
element={
<ProtectedRoute>
<ParentDashboard />
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App