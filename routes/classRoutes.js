// const express = require("express")
// const router = express.Router()
// const supabase = require("../config/supabase")
// const {
//     getClasses,
//     createClass
// } = require("../controllers/classController")

// // GET ALL CLASSES
// router.get("/", getClasses)

// // CREATE CLASS
// router.post("/", createClass)

// // GET STUDENTS OF A CLASS
// router.get("/:id/students", async (req, res) => {

//     const { id } = req.params

//     try {

//         // 1️⃣ Get students
//         const { data: students, error } = await supabase
//             .from("students")
//             .select("id, roll_number, user_id")
//             .eq("class_id", id)
//             .order("roll_number")

//         if (error) {
//             console.log(error)
//             return res.status(400).json(error)
//         }

//         // 2️⃣ Get class info
//         const { data: classInfo } = await supabase
//             .from("classes")
//             .select("class_name, section, class_teacher_id")
//             .eq("id", id)
//             .single()

//         // 3️⃣ Get teacher
//         let teacherName = null

//         if (classInfo.class_teacher_id) {

//             const { data: teacher } = await supabase
//                 .from("users")
//                 .select("full_name")
//                 .eq("id", classInfo.class_teacher_id)
//                 .single()

//             teacherName = teacher?.full_name

//         }

//         // 3️⃣ Get user names
//         const userIds = students.map(s => s.user_id)

//         const { data: users } = await supabase
//             .from("users")
//             .select("id, full_name")
//             .in("id", userIds)

//         // 4️⃣ Merge students + users
//         const finalStudents = students.map(student => {

//             const user = users.find(u => u.id === student.user_id)

//             return {
//                 ...student,
//                 full_name: user ? user.full_name : "Unknown"
//             }

//         })

//         res.json({
//             class: classInfo,
//             teacher: teacherName,
//             students: finalStudents
//         })

//     } catch (err) {

//         console.log(err)
//         res.status(500).json({ error: "Server error" })

//     }

// })


// router.put("/:id/assign-teacher", async (req, res) => {

//   const { id } = req.params
//   const { teacher_id } = req.body

//   try {

//     const { data, error } = await supabase
//       .from("classes")
//       .update({
//         class_teacher_id: teacher_id
//       })
//       .eq("id", id)
//       .select()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Teacher assigned successfully",
//       data
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })


// // ==========================
// // CLASS ANNOUNCEMENTS
// // ==========================

// // GET ANNOUNCEMENTS
// router.get("/:id/announcements", async (req, res) => {

//   const { id } = req.params

//   try {

//     const { data, error } = await supabase
//       .from("class_announcements")
//       .select(`
//         id,
//         message,
//         is_pinned,
//         created_at,
//         users:sender_id (
//           full_name
//         )
//       `)
//       .eq("class_id", id)
//       .order("is_pinned", { ascending: false })
//       .order("created_at", { ascending: false })

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


// // POST ANNOUNCEMENT
// router.post("/:id/announcements", async (req, res) => {

//   const { id } = req.params
//   const { message, is_pinned } = req.body

//   try {

//     const { data, error } = await supabase
//       .from("class_announcements")
//       .insert([
//         {
//           class_id: id,
//           sender_id: req.user?.id || null,
//           message,
//           is_pinned: is_pinned || false
//         }
//       ])
//       .select()

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


// module.exports = router
























const express = require("express")
const router = express.Router()
const supabase = require("../config/supabase")
const {
    getClasses,
    createClass
} = require("../controllers/classController")

// GET ALL CLASSES
router.get("/", getClasses)

// CREATE CLASS
router.post("/", createClass)

// GET STUDENTS OF A CLASS
router.get("/:id/students", async (req, res) => {

    const { id } = req.params

    try {

        // 1️⃣ Get students
        const { data: students, error } = await supabase
            .from("students")
            .select("id, roll_number, user_id")
            .eq("class_id", id)
            .order("roll_number")

        if (error) {
            console.log(error)
            return res.status(400).json(error)
        }

        // 2️⃣ Get class info
        const { data: classInfo } = await supabase
            .from("classes")
            .select("class_name, section, class_teacher_id")
            .eq("id", id)
            .single()

        // 3️⃣ Get teacher
        let teacherName = null

        if (classInfo.class_teacher_id) {

            const { data: teacher } = await supabase
                .from("users")
                .select("full_name")
                .eq("id", classInfo.class_teacher_id)
                .single()

            teacherName = teacher?.full_name
        }

        // 4️⃣ Get user names
        const userIds = students.map(s => s.user_id)

        const { data: users } = await supabase
            .from("users")
            .select("id, full_name")
            .in("id", userIds)

        // 5️⃣ Merge students + users
        const finalStudents = students.map(student => {

            const user = users.find(u => u.id === student.user_id)

            return {
                ...student,
                full_name: user ? user.full_name : "Unknown"
            }

        })

        res.json({
            class: classInfo,
            teacher: teacherName,
            students: finalStudents
        })

    } catch (err) {

        console.log(err)
        res.status(500).json({ error: "Server error" })

    }

})


// ======================================
// ADD STUDENT TO CLASS  ✅ (NEW ROUTE)
// ======================================
router.post("/:id/students", async (req, res) => {

    const { id } = req.params
    const { full_name, roll_number } = req.body

    try {

        // 1️⃣ Create user
        const { data: user, error: userError } = await supabase
            .from("users")
            .insert([
                {
                    full_name,
                    role: "student"
                }
            ])
            .select()
            .single()

        if (userError) {
            console.log(userError)
            return res.status(400).json(userError)
        }

        // 2️⃣ Create student record
        const { data: student, error: studentError } = await supabase
            .from("students")
            .insert([
                {
                    user_id: user.id,
                    class_id: id,
                    roll_number
                }
            ])
            .select()

        if (studentError) {
            console.log(studentError)
            return res.status(400).json(studentError)
        }

        res.json({
            message: "Student added successfully",
            student
        })

    } catch (err) {

        console.log(err)
        res.status(500).json({ error: "Server error" })

    }

})


// ASSIGN TEACHER
router.put("/:id/assign-teacher", async (req, res) => {

  const { id } = req.params
  const { teacher_id } = req.body

  try {

    const { data, error } = await supabase
      .from("classes")
      .update({
        class_teacher_id: teacher_id
      })
      .eq("id", id)
      .select()

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Teacher assigned successfully",
      data
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})

module.exports = router