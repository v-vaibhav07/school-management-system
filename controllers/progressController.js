const supabase = require("../config/supabase")

// Single student progress
exports.getStudentProgress = async (req, res) => {

  const { student_id } = req.params

  const { data, error } = await supabase
    .from("student_final_score")
    .select("*")
    .eq("student_id", student_id)

  if (error) {
    return res.status(500).json({ error })
  }

  res.json(data)
}


// Admin: all students progress
exports.getAllStudentsProgress = async (req, res) => {

  const { data, error } = await supabase
    .from("student_final_score")
    .select("*")
    .order("final_score", { ascending: false })

  if (error) {
    return res.status(500).json({ error })
  }

  res.json(data)
}