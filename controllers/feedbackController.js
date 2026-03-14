const supabase = require("../config/supabase")

// Student submit feedback
exports.submitFeedback = async (req, res) => {
  const { teacher_id, class_id, rating, feedback } = req.body

  const { data, error } = await supabase
    .from("teacher_feedback")
    .insert([
      {
        teacher_id,
        student_id: req.user.id,
        class_id,
        rating,
        feedback
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Feedback submitted successfully" })
}

// Admin view feedback
exports.getTeacherFeedback = async (req, res) => {
  const { teacher_id } = req.params

  const { data, error } = await supabase
    .from("teacher_feedback")
    .select(`
      rating,
      feedback,
      created_at,
      students(
        admission_number
      )
    `)
    .eq("teacher_id", teacher_id)

  if (error) return res.status(400).json(error)

  res.json(data)
}

// Admin average rating
exports.getTeacherRating = async (req, res) => {
  const { teacher_id } = req.params

  const { data, error } = await supabase
    .from("teacher_feedback")
    .select("rating")
    .eq("teacher_id", teacher_id)

  if (error) return res.status(400).json(error)

  const avg =
    data.reduce((sum, r) => sum + r.rating, 0) / (data.length || 1)

  res.json({
    teacher_id,
    average_rating: avg.toFixed(2),
    total_feedback: data.length
  })
}