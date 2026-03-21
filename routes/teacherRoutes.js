// const express = require("express")
// const router = express.Router()

// const supabase = require("../config/supabase")

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   getClassStudents,
//   markAttendance,
//   uploadMarks
// } = require("../controllers/teacherController")

// // =========================
// // ADMIN TEACHER MANAGEMENT
// // =========================

// // GET ALL TEACHERS
// router.get("/", async (req, res) => {

//   const { data, error } = await supabase
//     .from("users")
//     .select("id, full_name, email")
//     .eq("role", "teacher")

//   if (error) return res.status(400).json(error)

//   res.json(data)
// })


// // ADD TEACHER
// router.post("/", async (req, res) => {

//   const { full_name, email, password_hash } = req.body

//   const { data, error } = await supabase
//     .from("users")
//     .insert([
//       {
//         full_name,
//         email,
//         password_hash,
//         role: "teacher"
//       }
//     ])
//     .select()

//   if (error) return res.status(400).json(error)

//   res.json(data)
// })


// // DELETE TEACHER
// router.delete("/:id", async (req, res) => {

//   const { id } = req.params

//   const { error } = await supabase
//     .from("users")
//     .delete()
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({
//     message: "Teacher deleted successfully"
//   })
// })


// // =========================
// // TEACHER PANEL
// // =========================

// // Get students in a class
// router.get(
//   "/class/:classId/students",
//   verifyToken,
//   allowRoles("teacher", "admin"),   // allow admin also
//   getClassStudents
// )


// // Mark attendance
// router.post(
//   "/attendance",
//   verifyToken,
//   allowRoles("teacher", "admin"),   // allow admin also
//   markAttendance
// )


// // Upload marks
// router.post(
//   "/marks",
//   verifyToken,
//   allowRoles("teacher", "admin"),   // allow admin also
//   uploadMarks
// )

// // router.get("/", async (req, res) => {

// //   try {

// //     const { data, error } = await supabase
// //       .from("users")
// //       .select("id, full_name")
// //       .eq("role", "teacher")

// //     if (error) {
// //       console.log(error)
// //       return res.status(400).json(error)
// //     }

// //     res.json(data)

// //   } catch (err) {

// //     console.log(err)
// //     res.status(500).json({ error: "Server error" })

// //   }

// // })

// module.exports = router



























// const express = require("express")
// const router = express.Router()

// const supabase = require("../config/supabase")

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   getClassStudents,
//   markAttendance,
//   uploadMarks
// } = require("../controllers/teacherController")

// // =========================
// // ADMIN TEACHER MANAGEMENT
// // =========================

// // GET ALL TEACHERS
// router.get("/", async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("users")
//       .select("id, full_name, email")
//       .eq("role", "teacher")

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json(data)

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })


// // ADD TEACHER
// router.post("/", async (req, res) => {

//   const { full_name, email, password_hash } = req.body

//   const { data, error } = await supabase
//     .from("users")
//     .insert([
//       {
//         full_name,
//         email,
//         password_hash,
//         role: "teacher"
//       }
//     ])
//     .select()

//   if (error) return res.status(400).json(error)

//   res.json(data)

// })

// // // UPDATE TEACHER
// // router.put("/:id", async (req, res) => {

// //   const { id } = req.params
// //   const { full_name, email } = req.body

// //   try {

// //     const { data, error } = await supabase
// //       .from("users")
// //       .update({
// //         full_name,
// //         email
// //       })
// //       .eq("id", id)
// //       .select()

// //     if (error) {
// //       console.log(error)
// //       return res.status(400).json(error)
// //     }

// //     res.json({
// //       message: "Teacher updated successfully",
// //       data
// //     })

// //   } catch (err) {

// //     console.log(err)
// //     res.status(500).json({ error: "Server error" })

// //   }

// // })
// router.put("/:id", async (req, res) => {

//   const { id } = req.params

//   const {
//     full_name,
//     email,
//     subject,
//     phone,
//     qualification,
//     experience
//   } = req.body

