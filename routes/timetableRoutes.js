// const express = require("express")
// const router = express.Router()
// const supabase = require("../config/supabase")

// // Create timetable entry
// router.post("/", async (req, res) => {

//   const { class_id, subject, teacher_id, day, start_time, end_time } = req.body

//   const { data, error } = await supabase
//     .from("timetables")
//     .insert([{
//       class_id,
//       subject,
//       teacher_id,
//       day,
//       start_time,
//       end_time
//     }])

//   if (error) return res.status(400).json(error)

//   res.json({
//     message: "Timetable created",
//     data
//   })

// })


// // Get timetable by class
// router.get("/class/:class_id", async (req, res) => {

//   const { class_id } = req.params

//   const { data, error } = await supabase
//     .from("timetables")
//     .select("*")
//     .eq("class_id", class_id)
//     .order("start_time")

//   if (error) return res.status(400).json(error)

//   res.json(data)

// })


// // Get timetable by teacher
// router.get("/teacher/:teacher_id", async (req, res) => {

//   const { teacher_id } = req.params

//   const { data, error } = await supabase
//     .from("timetables")
//     .select("*")
//     .eq("teacher_id", teacher_id)

//   if (error) return res.status(400).json(error)

//   res.json(data)

// })

// module.exports = router
















// const express = require("express")
// const router = express.Router()
// const supabase = require("../config/supabase")


// // =========================
// // GET TIMETABLE OF CLASS
// // =========================

// router.get("/:classId", async (req, res) => {

//   const { classId } = req.params

//   try {

//     // class info
//     const { data: classInfo } = await supabase
//       .from("classes")
//       .select("*")
//       .eq("id", classId)
//       .single()

//     // timetable
//     const { data: timetable, error } = await supabase
//       .from("timetables")
//       .select("*")
//       .eq("class_id", classId)
//       .order("day")

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     // get teacher names
//     const teacherIds = timetable.map(t => t.teacher_id)

//     let teachers = []

//     if (teacherIds.length > 0) {

//       const { data } = await supabase
//         .from("users")
//         .select("id, full_name")
//         .in("id", teacherIds)

//       teachers = data

//     }

//     const formatted = timetable.map(row => {

//       const teacher = teachers.find(
//         t => t.id === row.teacher_id
//       )

//       return {
//         ...row,
//         teacher_name: teacher?.full_name || "Unknown"
//       }

//     })

//     res.json({
//       class: classInfo,
//       timetable: formatted
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })



// // =========================
// // ADD SUBJECT TO TIMETABLE
// // =========================

// router.post("/", async (req, res) => {
  

//   const {
//     class_id,
//     subject,
//     teacher_id,
//     day,
//     start_time,
//     end_time
//   } = req.body

//   try {

//     const { data, error } = await supabase
//       .from("timetables")
//       .insert([
//         {
//           class_id,
//           subject,
//           teacher_id,
//           day,
//           start_time,
//           end_time
//         }
//       ])
//       .select()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Subject added to timetable",
//       data
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })

// router.put("/:id", async (req, res) => {

//   const { id } = req.params
//   const {
//     subject,
//     teacher_id,
//     day,
//     start_time,
//     end_time,
//     room
//   } = req.body

//   try {

//     const { data, error } = await supabase
//       .from("timetables")
//       .update({
//         subject,
//         teacher_id,
//         day,
//         start_time,
//         end_time,
//         room
//       })
//       .eq("id", id)
//       .select()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Timetable updated",
//       data
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })



// router.delete("/:id", async (req, res) => {

//   const { id } = req.params

//   try {

//     const { error } = await supabase
//       .from("timetables")
//       .delete()
//       .eq("id", id)

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Timetable entry deleted"
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// })
// module.exports = router






const express = require("express")
const router = express.Router()
const supabase = require("../config/supabase")

// =========================
// GET TIMETABLE OF CLASS
// =========================

router.get("/:classId", async (req, res) => {

  const { classId } = req.params

  try {

    const { data: classInfo, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("id", classId)
      .single()

    if (classError) return res.status(400).json(classError)

    const { data: timetable, error } = await supabase
      .from("timetables")
      .select("*")
      .eq("class_id", classId)
      .order("day")

    if (error) return res.status(400).json(error)

    const teacherIds = timetable.map(t => t.teacher_id)

    let teachers = []

    if (teacherIds.length > 0) {

      const { data } = await supabase
        .from("users")
        .select("id, full_name")
        .in("id", teacherIds)

      teachers = data

    }

    const formatted = timetable.map(row => {

      const teacher = teachers.find(t => t.id === row.teacher_id)

      return {
        ...row,
        teacher_name: teacher?.full_name || "Unknown"
      }

    })

    res.json({
      class: classInfo,
      timetable: formatted
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})


// =========================
// ADD SUBJECT TO TIMETABLE
// =========================

router.post("/", async (req, res) => {

  const {
    class_id,
    subject,
    teacher_id,
    day,
    start_time,
    end_time,
    room
  } = req.body

  try {

    // 🔴 Teacher conflict (only if teaching another class)
    const { data: teacherConflict } = await supabase
      .from("timetables")
      .select("id,class_id")
      .eq("teacher_id", teacher_id)
      .eq("day", day)
      .eq("start_time", start_time)
      .eq("end_time", end_time)
      .neq("class_id", class_id)

    if (teacherConflict && teacherConflict.length > 0) {

      return res.status(400).json({
        error: "Teacher already assigned to another class at this time"
      })

    }

    // 🔴 Same subject twice in same day
    const { data: subjectConflict } = await supabase
      .from("timetables")
      .select("id")
      .eq("class_id", class_id)
      .eq("day", day)
      .eq("subject", subject)

    if (subjectConflict && subjectConflict.length > 0) {

      return res.status(400).json({
        error: "This subject already exists in timetable for this day"
      })

    }

    // ✅ Insert timetable
    const { data, error } = await supabase
      .from("timetables")
      .insert([{
        class_id,
        subject,
        teacher_id,
        day,
        start_time,
        end_time,
        room
      }])
      .select()

    if (error) return res.status(400).json(error)

    res.json({
      message: "Subject added to timetable",
      data
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})


// =========================
// UPDATE TIMETABLE
// =========================

router.put("/:id", async (req, res) => {

  const { id } = req.params

  const {
    subject,
    teacher_id,
    day,
    start_time,
    end_time,
    room
  } = req.body

  try {

    // 🔴 Teacher conflict check (ignore same record)
    const { data: teacherConflict } = await supabase
      .from("timetables")
      .select("id")
      .eq("teacher_id", teacher_id)
      .eq("day", day)
      .eq("start_time", start_time)
      .eq("end_time", end_time)
      .neq("id", id)

    if (teacherConflict && teacherConflict.length > 0) {

      return res.status(400).json({
        error: "Teacher already assigned to another class at this time"
      })

    }

    const { data, error } = await supabase
      .from("timetables")
      .update({
        subject,
        teacher_id,
        day,
        start_time,
        end_time,
        room
      })
      .eq("id", id)
      .select()

    if (error) return res.status(400).json(error)

    res.json({
      message: "Timetable updated",
      data
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})


// =========================
// DELETE TIMETABLE
// =========================

router.delete("/:id", async (req, res) => {

  const { id } = req.params

  try {

    const { error } = await supabase
      .from("timetables")
      .delete()
      .eq("id", id)

    if (error) return res.status(400).json(error)

    res.json({
      message: "Timetable entry deleted"
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

})

module.exports = router