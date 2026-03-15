// const express = require("express")
// const cors = require("cors")
// require("dotenv").config()

// const supabase = require("./config/supabase")
// const authRoutes = require("./routes/authRoutes")
// const { verifyToken, allowRoles } = require("./middleware/authMiddleware")

// const app = express()

// // Middlewares
// app.use(cors())
// app.use(express.json())

// // Auth Routes
// app.use("/api/auth", authRoutes)

// // Home Route
// app.get("/", (req, res) => {
//   res.send("SDJPS Backend Running 🚀")
// })

// // Test DB Route
// app.get("/test-db", async (req, res) => {
//   const { data, error } = await supabase
//     .from("test")
//     .select("*")

//   if (error) return res.status(400).json(error)

//   res.json(data)
// })

// // 🔐 Admin Dashboard (Admin Only)
// app.get(
//   "/api/admin/dashboard",
//   verifyToken,
//   allowRoles("admin"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Admin Dashboard",
//       user: req.user
//     })
//   }
// )

// // 👩‍🏫 Teacher Dashboard
// app.get(
//   "/api/teacher/dashboard",
//   verifyToken,
//   allowRoles("teacher"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Teacher Dashboard",
//       user: req.user
//     })
//   }
// )

// // 👨‍🎓 Student Dashboard
// app.get(
//   "/api/student/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Student Dashboard",
//       user: req.user
//     })
//   }
// )

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// const express = require("express")
// const cors = require("cors")
// require("dotenv").config()

// const { verifyToken, allowRoles } = require("./middleware/authMiddleware")
// const authRoutes = require("./routes/authRoutes")
// const leaderboardRoutes = require("./routes/leaderboardRoutes")   // ⭐ ADDED
// const studentRoutes = require("./routes/studentRoutes")
// const teacherRoutes = require("./routes/teacherRoutes")
// const adminRoutes = require("./routes/adminRoutes")
// const assignmentRoutes = require("./routes/assignmentRoutes")
// const announcementRoutes = require("./routes/announcementRoutes")
// const feeRoutes = require("./routes/feeRoutes")
// const notificationRoutes = require("./routes/notificationRoutes")
// const parentRoutes = require("./routes/parentRoutes")
// const homeworkRoutes = require("./routes/homeworkRoutes")
// const feedbackRoutes = require("./routes/feedbackRoutes")
// const reportCardRoutes = require("./routes/reportCardRoutes")
// const progressRoutes = require("./routes/progressRoutes")
// const performanceRoutes = require("./routes/performanceRoutes")
// const chatRoutes = require("./routes/chatRoutes")
// const riskRoutes = require("./routes/riskRoutes")
// const analyticsRoutes = require("./routes/analyticsRoutes")

// const app = express()

// app.use(cors())
// app.use(express.json())

// // Auth Routes
// app.use("/api/auth", authRoutes)

// // Leaderboard Routes  ⭐ ADDED
// app.use("/api/leaderboard", leaderboardRoutes)
// app.use("/api/student", studentRoutes)
// app.use("/api/teacher", teacherRoutes)
// app.use("/api/admin", adminRoutes)
// app.use("/api/assignments", assignmentRoutes)
// app.use("/api/announcements", announcementRoutes)
// app.use("/api/fees", feeRoutes)
// app.use("/api/notifications", notificationRoutes)
// app.use("/api/parent", parentRoutes)
// app.use("/api/homework", homeworkRoutes)
// app.use("/api/feedback", feedbackRoutes)
// app.use("/api/report-card", reportCardRoutes)
// app.use("/api/progress", progressRoutes)
// app.use("/api/performance", performanceRoutes)
// app.use("/api/chat", chatRoutes)
// app.use("/api/risk", riskRoutes)
// app.use("/api/analytics", analyticsRoutes)

// // Home Route
// app.get("/", (req, res) => {
//   res.send("SDJPS Backend Running 🚀")
// })

// // Admin Dashboard
// app.get(
//   "/api/admin/dashboard",
//   verifyToken,
//   allowRoles("admin"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Admin Dashboard",
//       user: req.user
//     })
//   }
// )

// // Teacher Dashboard
// app.get(
//   "/api/teacher/dashboard",
//   verifyToken,
//   allowRoles("teacher"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Teacher Dashboard",
//       user: req.user
//     })
//   }
// )

// // Student Dashboard
// app.get(
//   "/api/student/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Student Dashboard",
//       user: req.user
//     })
//   }
// )

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })




// const express = require("express")
// const cors = require("cors")
// require("dotenv").config()

// const http = require("http")
// const { Server } = require("socket.io")

// const { verifyToken, allowRoles } = require("./middleware/authMiddleware")

