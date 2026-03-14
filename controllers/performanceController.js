const supabase = require("../config/supabase")

exports.getStudentPerformance = async (req, res) => {

  const { student_id } = req.params

  const { data, error } = await supabase
    .from("marks")
    .select(`
      exam_id,
      marks_obtained,
      max_marks,
      exams(name)
    `)
    .eq("student_id", student_id)

  if (error) {
    return res.status(500).json({ error })
  }

  const formatted = data.map((m) => ({
    exam: m.exams.name,
    percentage: ((m.marks_obtained / m.max_marks) * 100).toFixed(2)
  }))

  res.json(formatted)
}