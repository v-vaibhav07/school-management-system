const supabase = require("../config/supabase")

// Create assignment
exports.createAssignment = async (req, res) => {
  const { title, description, class_id, due_date } = req.body

  const { data, error } = await supabase
    .from("assignments")
    .insert([
      {
        title,
        description,
        class_id,
        teacher_id: req.user.id,
        due_date
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Assignment created" })
}

// Get assignments for student
exports.getAssignments = async (req, res) => {
  const { class_id } = req.query

  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("class_id", class_id)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Submit assignment
exports.submitAssignment = async (req, res) => {
  const { assignment_id, student_id, file_url } = req.body

  const { data, error } = await supabase
    .from("assignment_submissions")
    .insert([
      {
        assignment_id,
        student_id,
        file_url
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Assignment submitted" })
}