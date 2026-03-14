const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const { markAttendance } = require("../controllers/attendanceController")

// Mark attendance
router.post(
  "/",
  verifyToken,
  allowRoles("teacher", "admin"),
  markAttendance
)

module.exports = router