const supabase = require("../config/supabase")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Register
exports.register = async (req, res) => {
  const { full_name, email, password, role, phone } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name,
        email,
        password_hash: hashedPassword,
        role,
        phone
      }
    ])
    .select()

  if (error) return res.status(400).json(error)

  res.status(201).json({
    message: "User registered successfully",
    user: data[0]
  })
}

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)

  if (error || users.length === 0)
    return res.status(400).json({ message: "Invalid credentials" })

  const user = users[0]

  const isMatch = await bcrypt.compare(password, user.password_hash)

  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" })

  const token = jwt.sign(
    // { id: user.id, role: user.role },
    { id: user.id, role: user.role.trim() },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      full_name: user.full_name,
      // role: user.role
      role: user.role.trim()
    }
  })
}


// const supabase = require("../config/supabase")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// // ============================
// // REGISTER USER
// // ============================
// exports.register = async (req, res) => {

//   try {

//     const { full_name, email, password, role, phone } = req.body

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // Insert user
//     const { data, error } = await supabase
//       .from("users")
//       .insert([
//         {
//           full_name,
//           email,
//           password_hash: hashedPassword,
//           role: role.trim(),
//           phone
//         }
//       ])
//       .select()

//     if (error) {
//       return res.status(400).json(error)
//     }

//     res.status(201).json({
//       message: "User registered successfully",
//       user: data[0]
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }



// // ============================
// // LOGIN USER
// // ============================
// exports.login = async (req, res) => {

//   try {

//     const { email, password } = req.body

//     // Find user
//     const { data: users, error } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)

//     if (error || users.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     const user = users[0]

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password_hash)

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" })
//     }

//     // Clean role
//     const role = user.role.trim()

//     // Create JWT
//     const token = jwt.sign(
//       {
//         id: user.id,
//         role: role
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     )

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         full_name: user.full_name,
//         role: role
//       }
//     })

//   } catch (err) {
//     res.status(500).json({ message: "Server error" })
//   }

// }