const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  createAssignment,
  getAssignments,
  submitAssignment
} = require("../controllers/assignmentController")

// Teacher creates assignment
router.post(
  "/create",
  verifyToken,
  allowRoles("teacher"),
  createAssignment
)

// Students view assignments
router.get(
  "/",
  verifyToken,
  allowRoles("student"),
  getAssignments
)

// Student submits assignment
router.post(
  "/submit",
  verifyToken,
  allowRoles("student"),
  submitAssignment
)

module.exports = router