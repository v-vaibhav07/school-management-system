const supabase = require("../config/supabase")
const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  createClass,
  createExam,
  getStudents,
  getSchoolLeaderboard
} = require("../controllers/adminController")

const { getDashboardStats } = require("../controllers/analyticsController")

// Create class
router.post(
  "/class",
  verifyToken,
  allowRoles("admin"),
  createClass
)

// Create exam
router.post(
  "/exam",
  verifyToken,
  allowRoles("admin"),
  createExam
)

// Get students
router.get(
  "/students",
  verifyToken,
  allowRoles("admin"),
  getStudents
)

// School leaderboard
router.get(
  "/leaderboard",
  verifyToken,
  allowRoles("admin"),
  getSchoolLeaderboard
)

// Dashboard stats
router.get(
  "/stats",
  verifyToken,
  allowRoles("admin"),
  getDashboardStats
)


// router.post("/pay-salary", async (req, res) => {

//   const { teacher_id, amount, month, payment_method } = req.body

//   try {

//     // check already paid
//     const { data: existing } = await supabase
//       .from("teacher_pay")
//       .select("*")
//       .eq("teacher_id", teacher_id)
//       .eq("month", month)

//     if (existing.length > 0) {
//       return res.status(400).json({
//         error: "Already paid"
//       })
//     }

//     // insert
//     const { error } = await supabase
//       .from("teacher_pay")
//       .insert([
//         {
//           teacher_id,
//           amount,
//           month,
//           payment_method,
//           status: "paid"
//         }
//       ])

//     if (error) throw error

//     res.json({ message: "Salary Paid ✅" })

//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ error: "Server error" })
//   }

// })

router.post("/pay-salary", async (req, res) => {

  const { teacher_id, amount, month, payment_method } = req.body

  try {

    // ✅ check already paid
    const { data: existing } = await supabase
      .from("teacher_payments")
      .select("*")
      .eq("teacher_id", teacher_id)
      .eq("month", month)

    if (existing && existing.length > 0) {
      return res.status(400).json({
        error: "Already paid"
      })
    }

    // ✅ insert
    const { error } = await supabase
      .from("teacher_payments")
      .insert([
        {
          teacher_id,
          amount,
          month,
          payment_method,
          status: "paid"
        }
      ])

    if (error) throw error

    res.json({ message: "Salary Paid ✅" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" })
  }

})
router.get("/salary-history/:teacherId", async (req, res) => {
  const { teacherId } = req.params

  try {

    const { data, error } = await supabase
      .from("teacher_payments")
      .select("*")
      .eq("teacher_id", teacherId)

    if (error) {
      console.log("Supabase error:", error)
      return res.status(400).json(error)
    }

    res.json(data || [])

  } catch (err) {
    console.log("Server error:", err)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router