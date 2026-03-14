const supabase = require("../config/supabase")

exports.getRiskStudents = async (req, res) => {

  const { data, error } = await supabase
    .from("student_performance")
    .select("*")

  if (error) {
    return res.status(500).json({ error })
  }

  const riskStudents = data.filter(student => {

    const lowScore = student.final_score < 60
    const lowAttendance = student.attendance_percentage < 75

    return lowScore || lowAttendance
  })

  res.json(riskStudents)
}