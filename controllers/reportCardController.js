const PDFDocument = require("pdfkit")
const supabase = require("../config/supabase")

exports.generateReportCard = async (req, res) => {
  const { student_id } = req.params

  // Get student info
  const { data: student } = await supabase
    .from("students")
    .select(`
      id,
      admission_number,
      users(full_name)
    `)
    .eq("id", student_id)
    .single()

  // Get marks
  const { data: marks } = await supabase
    .from("marks")
    .select("subject, marks_obtained, max_marks")
    .eq("student_id", student_id)

  const total = marks.reduce((sum, m) => sum + m.marks_obtained, 0)
  const maxTotal = marks.reduce((sum, m) => sum + m.max_marks, 0)

  const percentage = ((total / maxTotal) * 100).toFixed(2)

  const doc = new PDFDocument()

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=report_card_${student_id}.pdf`
  )

  res.setHeader("Content-Type", "application/pdf")

  doc.pipe(res)

  doc.fontSize(22).text("SDJPS School Report Card", { align: "center" })

  doc.moveDown()

  doc.fontSize(14).text(`Student: ${student.users.full_name}`)
  doc.text(`Admission No: ${student.admission_number}`)

  doc.moveDown()

  doc.text("Subjects:")

  marks.forEach((m) => {
    doc.text(`${m.subject}: ${m.marks_obtained}/${m.max_marks}`)
  })

  doc.moveDown()

  doc.text(`Total: ${total}/${maxTotal}`)
  doc.text(`Percentage: ${percentage}%`)

  doc.end()
}