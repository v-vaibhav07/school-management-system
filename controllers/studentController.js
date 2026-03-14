const supabase = require("../config/supabase")

// Student Profile
exports.getProfile = async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from("users")
    .select("id, full_name, email, role")
    .eq("id", userId)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Student Marks
exports.getMarks = async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from("marks")
    .select("*")
    .eq("student_id", userId)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Student Attendance
exports.getAttendance = async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", userId)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Student Rank
exports.getRank = async (req, res) => {
  const userId = req.user.id

  const { data, error } = await supabase
    .from("student_final_score")
    .select("*")
    .eq("student_id", userId)
    .single()

  if (error) return res.status(400).json(error)

  res.json(data)
}


// ============================
// Get All Students (Admin)
// ============================
exports.getAllStudents = async (req, res) => {

  const { data, error } = await supabase
    .from("students")
    .select(`
      id,
      roll_number,
      class_id,
      users(full_name,email),
      classes(name)
    `)

  if (error) return res.status(400).json(error)

  res.json(data)

}