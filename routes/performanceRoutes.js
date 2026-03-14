const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const {
  getStudentPerformance
} = require("../controllers/performanceController")

router.get(
  "/student/:student_id",
  verifyToken,
  allowRoles("admin", "teacher", "parent", "student"),
  getStudentPerformance
)

module.exports = router