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
  getMonthlyRevenue
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

module.exports = router