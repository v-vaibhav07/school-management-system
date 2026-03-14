const supabase = require("../config/supabase")

// ===============================
// OVERALL ATTENDANCE (ALL CLASSES)
// ===============================
exports.getOverallAttendance = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("attendance")
      .select("status")

    if (error) return res.status(400).json(error)

    const total = data.length

    const present = data.filter(a => a.status === "present").length

    const percentage = total === 0 ? 0 : ((present / total) * 100).toFixed(2)

    res.json({
      percentage,
      present,
      total
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}


// ===============================
// CLASS ATTENDANCE DETAILS
// ===============================
exports.getClassAttendance = async (req, res) => {

  const { classId } = req.params

  try {

    const { data, error } = await supabase
      .from("student_attendance_percentage")
      .select("*")
      .eq("class_id", classId)

    if (error) return res.status(400).json(error)

    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}


// ===============================
// TEACHER ATTENDANCE (FAKE LOGIC)
// ===============================
exports.getTeacherAttendance = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("users")
      .select("id, full_name")
      .eq("role", "teacher")

    if (error) return res.status(400).json(error)

    const teachers = data.map(t => ({
      ...t,
      percentage: Math.floor(Math.random() * 10) + 90
    }))

    res.json(teachers)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}