//   try {

//     // update users table
//     const { error: userError } = await supabase
//       .from("users")
//       .update({
//         full_name,
//         email
//       })
//       .eq("id", id)

//     if (userError) {
//       console.log(userError)
//       return res.status(400).json(userError)
//     }

//     // update teachers table
//     const { error: teacherError } = await supabase
//       .from("teachers")
//       .update({
//         subject,
//         phone,
//         qualification,
//         experience
//       })
//       .eq("user_id", id)

//     if (teacherError) {
//       console.log(teacherError)
//     }

//     res.json({
//       message: "Teacher updated successfully"
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })



// // DELETE TEACHER
// router.delete("/:id", async (req, res) => {

//   const { id } = req.params

//   const { error } = await supabase
//     .from("users")
//     .delete()
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({
//     message: "Teacher deleted successfully"
//   })

// })


// // =========================
// // TEACHER PANEL
// // =========================

// // Get students in a class***************************************************************************
// // router.get(
// //   "/class/:classId/students",
// //   verifyToken,
// //   allowRoles("teacher", "admin"),
// //   getClassStudents
// // )************************************************************************************************
// router.get("/", async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("teachers")
//       .select(`
//         subject,
//         phone,
//         qualification,
//         experience,
//         users:user_id (
//           id,
//           full_name,
//           email
//         )
//       `)

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json(data)

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })


// // Mark attendance
// router.post(
//   "/attendance",
//   verifyToken,
//   allowRoles("teacher", "admin"),
//   markAttendance
// )


// // Upload marks
// router.post(
//   "/marks",
//   verifyToken,
//   allowRoles("teacher", "admin"),
//   uploadMarks
// )

// module.exports = router




























// const { getMyClass, getClassStudents } = require("../controllers/teacherController")
// const { getMyClass, getClassStudents, markAttendance } = require("../controllers/teacherController")
// const { verifyToken } = require("../middleware/authMiddleware")
// const express = require("express")
// const router = express.Router()

// const supabase = require("../config/supabase")

// // =========================
// // GET ALL TEACHERS
// // =========================

// router.get("/", async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("teachers")
//       .select(`
//         subject,
//         phone,
//         qualification,
//         experience,
//         users:user_id (
//           id,
//           full_name,
//           email
//         )
//       `)

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     const formatted = data.map(t => ({
//       id: t.users.id,
//       full_name: t.users.full_name,
//       email: t.users.email,
//       subject: t.subject,
//       phone: t.phone,
//       qualification: t.qualification,
//       experience: t.experience
//     }))

//     res.json(formatted)

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })


// router.get("/my-class", verifyToken, getMyClass)
// router.get("/class/:classId/students", verifyToken, getClassStudents)
// router.post("/attendance", verifyToken, markAttendance)

// // =========================
// // ADD TEACHER
// // =========================

// router.post("/", async (req, res) => {
//   const {
//     full_name,
//     email,
//     subject,
//     phone,
//     qualification,
//     experience
//   } = req.body

//   try {
//     console.log("POST /teacher req.body =", req.body)

//     const { data: userData, error: userError } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           role: "teacher"
//         }
//       ])
//       .select()
//       .single()

//     if (userError) {
//       console.log("USER ERROR:", userError)
//       return res.status(400).json({
//         step: "users insert",
//         error: userError.message || userError
//       })
//     }

//     const { data: teacherData, error: teacherError } = await supabase
//       .from("teachers")
//       .upsert(
//         [
//           {
//             user_id: userData.id,
//             subject: subject || null,
//             phone: phone || null,
//             qualification: qualification || null,
//             experience: experience ? Number(experience) : null
//           }
//         ],
//         {
//           onConflict: "user_id"
//         }
//       )
//       .select()

//     if (teacherError) {
//       console.log("TEACHER ERROR:", teacherError)
//       return res.status(400).json({
//         step: "teachers upsert",
//         error: teacherError.message || teacherError
//       })
//     }

//     return res.json({
//       message: "Teacher created successfully",
//       user: userData,
//       teacher: teacherData
//     })
//   } catch (err) {
//     console.log("SERVER ERROR:", err)
//     return res.status(500).json({
//       step: "server catch",
//       error: err.message || "Server error"
//     })
//   }
// })


// // =========================
// // UPDATE TEACHER
// // =========================

// router.put("/:id", async (req, res) => {

//   const { id } = req.params

//   const {
//     full_name,
//     email,
//     subject,
//     phone,
//     qualification,
//     experience
//   } = req.body

//   try {

//     const { error: userError } = await supabase
//       .from("users")
//       .update({
//         full_name,
//         email
//       })
//       .eq("id", id)

//     if (userError) {
//       console.log(userError)
//       return res.status(400).json(userError)
//     }

//     const { error: teacherError } = await supabase
//       .from("teachers")
//       .update({
//         subject,
//         phone,
//         qualification,
//         experience
//       })
//       .eq("user_id", id)

//     if (teacherError) {
//       console.log(teacherError)
//       return res.status(400).json(teacherError)
//     }

//     res.json({
//       message: "Teacher updated successfully"
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })


