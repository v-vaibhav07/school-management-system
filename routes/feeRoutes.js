// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee
// } = require("../controllers/feeController")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard
// } = require("../controllers/feeController")

// // Admin create fee structure
// router.post(
//   "/structure",
//   verifyToken,
//   allowRoles("admin"),
//   createFeeStructure
// )

// // Student view fee
// router.get(
//   "/student/:student_id",
//   verifyToken,
//   getStudentFees
// )

// // Pay fee
// router.post(
//   "/pay",
//   verifyToken,
//   allowRoles("student"),
//   payFee
// )


// // Student fee dashboard
// router.get(
//   "/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   getStudentFeeDashboard
// )

// module.exports = router



// const express = require("express")
// const router = express.Router()

// const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard
// } = require("../controllers/feeController")

// const {
//   createFeeStructure,
//   getStudentFees,
//   payFee,
//   getStudentFeeDashboard,
//   getAdminFinanceDashboard
// } = require("../controllers/feeController")

// // Admin create fee structure
// router.post(
//   "/structure",
//   verifyToken,
//   allowRoles("admin"),
//   createFeeStructure
// )

// // Student view fee
// router.get(
//   "/student/:student_id",
//   verifyToken,
//   getStudentFees
// )

// // Pay fee
// router.post(
//   "/pay",
//   verifyToken,
//   allowRoles("student"),
//   payFee
// )

// // Student fee dashboard
// router.get(
//   "/dashboard",
//   verifyToken,
//   allowRoles("student"),
//   getStudentFeeDashboard
// )


// // Admin finance dashboard
// router.get(
//   "/admin/finance",
//   verifyToken,
//   allowRoles("admin"),
//   getAdminFinanceDashboard
// )

// module.exports = router


const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  createFeeStructure,
  getStudentFees,
  payFee,
  getStudentFeeDashboard,
  getAdminFinanceDashboard,
  getMonthlyRevenue,
  getRecentPayments,
  getClassFeeSummary,
  getClassStudentsFees,
  sendFeeReminder
} = require("../controllers/feeController")

// Admin create fee structure
router.post(
  "/structure",
  verifyToken,
  allowRoles("admin"),
  createFeeStructure
)

// Student view fee
router.get(
  "/student/:student_id",
  verifyToken,
  getStudentFees
)

// Pay fee
router.post(
  "/pay",
  verifyToken,
  allowRoles("student"),
  payFee
)

// Student fee dashboard
router.get(
  "/dashboard",
  verifyToken,
  allowRoles("student"),
  getStudentFeeDashboard
)

// Admin finance dashboard
router.get(
  "/admin/finance",
  verifyToken,
  allowRoles("admin"),
  getAdminFinanceDashboard
)

// Monthly revenue analytics
router.get(
  "/admin/revenue",
  verifyToken,
  allowRoles("admin"),
  getMonthlyRevenue
)

router.get(
  "/admin/recent-payments",
  verifyToken,
  allowRoles("admin"),
  getRecentPayments
)

router.get(
  "/admin/class-summary",
  verifyToken,
  allowRoles("admin"),
  getClassFeeSummary
)


router.get(
  "/admin/class-students/:class_id",
  verifyToken,
  allowRoles("admin"),
  getClassStudentsFees
)


router.post(
  "/admin/send-reminder",
  verifyToken,
  allowRoles("admin"),
  sendFeeReminder
)
module.exports = router