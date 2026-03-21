// const supabase = require("../config/supabase")

// exports.getExams = async (req, res) => {

//   try {

//     const { classId } = req.query

//     let query = supabase
//       .from("exams")
//       .select("*")

//     if (classId) {
//       query = query.eq("class_id", classId)
//     }

//     const { data, error } = await query

//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }

//     res.json(data)

//   } catch (err) {

//     res.status(500).json({ error: err.message })

//   }

// }




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


exports.createExam = async (req, res) => {
  try {

    const { name, exam_type, academic_year } = req.body

    if (!name) {
      return res.status(400).json({ error: "Exam name required" })
    }

    const { error } = await supabase
      .from("exams")
      .insert([
        {
          name,
          exam_type,
          academic_year
        }
      ])

    if (error) throw error

    res.json({ message: "Exam created successfully ✅" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}