// const express = require("express")
// const router = express.Router()
// const supabase = require("../config/supabase")

// // -----------------------------
// // Get all buses
// // -----------------------------
// router.get("/buses", async (req, res) => {

//   const { data, error } = await supabase
//     .from("buses")
//     .select("*")

//   if (error) {
//     return res.status(400).json(error)
//   }

//   res.json(data)

// })


// // -----------------------------
// // Update bus location
// // -----------------------------
// router.post("/location", async (req, res) => {

//   const { bus_id, latitude, longitude } = req.body

//   const { data, error } = await supabase
//     .from("bus_locations")
//     .upsert({
//       bus_id,
//       latitude,
//       longitude,
//       updated_at: new Date()
//     })

//   if (error) {
//     return res.status(400).json(error)
//   }

//   res.json({
//     message: "Bus location updated",
//     data
//   })

// })


// // -----------------------------
// // Get bus live location
// // -----------------------------
// router.get("/location/:bus_id", async (req, res) => {

//   const { bus_id } = req.params

//   const { data, error } = await supabase
//     .from("bus_locations")
//     .select("*")
//     .eq("bus_id", bus_id)
//     .single()

//   if (error) {
//     return res.status(400).json(error)
//   }

//   res.json(data)

// })

// module.exports = router


const express = require("express")
const router = express.Router()

const {
  getBuses,
  updateBusLocation,
  getBusLocation,
  trackMyBus,
  adminTrackBus,
  getBusETA,
  getTransportDashboard,
  getBusStudents,
  sendTransportReminder,
  addBus,
  assignBusStudent
} = require("../controllers/transportController")

// Get all buses
router.get("/buses", getBuses)

// Update location
router.post("/location", updateBusLocation)

// Get live location
router.get("/location/:bus_id", getBusLocation)


const { verifyToken, allowRoles } =
require("../middleware/authMiddleware")

// Parent tracking
router.get(
  "/track-my-bus",
  verifyToken,
  allowRoles("parent"),
  trackMyBus
)

// Admin tracking
router.get(
  "/admin/track/:bus_id",
  verifyToken,
  allowRoles("admin"),
  adminTrackBus
)

router.get(
  "/eta/:bus_id",
  verifyToken,
  getBusETA
)



// Transport dashboard
router.get("/dashboard", getTransportDashboard)

// Bus students list
router.get("/bus/:bus_id/students", getBusStudents)

router.post(
 "/reminder",
 verifyToken,
 allowRoles("admin"),
 sendTransportReminder
)


router.post(
"/bus",
verifyToken,
allowRoles("admin"),
addBus
)


router.post(
"/bus-student",
verifyToken,
allowRoles("admin"),
assignBusStudent
)
module.exports = router