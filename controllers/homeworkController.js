const supabase = require("../config/supabase")

// Teacher create homework
exports.createHomework = async (req, res) => {
  const { class_id, title, description, due_date } = req.body

  const { data, error } = await supabase
    .from("homework")
    .insert([
      {
        class_id,
        teacher_id: req.user.id,
        title,
        description,
        due_date
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Homework created successfully" })
}

// Students view homework
exports.getHomeworkByClass = async (req, res) => {
  const { class_id } = req.params

  const { data, error } = await supabase
    .from("homework")
    .select("*")
    .eq("class_id", class_id)
    .order("created_at", { ascending: false })

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Student submit homework
exports.submitHomework = async (req, res) => {
  const { homework_id, submission_text } = req.body

  const { data, error } = await supabase
    .from("homework_submissions")
    .insert([
      {
        homework_id,
        student_id: req.user.id,
        submission_text
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Homework submitted successfully" })
}

// Teacher grade homework
exports.gradeHomework = async (req, res) => {
  const { submission_id } = req.params
  const { grade, feedback } = req.body

  const { data, error } = await supabase
    .from("homework_submissions")
    .update({
      grade,
      feedback
    })
    .eq("id", submission_id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Homework graded successfully" })
}