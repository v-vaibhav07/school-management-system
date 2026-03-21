const supabase = require("../config/supabase")

// // ======================
// // GET STUDENTS OF CLASS
// // ======================
// exports.getClassStudents = async (req, res) => {

//   try {

//     const { classId } = req.params

//     const { data, error } = await supabase
//       .from("students")
//       .select(`
//       id,
//       admission_number,
//       users!students_user_id_fkey(full_name)
// `)
//       .eq("class_id", classId)

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     const formattedStudents = data.map(student => ({
//       id: student.id,
//       full_name: student.users?.full_name
//     }))

//     res.json(formattedStudents)

//   } catch (err) {

//     console.log(err)

//     res.status(500).json({
//       error: err.message
//     })

//   }

// }


exports.getClassStudents = async (req, res) => {

  try {

    const { classId } = req.params

    const { data, error } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        phone,
        parent_name,
        parent_phone,
        address,
        users!students_user_id_fkey(full_name)
      `)
      .eq("class_id", classId)
      .order("roll_number", { ascending: true })

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const formatted = data.map(s => ({
      id: s.id,
      roll_number: s.roll_number,
      full_name: s.users?.full_name,
      phone: s.phone,
      parent_name: s.parent_name,
      parent_phone: s.parent_phone,
      address: s.address
    }))

    res.json(formatted)

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: err.message })

  }

}




// ======================
// MARK ATTENDANCE
// ======================
// exports.markAttendance = async (req, res) => {

//   try {

//     const { records } = req.body

//     if (!records || records.length === 0) {

//       return res.status(400).json({
//         message: "No attendance records provided"
//       })

//     }

//     const attendanceData = records.map(r => ({
//       student_id: r.student_id,
//       class_id: r.class_id,
//       status: r.status,
//       date: new Date().toISOString()
//     }))

//     // const { error } = await supabase
//     //   .from("attendance")
//     //   .insert(attendanceData)
//     const { error } = await supabase
//   .from("attendance")
//   .upsert(attendanceData, {
//     onConflict: ["student_id", "date"]
//   })

//     if (error) {

//       console.log(error)
//       return res.status(400).json(error)

//     }

//     res.json({
//       message: "Attendance saved successfully"
//     })

//   } catch (err) {

//     console.log(err)

//     res.status(500).json({
//       error: err.message
//     })

//   }

// }
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
      date: r.date
    }))

    const { error } = await supabase
      .from("attendance")
      .upsert(attendanceData, {
        onConflict: ["student_id", "date"]
      })

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Attendance saved/updated successfully ✅"
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


// ======================
// GET MY CLASS (CLASS TEACHER)
// ======================
// exports.getMyClass = async (req, res) => {

//   try {

//     const teacherId = req.user.id   // token se aayega

//     const { data, error } = await supabase
//       .from("classes")
//       .select(`
//         id,
//         class_name,
//         section,
//         academic_year,
//         monitor_student,
//         students(count)
//       `)
//       .eq("class_teacher_id", teacherId)
//       .single()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json(data)

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: err.message })

//   }

// }
exports.getMyClass = async (req, res) => {

  try {

    const teacherId = req.user.id

    // 1️⃣ Get class
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("class_teacher_id", teacherId)
      .single()

    if (classError) {
      console.log("Class error:", classError)
      return res.status(400).json(classError)
    }

    // 2️⃣ Count students
    const { count, error: countError } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true })
      .eq("class_id", classData.id)

    if (countError) {
      console.log("Count error:", countError)
      return res.status(400).json(countError)
    }

    // 3️⃣ Send response
    res.json({
      ...classData,
      student_count: count
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: err.message })

  }

}


exports.getAttendanceByDate = async (req, res) => {

  try {

    const { classId } = req.params
    const { date } = req.query

    const { data, error } = await supabase
      .from("attendance")
      .select(`
        student_id,
        status
      `)
      .eq("class_id", classId)
      .eq("date", date)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json(data)

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: err.message })

  }

}


