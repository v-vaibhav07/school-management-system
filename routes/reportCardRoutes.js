const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  generateReportCard
} = require("../controllers/reportCardController")

router.get(
  "/:student_id",
  verifyToken,
  allowRoles("admin", "teacher", "parent"),
  generateReportCard
)

module.exports = router