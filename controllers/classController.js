

// GET ALL CLASSES
// exports.getClasses = async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("classes")
//       .select(`
//         id,
//         class_name,
//         section,
//         academic_year
//       `)
//       .order("class_name", { ascending: true })

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json(data)

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// }









// ye working wala h pura******************************************************
// const supabase = require("../config/supabase")
// // GET ALL CLASSES WITH STUDENT COUNT
// exports.getClasses = async (req, res) => {

//   try {

//     const { data, error } = await supabase
//       .from("classes")
//       .select(`
//         id,
//         class_name,
//         section,
//         academic_year,
//         students(count)
//       `)
//       .order("class_name", { ascending: true })

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json(data)

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// }

// // CREATE CLASS
// exports.createClass = async (req, res) => {

//   const { class_name, section, academic_year } = req.body

//   try {

//     const { data, error } = await supabase
//       .from("classes")
//       .insert([
//         {
//           class_name,
//           section,
//           academic_year
//         }
//       ])
//       .select()

//     if (error) {
//       console.log(error)
//       return res.status(400).json(error)
//     }

//     res.json({
//       message: "Class created successfully",
//       data
//     })

//   } catch (err) {

//     console.log(err)
//     res.status(500).json({ error: "Server error" })

//   }

// }

















const supabase = require("../config/supabase")

// =========================
// GET ALL CLASSES
// =========================

exports.getClasses = async (req, res) => {

  try {

    // 1️⃣ get classes
    const { data: classes, error } = await supabase
      .from("classes")
      .select("*")
      .order("class_name", { ascending: true })

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    // 2️⃣ get students
    const { data: students } = await supabase
      .from("students")
      .select("class_id")

    // 3️⃣ get teachers
    const teacherIds = classes
      .filter(c => c.class_teacher_id)
      .map(c => c.class_teacher_id)

    let teachers = []

    if (teacherIds.length > 0) {

      const { data } = await supabase
        .from("users")
        .select("id, full_name")
        .in("id", teacherIds)

      teachers = data

    }

    // 4️⃣ format response
    const formatted = classes.map(cls => {

      const studentCount = students.filter(
        s => s.class_id === cls.id
      ).length

      const teacher = teachers.find(
        t => t.id === cls.class_teacher_id
      )

      return {

        ...cls,
        teacher_name: teacher ? teacher.full_name : null,
        students: [{ count: studentCount }]

      }

    })

    res.json(formatted)

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

}


// =========================
// CREATE CLASS
// =========================

exports.createClass = async (req, res) => {

  const { class_name, section, academic_year } = req.body

  try {

    const { data, error } = await supabase
      .from("classes")
      .insert([
        {
          class_name,
          section,
          academic_year
        }
      ])
      .select()

    if (error) {
      console.log(error)
      return res.status(400).json(error)
    }

    res.json({
      message: "Class created successfully",
      data
    })

  } catch (err) {

    console.log(err)
    res.status(500).json({ error: "Server error" })

  }

}