const express = require("express")
const router = express.Router()

const { getExams } = require("../controllers/examController")

router.get("/", getExams)

module.exports = router