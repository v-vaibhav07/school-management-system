// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   getMyChildren,
//   getChildAttendance,
//   getChildMarks
// } = require("../controllers/parentController")

// // Parent dashboard
// router.get(
//   "/children",
//   verifyToken,
//   allowRoles("parent"),
//   getMyChildren
// )

// // Attendance
// router.get(
//   "/attendance/:student_id",
//   verifyToken,
//   allowRoles("parent"),
//   getChildAttendance
// )

// // Marks
// router.get(
//   "/marks/:student_id",
//   verifyToken,
//   allowRoles("parent"),
//   getChildMarks
// )

// module.exports = router

const express = require("express")
const router = express.Router()

const supabase = require("../config/supabase")
const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
// =========================
// ADMIN PARENT MANAGEMENT
// =========================

// GET ALL PARENTS
router.get("/", async (req, res) => {

  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, email")
    .eq("role", "parent")

  if (error) return res.status(400).json(error)

  res.json(data)
})


// ADD PARENT
router.post("/", async (req, res) => {

  const { full_name, email, password_hash } = req.body

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name,
        email,
        password_hash,
        role: "parent"
      }
    ])
    .select()

  if (error) return res.status(400).json(error)

  res.json(data)
})


// DELETE PARENT
router.delete("/:id", async (req, res) => {

  const { id } = req.params

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({
    message: "Parent deleted successfully"
  })
})


const {
  getMyChildren,
  getChildAttendance,
  getChildMarks
} = require("../controllers/parentController")

// Parent → Children
router.get(
  "/children",
  verifyToken,
  allowRoles("parent"),
  getMyChildren
)

// Parent → Attendance
router.get(
  "/attendance/:student_id",
  verifyToken,
  allowRoles("parent"),
  getChildAttendance
)

// Parent → Marks
router.get(
  "/marks/:student_id",
  verifyToken,
  allowRoles("parent"),
  getChildMarks
)




module.exports = router