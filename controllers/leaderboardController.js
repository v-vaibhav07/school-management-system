// import supabase from "../config/supabase.js"

// export const getLeaderboard = async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .order("final_score", { ascending: false }) // highest marks first
//       .limit(10)

//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }

//     res.json(data)

//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }

// }


// const supabase = require("../config/supabase")

// exports.getLeaderboard = async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .order("final_score", { ascending: false })
//       .limit(10)

//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }

//     res.json(data)

//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }

// }

// exports.getLeaderboard = async (req, res) => {

//   try {

//     const { classId, examId } = req.query

//     const { data, error } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .eq("class_id", classId)
//       .order("final_score", { ascending: false })

//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }

//     res.json(data)

//   } catch (err) {

//     res.status(500).json({ error: err.message })

//   }

// }



// exports.getLeaderboard = async (req, res) => {

//   try {

//     const { classId, examId } = req.query

//     const { data, error } = await supabase
//       .from("student_final_score")
//       .select("*")
//       .eq("class_id", classId)
//       .order("final_score", { ascending: false })

//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }

//     // rank add karna
//     const ranked = data.map((student, index) => ({
//       ...student,
//       rank: index + 1
//     }))

//     res.json(ranked)

//   } catch (err) {

//     res.status(500).json({ error: err.message })

//   }

// }

// const supabase = require("../config/supabase")
// exports.getLeaderboard = async (req, res) => {

//   try {

//     const { classId, examId } = req.query

//     let query = supabase
//       .from("student_final_score")
//       .select("*")
//       .eq("class_id", classId)

//     if (examId) {
//       query = query.eq("exam_id", examId)
//     }

//     const { data, error } = await query.order("final_score", { ascending: false })

//     if (error) {
//       return res.status(500).json({ error: error.message })
//     }

//     const ranked = data.map((student, index) => ({
//       ...student,
//       rank: index + 1
//     }))

//     res.json(ranked)

//   } catch (err) {

//     res.status(500).json({ error: err.message })

//   }

// }















const supabase = require("../config/supabase")

// ============================
// LEADERBOARD
// ============================

exports.getLeaderboard = async (req, res) => {

  try {

    const { classId, examId } = req.query

    let query = supabase
      .from("student_final_score")
      .select("*")
      .eq("class_id", classId)

    if (examId) {
      query = query.eq("exam_id", examId)
    }

    const { data, error } = await query.order("final_score", { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    const ranked = data.map((student, index) => ({
      ...student,
      rank: index + 1
    }))

    res.json(ranked)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}

// ============================
// STUDENT SUBJECT MARKS
// ============================

exports.getStudentMarks = async (req, res) => {

  try {

    const { studentId, examId } = req.query

    const { data, error } = await supabase
      .from("marks")
      .select("id, subject, marks_obtained")
      .eq("student_id", studentId)
      .eq("exam_id", examId)
      .order("subject")

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json(data)

  } catch (err) {

    res.status(500).json({ error: err.message })

  }

}