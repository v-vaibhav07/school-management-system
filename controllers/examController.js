const supabase = require("../config/supabase")

exports.getExams = async (req, res) => {

  try {

    const { classId } = req.query

    let query = supabase
      .from("exams")
      .select("*")

    if (classId) {
      query = query.eq("class_id", classId)
    }

    const { data, error } = await query

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json(data)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}