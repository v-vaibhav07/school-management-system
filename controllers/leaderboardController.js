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


const supabase = require("../config/supabase")

exports.getLeaderboard = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from("student_final_score")
      .select("*")
      .order("final_score", { ascending: false })
      .limit(10)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}