// const express = require("express")
// const router = express.Router()
// const supabase = require("../config/supabase")

// // GET leaderboard
// router.get("/", async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .order("final_score", { ascending: false })
//       .limit(10)

//     if (error) {
//       return res.status(400).json({ error: error.message })
//     }

//     res.json(data)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// module.exports = router

// const express = require("express")
// const router = express.Router()

// const { getLeaderboard } = require("../controllers/leaderboardController")

// router.get("/", getLeaderboard)

// module.exports = router



const express = require("express")
const router = express.Router()

const { getLeaderboard, getStudentMarks } = require("../controllers/leaderboardController")

router.get("/", getLeaderboard)

// NEW ROUTE
router.get("/marks", getStudentMarks)

module.exports = router