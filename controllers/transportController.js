const supabase = require("../config/supabase")

// Get all buses
exports.getBuses = async (req, res) => {

  const { data, error } = await supabase
    .from("buses")
    .select("*")

  if (error) return res.status(400).json(error)

  res.json(data)

}


// Update bus GPS location
exports.updateBusLocation = async (req, res) => {

  const { bus_id, latitude, longitude } = req.body

  const { data, error } = await supabase
    .from("bus_locations")
    .upsert({
      bus_id,
      latitude,
      longitude,
      updated_at: new Date()
    })

  if (error) return res.status(400).json(error)

  res.json({
    message: "Bus location updated",
    data
  })

}


// Get live bus location
exports.getBusLocation = async (req, res) => {

  const { bus_id } = req.params

  const { data, error } = await supabase
    .from("bus_locations")
    .select("*")
    .eq("bus_id", bus_id)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)

}


// ==============================
// Parent track child's bus
// ==============================
exports.trackMyBus = async (req, res) => {

  try {

    const user_id = req.user.id

    // find student
    const { data: student } = await supabase
      .from("students")
      .select("id, bus_id")
      .eq("user_id", user_id)
      .single()

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }

    // get bus location
    const { data: location } = await supabase
      .from("bus_locations")
      .select("*")
      .eq("bus_id", student.bus_id)
      .single()

    res.json(location)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

}


// ==============================
// Admin track any bus
// ==============================
exports.adminTrackBus = async (req, res) => {

  const { bus_id } = req.params

  const { data, error } = await supabase
    .from("bus_locations")
    .select("*")
    .eq("bus_id", bus_id)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)

}


// ==============================
// Smart ETA Prediction
// ==============================
exports.getBusETA = async (req, res) => {

  try {

    const { bus_id } = req.params

    // School location (example)
    const SCHOOL_LAT = 28.6139
    const SCHOOL_LNG = 77.2090

    // Get bus location
    const { data: location, error } = await supabase
      .from("bus_locations")
      .select("*")
      .eq("bus_id", bus_id)
      .single()

    if (error) {
      return res.status(400).json(error)
    }

    const busLat = location.latitude
    const busLng = location.longitude

    // Haversine formula
    const R = 6371

    const dLat = (SCHOOL_LAT - busLat) * Math.PI / 180
    const dLon = (SCHOOL_LNG - busLng) * Math.PI / 180

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(busLat * Math.PI / 180) *
      Math.cos(SCHOOL_LAT * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c

    // average bus speed
    const BUS_SPEED = 25

    const etaMinutes = (distance / BUS_SPEED) * 60

    res.json({
      bus: bus_id,
      distance_km: Number(distance.toFixed(2)),
      eta_minutes: Math.round(etaMinutes)
    })

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

}
