// const supabase = require("../config/supabase")

// // Send announcement
// exports.createAnnouncement = async (req, res) => {
//   const { class_id, message } = req.body

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .insert([
//       {
//         class_id,
//         sender_id: req.user.id,
//         message
//       }
//     ])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement sent successfully" })
// }

// // Get class announcements
// exports.getAnnouncements = async (req, res) => {
//   const { class_id } = req.query

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .select(`
//       id,
//       message,
//       is_pinned,
//       created_at,
//       users(full_name)
//     `)
//     .eq("class_id", class_id)
//     .order("created_at", { ascending: false })

//   if (error) return res.status(400).json(error)

//   res.json(data)
// }

// // Pin message
// exports.pinAnnouncement = async (req, res) => {
//   const { id } = req.params

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .update({ is_pinned: true })
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement pinned" })
// }

// // Delete message
// exports.deleteAnnouncement = async (req, res) => {
//   const { id } = req.params

//   const { error } = await supabase
//     .from("class_announcements")
//     .delete()
//     .eq("id", id)

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement deleted" })
// }


// ye uper pura woking code h





















const supabase = require("../config/supabase")

// Send announcement
// exports.createAnnouncement = async (req, res) => {

//   const { class_id, message, target_type } = req.body

//   const { data, error } = await supabase
//     .from("class_announcements")
//     .insert([
//       {
//         class_id,
//         sender_id: req.user.id,
//         message,
//         target_type
//       }
//     ])

//   if (error) return res.status(400).json(error)

//   res.json({ message: "Announcement sent successfully" })
// }


exports.createAnnouncement = async (req, res) => {

  const { class_id = null, message } = req.body

  const { data, error } = await supabase
    .from("class_announcements")
    .insert([
      {
        class_id,
        sender_id: req.user.id,
        message
      }
    ])

  if (error) return res.status(400).json(error)

  res.json({ message: "Announcement sent successfully" })
}

// Get class announcements
exports.getAnnouncements = async (req,res)=>{

  const { class_id } = req.query

  let query = supabase
  .from("class_announcements")
  .select(`
    id,
    message,
    is_pinned,
    created_at,
    users(full_name)
  `)
  .order("created_at",{ascending:false})

  if(class_id){
    query = query.eq("class_id",class_id)
  }

  const {data,error} = await query

  if(error) return res.status(400).json(error)

  res.json(data)

}

// Pin message
exports.pinAnnouncement = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from("class_announcements")
    .update({ is_pinned: true })
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Announcement pinned" })
}

// Delete message
exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from("class_announcements")
    .delete()
    .eq("id", id)

  if (error) return res.status(400).json(error)

  res.json({ message: "Announcement deleted" })
}
exports.getAdminFeed = async (req,res)=>{

const {data,error} = await supabase
.from("class_announcements")
.select(`
id,
message,
target_type,
is_pinned,
created_at,
users(full_name)
`)
.order("created_at",{ascending:false})

if(error) return res.status(400).json(error)

res.json(data)

}