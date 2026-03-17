const supabase = require("../config/supabase")

exports.getDashboardStats = async (req, res) => {

  try {

    // // Total students
    // const { count: students } = await supabase
    //   .from("students")
    //   .select("*", { count: "exact", head: true })

    // NEW (CORRECT)
  const { count: students } = await supabase
  .from("users")
  .select("*", { count: "exact", head: true })
  .eq("role", "student")

    // Total teachers
    const { count: teachers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "teacher")

    // Total parents
    const { count: parents } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "parent")

    // Average attendance
    const { data: attendance } = await supabase
      .from("student_attendance_percentage")
      .select("attendance_percentage")

    let avgAttendance = 0

    if (attendance && attendance.length > 0) {
      avgAttendance =
        attendance.reduce(
          (sum, a) => sum + a.attendance_percentage,
          0
        ) / attendance.length
    }

    // Top students
    const { data: topStudents } = await supabase
      .from("student_final_score")
      .select("student_id, full_name, final_score")
      .order("final_score", { ascending: false })
      .limit(10)

    // Weak students
    const { data: weakStudents } = await supabase
      .from("student_final_score")
      .select("student_id, full_name, final_score")
      .lt("final_score", 60)

    res.json({
      students,
      teachers,
      parents,
      average_attendance: avgAttendance,
      top_students: topStudents,
      weak_students: weakStudents
    })
    const { checkLowAttendanceAlerts } =
      require("./notificationController")

    await checkLowAttendanceAlerts()
  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}


// ============================
// Class Performance Analytics
// ============================
exports.getClassPerformance = async (req, res) => {

  try {

    // Get all classes
    const { data: classes, error: classError } = await supabase
      .from("classes")
      .select("id, class_name")

    if (classError) return res.status(400).json(classError)

    const result = []

    for (let c of classes) {

      // Average score of class
      const { data: scores } = await supabase
        .from("student_final_score")
        .select("final_score")
        .eq("class_id", c.id)

      let avg_score = 0

      if (scores && scores.length > 0) {
        avg_score =
          scores.reduce((sum, s) => sum + s.final_score, 0) /
          scores.length
      }

      // Average attendance
      const { data: attendance } = await supabase
        .from("student_attendance_percentage")
        .select("attendance_percentage")
        .eq("class_id", c.id)

      let avg_attendance = 0

      if (attendance && attendance.length > 0) {
        avg_attendance =
          attendance.reduce(
            (sum, a) => sum + a.attendance_percentage,
            0
          ) / attendance.length
      }

      // Top student in class
      const { data: topStudent } = await supabase
        .from("student_final_score")
        .select("full_name, final_score")
        .eq("class_id", c.id)
        .order("final_score", { ascending: false })
        .limit(1)
        .single()

      result.push({
        class: c.class_name,
        avg_score: Math.round(avg_score),
        avg_attendance: Math.round(avg_attendance),
        top_student: topStudent ? topStudent.full_name : null
      })

    }

    res.json(result)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}


// ============================
// AI Smart Insights
// ============================
exports.getSmartInsights = async (req, res) => {

  try {

    const insights = []

    // 1️⃣ Average attendance insight
    const { data: attendance } = await supabase
      .from("student_attendance_percentage")
      .select("attendance_percentage")

    if (attendance && attendance.length > 0) {

      const avgAttendance =
        attendance.reduce(
          (sum, a) => sum + a.attendance_percentage,
          0
        ) / attendance.length

      insights.push(
        `Average attendance is ${Math.round(avgAttendance)}%`
      )

    }

    // 2️⃣ Students at risk
    const { data: weakStudents } = await supabase
      .from("student_final_score")
      .select("student_id")
      .lt("final_score", 40)

    insights.push(
      `${weakStudents.length} students are at high academic risk`
    )

    // 3️⃣ Fee collection this month
    const monthStart = new Date()
    monthStart.setDate(1)

    const { data: payments } = await supabase
      .from("fee_payments")
      .select("amount, created_at")
      .gte("created_at", monthStart.toISOString())

    let monthlyCollection = 0

    payments.forEach(p => {
      monthlyCollection += p.amount
    })

    insights.push(
      `Total fee collected this month is ₹${monthlyCollection}`
    )

    res.json({
      insights
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}