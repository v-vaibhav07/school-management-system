const supabase = require("../config/supabase")

// Admin create fee structure
// exports.createFeeStructure = async (req, res) => {
//   const { class_id, amount, due_date } = req.body

//   const { data, error } = await supabase
//     .from("fee_structure")
//     .insert([{ class_id, amount, due_date }])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Fee structure created" })
// }

// // Student view fee
exports.getStudentFees = async (req, res) => {
  const { student_id } = req.params

  const { data, error } = await supabase
    .from("fee_payments")
    .select("*")
    .eq("student_id", student_id)

  if (error) return res.status(400).json(error)

  res.json(data)
}

exports.createFeeStructure = async (req, res) => {

  const { class_id, amount, due_date } = req.body

  try {

    // 1️⃣ Create fee structure
    const { data: fee, error: feeError } = await supabase
      .from("fee_structure")
      .insert([{ class_id, amount, due_date }])
      .select()
      .single()

    if (feeError) return res.status(400).json(feeError)

    // 2️⃣ Find students of that class
    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("class_id", class_id)

    if (studentError) return res.status(400).json(studentError)

    // 3️⃣ Prepare student fee records
    const studentFees = students.map(student => ({
      student_id: student.id,
      fee_id: fee.id,
      amount: amount,
      status: "pending"
    }))

    // 4️⃣ Insert into student_fees
    const { error: assignError } = await supabase
      .from("student_fees")
      .insert(studentFees)

    if (assignError) return res.status(400).json(assignError)

    res.json({
      message: "Fee structure created and assigned to students"
    })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }

}


// Pay fee
// exports.payFee = async (req, res) => {
  
//   const { student_id, fee_id, amount, payment_method } = req.body

//   const { data, error } = await supabase
//     .from("fee_payments")
//     .insert([
//       {
//         student_id,
//         fee_id,
//         amount,
//         payment_method,
//         payment_status: "paid"
//       }
//     ])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Payment recorded successfully" })
// }

exports.payFee = async (req, res) => {

  const { fee_id, amount, payment_method } = req.body

  // find student using logged-in user
  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("id")
    .eq("user_id", req.user.id)
    .single()

  if (studentError) return res.status(400).json(studentError)

  const { data, error } = await supabase
    .from("fee_payments")
    .insert([
      {
        student_id: student.id,
        fee_id,
        amount,
        payment_method,
        payment_status: "paid"
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Payment recorded successfully" })
}



// Student Fee Dashboard
exports.getStudentFeeDashboard = async (req, res) => {

  const user_id = req.user.id

  try {

    // 1️⃣ Get student record
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")
      .eq("user_id", user_id)
      .single()

    if (studentError) return res.status(400).json(studentError)

    // 2️⃣ Get fee structure for student's class
    const { data: feeStructure, error: feeError } = await supabase
      .from("fee_structure")
      .select("*")
      .eq("class_id", student.class_id)
      .single()

    if (feeError) return res.status(400).json(feeError)

    // 3️⃣ Get payments made by student
    const { data: payments, error: paymentError } = await supabase
      .from("fee_payments")
      .select("amount")
      .eq("student_id", student.id)

    if (paymentError) return res.status(400).json(paymentError)

    // 4️⃣ Calculate paid fee
    let paid_fee = 0
    payments.forEach(p => {
      paid_fee += p.amount
    })

    const total_fee = feeStructure.amount
    const pending_fee = total_fee - paid_fee

    // 5️⃣ Late fine calculation
    const today = new Date()
    const dueDate = new Date(feeStructure.due_date)

    let late_fine = 0

    if (today > dueDate && pending_fee > 0) {
      const daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
      late_fine = daysLate * 10 // ₹10 per day fine
    }

    res.json({
      total_fee,
      paid_fee,
      pending_fee,
      due_date: feeStructure.due_date,
      late_fine
    })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }

}


// ============================
// Admin Financial Dashboard
// ============================
exports.getAdminFinanceDashboard = async (req, res) => {

  try {

    // 1️⃣ Total fee collected
    const { data: payments, error: paymentError } = await supabase
      .from("fee_payments")
      .select("amount")

    if (paymentError) return res.status(400).json(paymentError)

    let total_collected = 0
    payments.forEach(p => {
      total_collected += p.amount
    })


    // 2️⃣ Total expected fee
    const { data: feeStructures, error: feeError } = await supabase
      .from("fee_structure")
      .select("class_id, amount")

    if (feeError) return res.status(400).json(feeError)

    const { data: students, error: studentError } = await supabase
      .from("students")
      .select("id, class_id")

    if (studentError) return res.status(400).json(studentError)

    let total_expected = 0

    students.forEach(student => {
      const fee = feeStructures.find(f => f.class_id === student.class_id)
      if (fee) {
        total_expected += fee.amount
      }
    })

    const pending_fees = total_expected - total_collected


    // 3️⃣ Students with pending fee
    let students_due = 0

    for (let student of students) {

      const fee = feeStructures.find(f => f.class_id === student.class_id)

      if (!fee) continue

      const { data: studentPayments } = await supabase
        .from("fee_payments")
        .select("amount")
        .eq("student_id", student.id)

      let paid = 0
      studentPayments.forEach(p => paid += p.amount)

      if (paid < fee.amount) {
        students_due++
      }

    }


    // 4️⃣ Today's collection
    const today = new Date().toISOString().split("T")[0]

    const { data: todayPayments, error: todayError } = await supabase
      .from("fee_payments")
      .select("amount, created_at")
      .gte("created_at", today)

    if (todayError) return res.status(400).json(todayError)

    let today_collection = 0
    todayPayments.forEach(p => today_collection += p.amount)


    res.json({
      total_collected,
      pending_fees,
      students_due,
      today_collection
    })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }

}


// ============================
// Monthly Revenue Analytics
// ============================
exports.getMonthlyRevenue = async (req, res) => {

  try {

    const { data: payments, error } = await supabase
      .from("fee_payments")
      .select("amount, created_at")

    if (error) return res.status(400).json(error)

    const revenue = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0
    }

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ]

    payments.forEach(payment => {

      const date = new Date(payment.created_at)
      const monthIndex = date.getMonth()

      const monthName = months[monthIndex]

      revenue[monthName] += payment.amount

    })

    res.json(revenue)

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }

}