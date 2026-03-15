const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

// const {
//   sendMessage,
//   getClassMessages
// } = require("../controllers/chatController")

const {
  sendMessage,
  getClassMessages,
  markMessageRead,
  getUnreadCount,
  getClassCards,
  getClassStudents,
  assignMonitor
} = require("../controllers/chatController")

// Teacher + Monitor send message
router.post(
  "/send",
  verifyToken,
  allowRoles("teacher", "monitor","admin"),
  sendMessage
)

// Everyone can read
router.get(
  "/class/:class_id",
  verifyToken,
  getClassMessages
)

router.post(
  "/read",
  verifyToken,
  markMessageRead
)

router.get(
  "/unread/:class_id",
  verifyToken,
  getUnreadCount
)


router.get(
  "/classes",
  verifyToken,
  getClassCards
)

router.get(
  "/students/:class_id",
  verifyToken,
  getClassStudents
)

router.post(
  "/assign-monitor",
  verifyToken,
  allowRoles("admin","teacher"),
  assignMonitor
)

module.exports = router