// // =========================
// // DELETE TEACHER
// // =========================

// router.delete("/:id", async (req, res) => {

//   const { id } = req.params

//   try {

//     await supabase
//       .from("teachers")
//       .delete()
//       .eq("user_id", id)

//     const { error } = await supabase
//       .from("users")
//       .delete()
//       .eq("id", id)

//     if (error) return res.status(400).json(error)

//     res.json({
//       message: "Teacher delted successfully"
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })

// module.exports = router
// // module.exports = router


















const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

const { 
  getMyClass, 
  getClassStudents, 
  markAttendance,
  getAttendanceByDate,
  getMonthlyAttendance,
  getTodayAttendance,
  toggleTodo,
  deleteTodo,
  getTodayAttendanceList,
  getMonthlyFull,
  getTodayClasses,
  getMyClasses,
  getHomeworkClasses,
  addHomework,
  getTeacherClassesWithCount,
  getClassMessages,
  sendClassMessage,
  getTeacherAnnouncements,
  getTimetableClasses,
  saveMarks,
  getMarks
} = require("../controllers/teacherController")

const { getTodos, addTodo } = require("../controllers/teacherController")

const { verifyToken } = require("../middleware/authMiddleware")
const multer = require("multer")
const upload = multer({ dest: "uploads/" })
// =========================
// GET ALL TEACHERS
// =========================
router.get("/", async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("teachers")
      .select(`
        subject,
        phone,
        qualification,
        experience,
         salary,
         upi_id,
        users:user_id (
          id,
          full_name,
          email
        )
      `)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const formatted = data.map(t => ({
      id: t.users.id,
      full_name: t.users.full_name,
      email: t.users.email,
      subject: t.subject,
      phone: t.phone,
      qualification: t.qualification,
      experience: t.experience,
      salary: t.salary,
       upi_id: t.upi_id
    }))

    res.json(formatted)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})


// =========================
// TEACHER FEATURES
// =========================
router.get("/my-class", verifyToken, getMyClass)

router.get("/class/:classId/students", verifyToken, getClassStudents)

router.post("/attendance", verifyToken, markAttendance)

router.get("/attendance/:classId", verifyToken, getAttendanceByDate)

router.get("/attendance/monthly/:classId", verifyToken, getMonthlyAttendance)

