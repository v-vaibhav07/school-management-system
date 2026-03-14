const supabase = require("../config/supabase")

// Create class
exports.createClass = async (req, res) => {
  const { class_name } = req.body

  const { data, error } = await supabase
    .from("classes")
    .insert([{ class_name }])

  if (error) return res.status(400).json(error)

  res.json({ message: "Class created successfully" })
}

// Create exam
exports.createExam = async (req, res) => {
  const { name, class_id } = req.body

  const { data, error } = await supabase
    .from("exams")
    .insert([{ name, class_id }])

  if (error) return res.status(400).json(error)

  res.json({ message: "Exam created successfully" })
}

// Get all students
exports.getStudents = async (req, res) => {
  const { data, error } = await supabase
    .from("students")
    .select(`
      id,
      admission_number,
      class_id,
      users(full_name,email)
    `)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// School leaderboard
exports.getSchoolLeaderboard = async (req, res) => {
  const { data, error } = await supabase
    .from("student_final_score")
    .select("*")
    .order("final_score", { ascending: false })
    .limit(10)

  if (error) return res.status(400).json(error)

  res.json(data)
}