const supabase = require("../config/supabase")

// Create notification
exports.createNotification = async (req, res) => {
  const { user_id, title, message } = req.body

  const { data, error } = await supabase
    .from("notifications")
    .insert([{ user_id, title, message }])

  if (error) return res.status(400).json(error)

  res.json({ message: "Notification created" })
}

// Get user notifications
exports.getUserNotifications = async (req, res) => {
  const user_id = req.user.id

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Mark notification as read
exports.markAsRead = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Notification marked as read" })
}



// ============================
// Auto Low Attendance Alert
// ============================
exports.checkLowAttendanceAlerts = async () => {

  try {

    const { data: students } = await supabase
      .from("student_attendance_percentage")
      .select("student_id, attendance_percentage, users(full_name, id)")

    for (let student of students) {

      if (student.attendance_percentage < 75) {

        await supabase
          .from("notifications")
          .insert([{
            user_id: student.users.id,
            title: "Low Attendance Warning",
            message: `Your attendance is ${student.attendance_percentage}%. Please improve it.`
          }])

      }

    }

  } catch (err) {
    console.log("Attendance alert error:", err.message)
  }

}