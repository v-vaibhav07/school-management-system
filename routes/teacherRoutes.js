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





























const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

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
      experience: t.experience
    }))

    res.json(formatted)

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})


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
    console.log("POST /teacher req.body =", req.body)

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
      console.log("USER ERROR:", userError)
      return res.status(400).json({
        step: "users insert",
        error: userError.message || userError
      })
    }

    const { data: teacherData, error: teacherError } = await supabase
      .from("teachers")
      .upsert(
        [
          {
            user_id: userData.id,
            subject: subject || null,
            phone: phone || null,
            qualification: qualification || null,
            experience: experience ? Number(experience) : null
          }
        ],
        {
          onConflict: "user_id"
        }
      )
      .select()

    if (teacherError) {
      console.log("TEACHER ERROR:", teacherError)
      return res.status(400).json({
        step: "teachers upsert",
        error: teacherError.message || teacherError
      })
    }

    return res.json({
      message: "Teacher created successfully",
      user: userData,
      teacher: teacherData
    })
  } catch (err) {
    console.log("SERVER ERROR:", err)
    return res.status(500).json({
      step: "server catch",
      error: err.message || "Server error"
    })
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

    const { error: userError } = await supabase
      .from("users")
      .update({
        full_name,
        email
      })
      .eq("id", id)

    if (userError) {
      console.log(userError)
      return res.status(400).json(userError)
    }

    const { error: teacherError } = await supabase
      .from("teachers")
      .update({
        subject,
        phone,
        qualification,
        experience
      })
      .eq("user_id", id)

    if (teacherError) {
      console.log(teacherError)
      return res.status(400).json(teacherError)
    }

    res.json({
      message: "Teacher updated successfully"
    })

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

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)

    if (error) return res.status(400).json(error)

    res.json({
      message: "Teacher deleted successfully"
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})

module.exports = router
// module.exports = router