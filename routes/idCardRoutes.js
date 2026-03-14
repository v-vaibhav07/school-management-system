const express = require("express")
const router = express.Router()
const supabase = require("../config/supabase")
const PDFDocument = require("pdfkit")
const QRCode = require("qrcode")

// Generate Student ID Card
router.get("/:student_id", async (req, res) => {

  const { student_id } = req.params

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", student_id)
    .single()

  if (error) return res.status(400).json(error)

  const student = data

  const doc = new PDFDocument({
    size: [350, 200],
    margin: 10
  })

  res.setHeader("Content-Type", "application/pdf")
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${student.full_name}_id_card.pdf`
  )

  doc.pipe(res)

  // School Title
  doc.fontSize(16).text("Shri Durga Ji Public School", { align: "center" })

  doc.moveDown()

  // Student Info
  doc.fontSize(12).text(`Name: ${student.full_name}`)
  doc.text(`Class: ${student.class_id}`)
  doc.text(`Roll No: ${student.roll_number}`)

  doc.moveDown()

  // QR Code
  const qr = await QRCode.toDataURL(student_id)

  doc.image(qr, 250, 80, { width: 80 })

  doc.end()

})

module.exports = router