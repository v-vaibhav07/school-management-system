const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const {
  getStudentProgress,
  getAllStudentsProgress
} = require("../controllers/progressController")

// Student progress
router.get(
  "/student/:student_id",
  verifyToken,
  allowRoles("admin", "teacher", "parent", "student"),
  getStudentProgress
)

// Admin dashboard progress
router.get(
  "/admin/all",
  verifyToken,
  allowRoles("admin"),
  getAllStudentsProgress
)

module.exports = router