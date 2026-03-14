const express = require("express")
const router = express.Router()

const {
  getOverallAttendance,
  getClassAttendance,
  getTeacherAttendance
} = require("../controllers/adminAttendanceController")

router.get("/overview", getOverallAttendance)

router.get("/class/:classId", getClassAttendance)

router.get("/teachers", getTeacherAttendance)

module.exports = router