// const authRoutes = require("./routes/authRoutes")
// const leaderboardRoutes = require("./routes/leaderboardRoutes")
// const studentRoutes = require("./routes/studentRoutes")
// const teacherRoutes = require("./routes/teacherRoutes")
// const adminRoutes = require("./routes/adminRoutes")
// const assignmentRoutes = require("./routes/assignmentRoutes")
// const announcementRoutes = require("./routes/announcementRoutes")
// const feeRoutes = require("./routes/feeRoutes")
// const notificationRoutes = require("./routes/notificationRoutes")
// const parentRoutes = require("./routes/parentRoutes")
// const homeworkRoutes = require("./routes/homeworkRoutes")
// const feedbackRoutes = require("./routes/feedbackRoutes")
// const reportCardRoutes = require("./routes/reportCardRoutes")
// const progressRoutes = require("./routes/progressRoutes")
// const performanceRoutes = require("./routes/performanceRoutes")
// const chatRoutes = require("./routes/chatRoutes")
// const riskRoutes = require("./routes/riskRoutes")
// const analyticsRoutes = require("./routes/analyticsRoutes")
// const transportRoutes = require("./routes/transportRoutes")
// const idCardRoutes = require("./routes/idCardRoutes")
// const timetableRoutes = require("./routes/timetableRoutes")

// const app = express()

// app.use(cors())
// app.use(express.json())

// // Auth Routes
// app.use("/api/auth", authRoutes)

// app.use("/api/leaderboard", leaderboardRoutes)
// app.use("/api/student", studentRoutes)
// app.use("/api/teacher", teacherRoutes)
// app.use("/api/admin", adminRoutes)
// app.use("/api/assignments", assignmentRoutes)
// app.use("/api/announcements", announcementRoutes)
// app.use("/api/fees", feeRoutes)
// app.use("/api/notifications", notificationRoutes)
// app.use("/api/parent", parentRoutes)
// app.use("/api/homework", homeworkRoutes)
// app.use("/api/feedback", feedbackRoutes)
// app.use("/api/report-card", reportCardRoutes)
// app.use("/api/progress", progressRoutes)
// app.use("/api/performance", performanceRoutes)
// app.use("/api/chat", chatRoutes)
// app.use("/api/risk", riskRoutes)
// app.use("/api/analytics", analyticsRoutes)
// app.use("/api/transport", transportRoutes)
// app.use("/api/id-card", idCardRoutes)
// app.use("/api/timetable", timetableRoutes)

// // Home Route
// app.get("/", (req, res) => {
//   res.send("SDJPS Backend Running 🚀")
// })


// // Admin Dashboard
// app.get(
//   "/api/admin/dashboard",
//   verifyToken,
//   allowRoles("admin"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Admin Dashboard",
//       user: req.user
//     })
//   }
// )


// // Teacher Dashboard
// app.get(
//   "/api/teacher/dashboard",
//   verifyToken,
//   allowRoles("teacher"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Teacher Dashboard",
//       user: req.user
//     })
//   }
// )


// // Student Dashboard
// app.get(
//   "/api/student/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   (req, res) => {
//     res.json({
//       message: "Welcome Student Dashboard",
//       user: req.user
//     })
//   }
// )



// // ⭐ Create HTTP server for Socket.io
// const server = http.createServer(app)


// // ⭐ Initialize Socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "*"
//   }
// })


// // ⭐ Real-time connection
// io.on("connection", (socket) => {

//   console.log("User connected:", socket.id)

//   // join class room
//   socket.on("join_class", (class_id) => {
//     socket.join(class_id)
//   })

//   // send chat message
//   socket.on("send_message", (data) => {

//     io.to(data.class_id).emit("receive_message", data)

//   })
//     // 🚌 BUS LOCATION LIVE UPDATE
//   socket.on("bus_location_update", (data) => {

//     console.log("Bus update:", data)

//     io.emit("bus_location_update", data)

//   })

//   socket.on("disconnect", () => {
//     console.log("User disconnected")
//   })

// })


// const PORT = process.env.PORT || 5000