router.get("/attendance/today/:classId", verifyToken, getTodayAttendance)
router.get("/todos", verifyToken, getTodos)
router.post("/todos", verifyToken, addTodo)
router.put("/todos/:id", verifyToken, toggleTodo)
router.delete("/todos/:id", verifyToken, deleteTodo)
router.get("/attendance/today/:classId/list", verifyToken, getTodayAttendanceList)
router.get("/attendance/monthly/:classId/full", verifyToken, getMonthlyFull)
router.get("/today-classes", verifyToken, getTodayClasses)
router.get("/my-classes", verifyToken, getMyClasses)
router.get("/homework-classes", verifyToken, getHomeworkClasses)
router.post("/homework", verifyToken, upload.single("file"), addHomework)
router.get("/classes-with-count", verifyToken, getTeacherClassesWithCount)
router.get("/chat/:class_id", verifyToken, getClassMessages)
router.post("/chat", verifyToken, sendClassMessage)
router.get("/announcements", verifyToken, getTeacherAnnouncements)
router.get("/timetable-classes", verifyToken, getTimetableClasses)
router.post("/save-marks", verifyToken, saveMarks)
router.get("/marks/:classId", verifyToken, getMarks)
// =========================
// ADD TEACHER
// =========================
router.post("/", async (req, res) => {

  const {
    full_name,
    email,
    subject,
    phone,
    qualification,
    experience
  } = req.body

  try {

    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          full_name,
          email,
          role: "teacher"
        }
      ])
      .select()
      .single()

    if (userError) {
      console.log(userError)
      return res.status(400).json(userError)
    }

    const { data: teacherData, error: teacherError } = await supabase
      .from("teachers")
      .upsert([
        {
          user_id: userData.id,
          subject: subject || null,
          phone: phone || null,
          qualification: qualification || null,
          experience: experience ? Number(experience) : null
        }
      ], {
        onConflict: "user_id"
      })
      .select()

    if (teacherError) {
      console.log(teacherError)
      return res.status(400).json(teacherError)
    }

    res.json({
      message: "Teacher created successfully",
      user: userData,
      teacher: teacherData
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})


// =========================
// UPDATE TEACHER
// =========================
router.put("/:id", async (req, res) => {

  const { id } = req.params

  const {
    full_name,
    email,
    subject,
    phone,
    qualification,
    experience
  } = req.body

  try {

    await supabase
      .from("users")
      .update({ full_name, email })
      .eq("id", id)

    await supabase
      .from("teachers")
      .update({ subject, phone, qualification, experience })
      .eq("user_id", id)

    res.json({
      message: "Teacher updated successfully"
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})








// =========================
// PAY SALARY
// =========================
router.post("/pay", async (req, res) => {

  const { teacher_id, amount, month, payment_method } = req.body

  try {

    // 🔥 duplicate check
    const { data: existing } = await supabase
      .from("teacher_payments")
      .select("*")
      .eq("teacher_id", teacher_id)
      .eq("month", month)
      .single()

    if (existing) {
      return res.status(400).json({
        error: "Salary already paid for this month"
      })
    }

    const { error } = await supabase
      .from("teacher_payments")
      .insert([
        {
          teacher_id,
          amount,
          month,
          payment_method
        }
      ])

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({ message: "Salary Paid Successfully ✅" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }

})
// =========================
// GET PAYMENT HISTORY
// =========================
router.get("/:id/payments", async (req, res) => {

  const { id } = req.params

  const { data, error } = await supabase
    .from("teacher_payments")
    .select("*")
    .eq("teacher_id", id)
    .order("payment_date", { ascending: false })

  if (error) {
    console.log(error)
    return res.status(400).json(error)
  }

  res.json(data)

})

// =========================
// TEACHER OWN SALARY
// =========================
router.get("/my-salary", verifyToken, async (req, res) => {

  const userId = req.user.id

  try {

    // 🔥 find teacher id from user_id
    const { data: teacher } = await supabase
      .from("teachers")
      .select("id")
      .eq("user_id", userId)
      .single()

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" })
    }

    const { data, error } = await supabase
      .from("teacher_payments")
      .select("*")
      .eq("teacher_id", teacher.id)
      .order("payment_date", { ascending: false })

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json(data)

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }

})







// =========================
// DELETE TEACHER
// =========================
router.delete("/:id", async (req, res) => {

  const { id } = req.params

  try {

    await supabase
      .from("teachers")
      .delete()
      .eq("user_id", id)

    await supabase
      .from("users")
      .delete()
      .eq("id", id)

    res.json({
      message: "Teacher deleted successfully"
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router