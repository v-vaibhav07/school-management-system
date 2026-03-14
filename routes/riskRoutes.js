const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")
const { getRiskStudents } = require("../controllers/riskController")

router.get(
  "/students",
  verifyToken,
  allowRoles("admin", "teacher"),
  getRiskStudents
)

module.exports = router