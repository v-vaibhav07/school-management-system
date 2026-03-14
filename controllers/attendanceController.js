const supabase = require("../config/supabase")

// Mark attendance
exports.markAttendance = async (req, res) => {

  const { student_id, class_id, status, date } = req.body

  try {

    const { data, error } = await supabase
      .from("attendance")
      .insert([
        {
          student_id,
          class_id,
          status,
          date
        }
      ])

    if (error) return res.status(400).json(error)

    res.json({
      message: "Attendance marked successfully"
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}