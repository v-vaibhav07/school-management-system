const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  submitFeedback,
  getTeacherFeedback,
  getTeacherRating
} = require("../controllers/feedbackController")

// Student submits feedback
router.post(
  "/",
  verifyToken,
  allowRoles("student"),
  submitFeedback
)

// Admin view feedback for teacher
router.get(
  "/teacher/:teacher_id",
  verifyToken,
  allowRoles("admin"),
  getTeacherFeedback
)

// Admin see average rating
router.get(
  "/rating/:teacher_id",
  verifyToken,
  allowRoles("admin"),
  getTeacherRating
)

module.exports = router