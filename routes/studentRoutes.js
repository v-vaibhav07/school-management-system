const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const {
  getProfile,
  getMarks,
  getAttendance,
  getRank
} = require("../controllers/studentController")


// =========================
// ADMIN STUDENT MANAGEMENT
// =========================

// // GET ALL STUDENTS
// router.get("/", async (req, res) => {

//   const { data, error } = await supabase
//     .from("users")
//     .select("id, full_name, email")
//     .eq("role", "student")

//   if (error) return res.status(400).json(error)

//   res.json(data)
// })

// GET ALL STUDENTS (ADMIN)
// GET ALL STUDENTS (ADMIN)
router.get("/", async (req, res) => {

  const { data, error } = await supabase
    .from("students")
    .select(`
      id,
      roll_number,
      class_id,
      users!students_user_id_fkey (
        full_name
      ),
      classes!students_class_id_fkey (
        class_name,
        section
      )
    `)

  if (error) {
    console.log(error)
    return res.status(400).json(error)
  }

  res.json(data)

})


// GET SINGLE STUDENT PROFILE
// GET SINGLE STUDENT PROFILE
router.get("/:id", async (req, res) => {

  const { id } = req.params

  try {

    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        user_id,
        class_id
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    // get user info
    const { data: user } = await supabase
      .from("users")
      .select("full_name, email")
      .eq("id", data.user_id)
      .single()

    // get class info
    const { data: classInfo } = await supabase
      .from("classes")
      .select("class_name, section")
      .eq("id", data.class_id)
      .single()

    res.json({
      id: data.id,
      roll_number: data.roll_number,
      full_name: user?.full_name,
      email: user?.email,
      class_name: classInfo?.class_name,
      section: classInfo?.section
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})



// ADD STUDENT
router.post("/", async (req, res) => {

  const { full_name, email, password_hash } = req.body

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name,
        email,
        password_hash,
        role: "student"
      }
    ])
    .select()

  if (error) return res.status(400).json(error)

  res.json(data)
})


//delete
router.delete("/:id", async (req, res) => {

  const { id } = req.params

  try {

    // 1️⃣ delete marks
    const { error: marksError } = await supabase
      .from("marks")
      .delete()
      .eq("student_id", id)

    if (marksError) {
      console.log("Marks delete error:", marksError)
      return res.status(400).json(marksError)
    }

    // 2️⃣ delete attendance
    const { error: attendanceError } = await supabase
      .from("attendance")
      .delete()
      .eq("student_id", id)

    if (attendanceError) {
      console.log("Attendance delete error:", attendanceError)
    }

    // 3️⃣ delete student table record
    const { error: studentError } = await supabase
      .from("students")
      .delete()
      .eq("id", id)

    if (studentError) {
      console.log("Student table delete error:", studentError)
    }

    // 4️⃣ delete user account
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", id)
      .select()

    if (error) {
      console.log("User delete error:", error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Student deleted successfully",
      deleted: data
    })

  } catch (err) {
    console.log("Server error:", err)
    res.status(500).json({ error: "Server error" })
  }

})

// UPDATE STUDENT
router.put("/:id", async (req, res) => {

  const { id } = req.params
  const { full_name } = req.body

  try {

    // get user_id from students table
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("user_id")
      .eq("id", id)
      .single()

    if (studentError) {
      console.log(studentError)
      return res.status(400).json(studentError)
    }

    // update name in users table
    const { data, error } = await supabase
      .from("users")
      .update({ full_name })
      .eq("id", student.user_id)
      .select()

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Student updated successfully",
      data
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})

// =========================
// STUDENT PANEL
// =========================

router.get("/profile", verifyToken, allowRoles("student"), getProfile)

router.get("/marks", verifyToken, allowRoles("student"), getMarks)

router.get("/attendance", verifyToken, allowRoles("student"), getAttendance)

router.get("/rank", verifyToken, allowRoles("student"), getRank)




module.exports = router