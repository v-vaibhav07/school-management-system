const supabase = require("../config/supabase")

// ======================
// GET STUDENTS OF CLASS
// ======================
exports.getClassStudents = async (req, res) => {

  try {

    const { classId } = req.params

    const { data, error } = await supabase
      .from("students")
      .select(`
      id,
      admission_number,
      users!students_user_id_fkey(full_name)
`)
      .eq("class_id", classId)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const formattedStudents = data.map(student => ({
      id: student.id,
      full_name: student.users?.full_name
    }))

    res.json(formattedStudents)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })

  }

}


// ======================
// MARK ATTENDANCE
// ======================
exports.markAttendance = async (req, res) => {

  try {

    const { records } = req.body

    if (!records || records.length === 0) {

      return res.status(400).json({
        message: "No attendance records provided"
      })

    }

    const attendanceData = records.map(r => ({
      student_id: r.student_id,
      class_id: r.class_id,
      status: r.status,
      date: new Date().toISOString()
    }))

    const { error } = await supabase
      .from("attendance")
      .insert(attendanceData)

    if (error) {

      console.log(error)
      return res.status(400).json(error)

    }

    res.json({
      message: "Attendance saved successfully"
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })

  }

}


// ======================
// UPLOAD MARKS
// ======================
exports.uploadMarks = async (req, res) => {

  try {

    const { student_id, exam_id, subject, marks_obtained, max_marks } = req.body

    const { error } = await supabase
      .from("marks")
      .insert([
        {
          student_id,
          exam_id,
          subject,
          marks_obtained,
          max_marks
        }
      ])

    if (error) {

      console.log(error)

      return res.status(400).json(error)

    }

    res.json({
      message: "Marks uploaded successfully"
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      error: err.message
    })

  }

}