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

module.exports = router