const supabase = require("../config/supabase")

// Get children of logged-in parent
exports.getMyChildren = async (req, res) => {
  const parentId = req.user.id

  const { data, error } = await supabase
    .from("parent_students")
    .select(`
    students(
    id,
    admission_number,
    users!students_user_id_fkey(full_name)
  )
`)
    .eq("parent_id", parentId)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Get student attendance
exports.getChildAttendance = async (req, res) => {
  const { student_id } = req.params

  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .eq("student_id", student_id)
    .order("date", { ascending: false })

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Get student marks
exports.getChildMarks = async (req, res) => {
  const { student_id } = req.params

  const { data, error } = await supabase
    .from("marks")
    .select(`
      subject,
      marks_obtained,
      max_marks,
      exams(name)
    `)
    .eq("student_id", student_id)

  if (error) return res.status(400).json(error)

  res.json(data)
}