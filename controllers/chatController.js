//  const supabase = require("../config/supabase")

// // Send message
// exports.sendMessage = async (req, res) => {

//   const { class_id, message } = req.body
//   const sender_id = req.user.id

//   const { data, error } = await supabase
//     .from("class_messages")
//     .insert([
//       {
//         class_id,
//         sender_id,
//         message
//       }
//     ])

//   if (error) {
//     return res.status(500).json({ error })
//   }

//   res.json({
//     message: "Message sent",
//     data
//   })
// }


// // Get class chat
// exports.getClassMessages = async (req, res) => {

//   const { class_id } = req.params

//   const { data, error } = await supabase
//     .from("class_messages")
//     .select(`
//       message,
//       created_at,
//       users(full_name)
//     `)
//     .eq("class_id", class_id)
//     .order("created_at", { ascending: true })

//   if (error) {
//     return res.status(500).json({ error })
//   }

//   res.json(data)
// }
const supabase = require("../config/supabase")

exports.sendMessage = async (req, res) => {

  const { class_id, message, is_pinned } = req.body
  const sender_id = req.user.id
  const sender_role = req.user.role   // ⭐ ADD THIS
  const { data, error } = await supabase
    .from("class_messages")
    .insert([
      {
        class_id,
        sender_id,
        sender_role,
        message,
        is_pinned: is_pinned || false
      }
    ])
    .select()

  if (error) {
    return res.status(500).json({ error })
  }

  res.json({
    message: "Message sent",
    data: data[0]
  })
}

exports.getClassMessages = async (req, res) => {

  const { class_id } = req.params

  const { data, error } = await supabase
    .from("class_messages")
    .select(`
      message,
      sender_role,
      created_at,
      users(full_name)
    `)
    .eq("class_id", class_id)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: true })

  if (error) {
    return res.status(500).json({ error })
  }

  res.json(data)
}


// Mark message as read
exports.markMessageRead = async (req, res) => {

  const { message_id } = req.body
  const user_id = req.user.id

  const { data, error } = await supabase
    .from("message_reads")
    .insert([
      {
        message_id,
        user_id
      }
    ])

  if (error) {
    return res.status(500).json({ error })
  }

  res.json({
    message: "Message marked as read"
  })
}



// Get unread message count
exports.getUnreadCount = async (req, res) => {

  const { class_id } = req.params
  const user_id = req.user.id

  const { data, error } = await supabase
    .from("class_messages")
    .select("id", { count: "exact" })
    .eq("class_id", class_id)
    .not("id", "in",
      `(
        select message_id 
        from message_reads 
        where user_id='${user_id}'
      )`
    )

  if (error) {
    return res.status(500).json({ error })
  }

  res.json({
    unread_messages: data.length
  })
}