exports.getMonthlyAttendance = async (req, res) => {

  try {

    const { classId } = req.params
    const { month } = req.query // format: 2026-03

    const start = `${month}-01`
    const end = `${month}-31`

    const { data, error } = await supabase
      .from("attendance")
      .select("status")
      .eq("class_id", classId)
      .gte("date", start)
      .lte("date", end)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const total = data.length
    const present = data.filter(d => d.status === "present").length
    const absent = total - present

    res.json({
      total,
      present,
      absent,
      percentage: total ? Math.round((present / total) * 100) : 0
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }

}




exports.getTodayAttendance = async (req, res) => {

  try {

    const { classId } = req.params
    const today = new Date().toISOString().split("T")[0]

    const { data, error } = await supabase
      .from("attendance")
      .select("status")
      .eq("class_id", classId)
      .eq("date", today)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const total = data.length
    const present = data.filter(d => d.status === "present").length
    const absent = total - present

    res.json({
      total,
      present,
      absent,
      percentage: total ? Math.round((present / total) * 100) : 0
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }

}



exports.getTodos = async (req, res) => {
  try {
    const teacherId = req.user.id

    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false })

    if (error) return res.status(400).json(error)

    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.addTodo = async (req, res) => {
  try {
    const teacherId = req.user.id
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ message: "Text required" })
    }

    await supabase
      .from("todos")
      .insert([{ teacher_id: teacherId, text }])

    res.json({ message: "Added" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.toggleTodo = async (req, res) => {

  const { id } = req.params

  try {

    // get current
    const { data } = await supabase
      .from("todos")
      .select("completed")
      .eq("id", id)
      .single()

    // toggle
    const { error } = await supabase
      .from("todos")
      .update({ completed: !data.completed })
      .eq("id", id)

    if (error) return res.status(400).json(error)

    res.json({ message: "Updated" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}


exports.deleteTodo = async (req, res) => {

  const { id } = req.params

  try {

    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id)

    if (error) return res.status(400).json(error)

    res.json({ message: "Deleted" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}


exports.getTodayAttendanceList = async (req, res) => {

  try {

    const { classId } = req.params
    const today = new Date().toISOString().split("T")[0]

    const { data, error } = await supabase
      .from("attendance")
      .select(`
        status,
        students:student_id (
          id,
          roll_number,
          users:students_user_id_fkey(full_name)
        )
      `)
      .eq("class_id", classId)
      .eq("date", today)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const formatted = data.map(a => ({
      id: a.students.id,
      name: a.students.users?.full_name, // ✅ FIXED
      roll: a.students.roll_number,
      status: a.status
    }))

    // ✅ SORT IN JS
    formatted.sort((a, b) => a.roll - b.roll)

    res.json(formatted)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

}



exports.getMonthlyFull = async (req, res) => {
  try {

    const { classId } = req.params
    const { month } = req.query

    if (!month) {
      return res.status(400).json({ error: "Month required" })
    }

    const startDate = `${month}-01`

    const lastDay = new Date(
      new Date(`${month}-01`).getFullYear(),
      new Date(`${month}-01`).getMonth() + 1,
      0
    ).getDate()

    const endDate = `${month}-${lastDay}`

    // ✅ FIXED STUDENTS QUERY
    const { data: students, error: sErr } = await supabase
      .from("students")
      .select(`
        id,
        roll_number,
        users!students_user_id_fkey(full_name)
      `)
      .eq("class_id", classId)

    if (sErr) return res.status(400).json(sErr)

    // attendance
    const { data: attendance, error: aErr } = await supabase
      .from("attendance")
      .select("student_id, status, date")
      .eq("class_id", classId)
      .gte("date", startDate)
      .lte("date", endDate)

    if (aErr) return res.status(400).json(aErr)

    const map = {}

    attendance.forEach(a => {
      if (!map[a.student_id]) map[a.student_id] = {}
      const day = new Date(a.date).getDate()
      map[a.student_id][day] = a.status
    })

    // ✅ FINAL FIX
    const result = students.map(s => ({
      id: s.id,
      name: s.users?.full_name || "-",
      roll: s.roll_number,
      attendance: map[s.id] || {}
    }))

    res.json(result)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



exports.getTodayClasses = async (req, res) => {
  try {

    const teacherId = req.user.id

    // ✅ get today's day
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const today = days[new Date().getDay()]

    const { data, error } = await supabase
      .from("timetables")
      .select(`
        start_time,
        end_time,
        room,
        subject,
        classes:class_id (
          class_name,
          section
        )
      `)
      .eq("teacher_id", teacherId)
      .eq("day", today)
      .order("start_time", { ascending: true })

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const formatted = data.map(d => ({
      class: `${d.classes.class_name} ${d.classes.section}`,
      subject: d.subject,
      time: `${d.start_time} - ${d.end_time}`,
      room: d.room
    }))

    res.json(formatted)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



exports.getMyClasses = async (req, res) => {
  try {

    const teacherId = req.user.id

    const { data, error } = await supabase
      .from("timetables")
      .select(`
        subject,
        class_id,
        classes:class_id (
          class_name,
          section
        )
      `)
      .eq("teacher_id", teacherId)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    // ✅ remove duplicates
    const uniqueMap = {}

    data.forEach(d => {
      const key = d.class_id

      if (!uniqueMap[key]) {
        uniqueMap[key] = {
          id: d.class_id, 
          class: `${d.classes.class_name} ${d.classes.section}`,
          subject: d.subject
        }
      }
    })

    res.json(Object.values(uniqueMap))

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getHomeworkClasses = async (req, res) => {
  try {

    const teacherId = req.user.id

    // 🔥 get classes from timetable
    const { data, error } = await supabase
      .from("timetables")
      .select(`
        class_id,
        classes:class_id (
          id,
          class_name,
          section,
          monitor_student_id
        )
      `)
      .eq("teacher_id", teacherId)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    // ✅ remove duplicates
    const unique = {}

    data.forEach(d => {
      if (!unique[d.class_id]) {
        unique[d.class_id] = d.classes
      }
    })

    //  get student count
    const { data: students } = await supabase
      .from("students")
      .select("class_id")

    // get monitor ids
    const monitorIds = Object.values(unique)
      .map(c => c.monitor_student_id)
      .filter(Boolean)

    let monitors = []

    if (monitorIds.length > 0) {
      const { data: users } = await supabase
        .from("students")
        .select(`
          id,
          users:students_user_id_fkey(full_name)
        `)
        .in("id", monitorIds)

      monitors = users
    }

    // ✅ final format
    const result = Object.values(unique).map(cls => {

      const studentCount = students.filter(s => s.class_id === cls.id).length

      const monitor = monitors.find(m => m.id === cls.monitor_student_id)

      return {
        id: cls.id,
        class: `${cls.class_name} ${cls.section}`,
        students: studentCount,
        monitor: monitor?.users?.full_name || "Not Assigned"
      }

    })

    res.json(result)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



exports.addHomework = async (req, res) => {
  try {

    const teacherId = req.user.id
    const { title, description, due_date, class_id } = req.body

    let file_url = null

    if (req.file) {
      file_url = req.file.path
    }

    const { error } = await supabase
      .from("homework")
      .insert([
        {
          title,
          description,
          due_date,
          class_id,
          teacher_id: teacherId,
          file_url
        }
      ])

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({ message: "Homework added" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}



exports.getTeacherClassesWithCount = async (req, res) => {
  try {

    const teacherId = req.user.id

    // 🔥 get classes from timetable
    const { data, error } = await supabase
      .from("timetables")
      .select(`
        class_id,
        classes:class_id (
          id,
          class_name,
          section
        )
      `)
      .eq("teacher_id", teacherId)

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    // ✅ remove duplicates
    const unique = {}

    data.forEach(d => {
      if (!unique[d.class_id]) {
        unique[d.class_id] = d.classes
      }
    })

    // 🔥 get student count
    const { data: students } = await supabase
      .from("students")
      .select("class_id")

    const result = Object.values(unique).map(cls => {
      const count = students.filter(s => s.class_id === cls.id).length

      return {
        id: cls.id,
        class: `${cls.class_name} ${cls.section}`,
        students: count
      }
    })

    res.json(result)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}




// ======================
// CLASS CHAT - GET MESSAGES
// ======================
exports.getClassMessages = async (req, res) => {
  try {

    const { class_id } = req.params

    const { data, error } = await supabase
      .from("class_messages")
      .select(`
        id,
        message,
        created_at,
        sender_role,
        users:sender_id (full_name)
      `)
      .eq("class_id", class_id)
      .order("created_at", { ascending: true })

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    const formatted = data.map(m => ({
      id: m.id,
      message: m.message,
      created_at: m.created_at,
      role: m.sender_role,
      sender_name: m.users?.full_name
    }))

    res.json(formatted)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// ======================
// CLASS CHAT - SEND MESSAGE
// ======================
exports.sendClassMessage = async (req, res) => {
  try {

    const { class_id, message } = req.body
    const teacherId = req.user.id

    // 🔥 CHECK TEACHER ALLOWED
    const { data: allowed } = await supabase
      .from("timetables")
      .select("id")
      .eq("teacher_id", teacherId)
      .eq("class_id", class_id)

    if (!allowed || allowed.length === 0) {
      return res.status(403).json({
        error: "You are not allowed to message this class ❌"
      })
    }

    const { error } = await supabase
      .from("class_messages")
      .insert([{
        class_id,
        sender_id: teacherId,
        message,
        sender_role: "teacher"
      }])

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({ message: "Message sent ✅" })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


// GET ANNOUNCEMENTS FOR TEACHER
exports.getTeacherAnnouncements = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("class_announcements")   // ✅ FIXED
      .select("*")
      .in("target_type", ["teacher", "all"]) // ✅ correct column
      .order("created_at", { ascending: false })

    if (error) return res.status(400).json(error)

    res.json(data)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getTimetableClasses = async (req, res) => {
  try {
    const teacherId = req.user.id

    const { data, error } = await supabase
      .from("timetables")
      .select(`
        class_id,
        subject,
        classes (class_name, section)
      `)
      .eq("teacher_id", teacherId)

    if (error) throw error

    // remove duplicates
    const unique = []
    const map = new Set()

    data.forEach(item => {
      const key = item.class_id + item.subject
      if (!map.has(key)) {
        map.add(key)
        unique.push(item)
      }
    })

    res.json(unique)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


exports.saveMarks = async (req, res) => {
  try {

    const marksData = req.body

    const records = marksData.map(m => ({
      student_id: m.student_id,
      exam_id: m.exam_id,   // ✅ FIXED
      subject: m.subject,
      marks_obtained: m.marks_obtained,
      max_marks: m.max_marks
    }))

    const { error } = await supabase
      .from("marks")
      .upsert(records, {
        onConflict: ["student_id", "subject", "exam_id"] // ✅ FIXED
      })

    if (error) throw error

    res.json({ message: "Marks saved successfully ✅" })

  } catch (err) {
    console.log("SAVE ERROR:", err)
    res.status(500).json({ error: err.message })
  }
}

exports.getMarks = async (req, res) => {
  try {

    const { classId } = req.params
    const { subject, examId } = req.query

    const { data: students } = await supabase
      .from("students")
      .select("id")
      .eq("class_id", classId)

    const studentIds = students.map(s => s.id)

    const { data, error } = await supabase
      .from("marks")
      .select("student_id, marks_obtained")
      .in("student_id", studentIds)
      .eq("subject", subject)
      .eq("exam_id", examId)   // ✅ FIXED

    if (error) throw error

    res.json(data || [])

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}