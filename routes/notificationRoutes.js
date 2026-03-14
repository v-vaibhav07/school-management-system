const express = require("express")
const router = express.Router()

const { verifyToken } = require("../middleware/authMiddleware")

const {
  createNotification,
  getUserNotifications,
  markAsRead
} = require("../controllers/notificationController")

// Create notification (admin / teacher)
router.post("/", verifyToken, createNotification)

// Get my notifications
router.get("/", verifyToken, getUserNotifications)

// Mark notification as read
router.patch("/:id", verifyToken, markAsRead)

module.exports = router