// // ⭐ Use server.listen instead of app.listen
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })


  const express = require("express")
  const cors = require("cors")
  require("dotenv").config()

  const http = require("http")
  const { Server } = require("socket.io")

  const { verifyToken, allowRoles } = require("./middleware/authMiddleware")

  // ROUTES
  const authRoutes = require("./routes/authRoutes")
  const leaderboardRoutes = require("./routes/leaderboardRoutes")
  const studentRoutes = require("./routes/studentRoutes")
  const teacherRoutes = require("./routes/teacherRoutes")
  const adminRoutes = require("./routes/adminRoutes")
  const assignmentRoutes = require("./routes/assignmentRoutes")
  const announcementRoutes = require("./routes/announcementRoutes")
  const feeRoutes = require("./routes/feeRoutes")
  const notificationRoutes = require("./routes/notificationRoutes")
  const parentRoutes = require("./routes/parentRoutes")
  const homeworkRoutes = require("./routes/homeworkRoutes")
  const feedbackRoutes = require("./routes/feedbackRoutes")
  const reportCardRoutes = require("./routes/reportCardRoutes")
  const progressRoutes = require("./routes/progressRoutes")
  const performanceRoutes = require("./routes/performanceRoutes")
  const chatRoutes = require("./routes/chatRoutes")
  const riskRoutes = require("./routes/riskRoutes")
  const analyticsRoutes = require("./routes/analyticsRoutes")
  const transportRoutes = require("./routes/transportRoutes")
  const idCardRoutes = require("./routes/idCardRoutes")
  const timetableRoutes = require("./routes/timetableRoutes")
  const attendanceRoutes = require("./routes/attendanceRoutes")
  const classRoutes = require("./routes/classRoutes")
  const adminAttendanceRoutes = require("./routes/adminAttendanceRoutes")
  const examRoutes = require("./routes/examRoutes")

  const app = express()

  app.use(cors())
  app.use(express.json())

  // =========================
  // ROUTES
  // =========================

  app.use("/api/auth", authRoutes)
  app.use("/api/leaderboard", leaderboardRoutes)
  app.use("/api/student", studentRoutes)
  app.use("/api/teacher", teacherRoutes)
  app.use("/api/admin", adminRoutes)
  app.use("/api/assignments", assignmentRoutes)
  app.use("/api/announcements", announcementRoutes)
  app.use("/api/fees", feeRoutes)
  app.use("/api/notifications", notificationRoutes)
  app.use("/api/parent", parentRoutes)
  app.use("/api/homework", homeworkRoutes)
  app.use("/api/feedback", feedbackRoutes)
  app.use("/api/report-card", reportCardRoutes)
  app.use("/api/progress", progressRoutes)
  app.use("/api/performance", performanceRoutes)
  app.use("/api/chat", chatRoutes)
  app.use("/api/risk", riskRoutes)
  app.use("/api/analytics", analyticsRoutes)
  app.use("/api/transport", transportRoutes)
  app.use("/api/id-card", idCardRoutes)
  app.use("/api/timetable", timetableRoutes)
  app.use("/api/attendance", attendanceRoutes)
  app.use("/api/classes", classRoutes)
  app.use("/api/admin/attendance", adminAttendanceRoutes)
  app.use("/api/leaderboard", leaderboardRoutes)
  app.use("/api/exams", examRoutes)

  // =========================
  // BASIC ROUTE
  // =========================

  app.get("/", (req, res) => {
    res.send("SDJPS Backend Running 🚀")
  })

  // =========================
  // DASHBOARDS
  // =========================

  app.get(
    "/api/admin/dashboard",
    verifyToken,
    allowRoles("admin"),
    (req, res) => {
      res.json({
        message: "Welcome Admin Dashboard",
        user: req.user
      })
    }
  )

  app.get(
    "/api/teacher/dashboard",
    verifyToken,
    allowRoles("teacher"),
    (req, res) => {
      res.json({
        message: "Welcome Teacher Dashboard",
        user: req.user
      })
    }
  )

  app.get(
    "/api/student/dashboard",
    verifyToken,
    allowRoles("student"),
    (req, res) => {
      res.json({
        message: "Welcome Student Dashboard",
        user: req.user
      })
    }
  )

  // =========================
  // SOCKET SERVER
  // =========================

  const server = http.createServer(app)

  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  })

  io.on("connection", (socket) => {

    console.log("User connected:", socket.id)

    // Class chat
    socket.on("join_class", (class_id) => {
      socket.join(class_id)
    })

    socket.on("send_message", (data) => {
      io.to(data.class_id).emit("receive_message", data)
    })


    // 🟢 typing indicator
socket.on("typing",(data)=>{

  socket.to(data.class_id).emit("user_typing",{
    user:data.user
  })

})

socket.on("stop_typing",(data)=>{

  socket.to(data.class_id).emit("user_stop_typing")

})



    // Bus live tracking
    socket.on("bus_location_update", (data) => {
      console.log("Bus update:", data)
      io.emit("bus_location_update", data)
    })

    socket.on("disconnect", () => {
      console.log("User disconnected")
    })

  })

  // =========================
  // SERVER START
  // =========================

  const PORT = process.env.PORT || 5000

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })