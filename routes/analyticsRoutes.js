const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  getDashboardStats,
  getClassPerformance,
  getSmartInsights
} = require("../controllers/analyticsController")

router.get(
  "/dashboard",
  verifyToken,
  allowRoles("admin"),
  getDashboardStats
)

router.get(
  "/class-performance",
  verifyToken,
  allowRoles("admin"),
  getClassPerformance
)

router.get(
  "/insights",
  verifyToken,
  allowRoles("admin"),
  getSmartInsights
)

module.exports = router