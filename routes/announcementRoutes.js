const express = require("express")
const router = express.Router()

const { verifyToken, allowRoles } = require("../middleware/authMiddleware")

const {
  createAnnouncement,
  getAnnouncements,
  pinAnnouncement,
  deleteAnnouncement
} = require("../controllers/announcementController")

// Teacher or monitor sends announcement
router.post(
  "/",
  verifyToken,
  allowRoles("admin","teacher","student"),
  createAnnouncement
)

// Students view announcements
router.get(
  "/",
  verifyToken,
  getAnnouncements
)

// Teacher pins announcement
router.patch(
  "/pin/:id",
  verifyToken,
  allowRoles("teacher"),
  pinAnnouncement
)

// Teacher deletes announcement
router.delete(
  "/:id",
  verifyToken,
  allowRoles("teacher","admin"),
  deleteAnnouncement
)

module.exports = router