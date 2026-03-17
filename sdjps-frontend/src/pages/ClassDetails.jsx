// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// function ClassDetails() {

//   const { id } = useParams()

//   const [classInfo, setClassInfo] = useState(null)
//   const [timetable, setTimetable] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const [showModal, setShowModal] = useState(false)

//   const [form, setForm] = useState({
//     subject: "",
//     teacher_id: "",
//     day: "",
//     start_time: "",
//     end_time: ""
//   })


//   // ========================
//   // Fetch class timetable
//   // ========================
//   const fetchTimetable = async () => {

//     try {

//       const res = await API.get(`/timetable/${id}`)

//       setClassInfo(res.data.class)
//       setTimetable(res.data.timetable)

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ========================
//   // Fetch teachers
//   // ========================
//   const fetchTeachers = async () => {

//     const res = await API.get("/teacher")

//     setTeachers(res.data)

//   }


//   useEffect(() => {

//     fetchTimetable()
//     fetchTeachers()

//   }, [])



//   // ========================
//   // Add subject
//   // ========================
//   const addSubject = async () => {

//     try {

//       await API.post("/timetable", {
//         class_id: id,
//         ...form
//       })

//       setShowModal(false)

//       setForm({
//         subject: "",
//         teacher_id: "",
//         day: "",
//         start_time: "",
//         end_time: ""
//       })

//       fetchTimetable()

//     } catch (err) {

//       console.log(err)

//     }

//   }



//   return (

//     <div className="p-6">

//       {/* HEADER */}

//       <div className="flex justify-between items-center mb-6">

//         <div>

//           <h1 className="text-3xl font-bold">

//             Class {classInfo?.class_name}-{classInfo?.section}

//           </h1>

//           <p className="text-gray-500">
//             Academic Year {classInfo?.academic_year}
//           </p>

//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
//         >
//           + Add Subject
//         </button>

//       </div>



//       {/* TIMETABLE */}

//       <div className="bg-white rounded-xl shadow p-6">

//         <h2 className="text-xl font-semibold mb-4">
//           Class Timetable
//         </h2>

//         <table className="w-full">

//           <thead className="border-b">

//             <tr>

//               <th className="text-left p-3">Day</th>
//               <th className="text-left p-3">Subject</th>
//               <th className="text-left p-3">Teacher</th>
//               <th className="text-left p-3">Time</th>

//             </tr>

//           </thead>

//           <tbody>

//             {timetable.map((row) => (

//               <tr key={row.id} className="border-b">

//                 <td className="p-3">{row.day}</td>

//                 <td className="p-3">{row.subject}</td>

//                 <td className="p-3">{row.teacher_name}</td>

//                 <td className="p-3">
//                   {row.start_time} - {row.end_time}
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>



//       {/* ADD SUBJECT MODAL */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-xl w-96">

//             <h2 className="text-xl font-bold mb-4">
//               Add Subject
//             </h2>


//             <input
//               placeholder="Subject"
//               className="border p-2 w-full mb-3"
//               value={form.subject}
//               onChange={(e) =>
//                 setForm({ ...form, subject: e.target.value })
//               }
//             />



//             <select
//               className="border p-2 w-full mb-3"
//               value={form.teacher_id}
//               onChange={(e) =>
//                 setForm({ ...form, teacher_id: e.target.value })
//               }
//             >

//               <option>Select Teacher</option>

//               {teachers.map((t) => (

//                 <option key={t.id} value={t.id}>
//                   {t.full_name}
//                 </option>

//               ))}

//             </select>



//             <input
//               placeholder="Day"
//               className="border p-2 w-full mb-3"
//               value={form.day}
//               onChange={(e) =>
//                 setForm({ ...form, day: e.target.value })
//               }
//             />



//             <input
//               type="time"
//               className="border p-2 w-full mb-3"
//               value={form.start_time}
//               onChange={(e) =>
//                 setForm({ ...form, start_time: e.target.value })
//               }
//             />


//             <input
//               type="time"
//               className="border p-2 w-full mb-4"
//               value={form.end_time}
//               onChange={(e) =>
//                 setForm({ ...form, end_time: e.target.value })
//               }
//             />



//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="border px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={addSubject}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   )

// }

// export default ClassDetails










// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import API from "../services/api"

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// function ClassDetails() {

//   const { id } = useParams()

//   const [classInfo, setClassInfo] = useState(null)
//   const [timetable, setTimetable] = useState([])
//   const [teachers, setTeachers] = useState([])

//   const [showModal, setShowModal] = useState(false)

//   const [form, setForm] = useState({
//     subject: "",
//     teacher_id: "",
//     day: "Monday",
//     start_time: "",
//     end_time: ""
//   })


//   // ======================
//   // Fetch Timetable
//   // ======================

//   const fetchTimetable = async () => {

//     try {

//       const res = await API.get(`/timetable/${id}`)

//       setClassInfo(res.data.class)
//       setTimetable(res.data.timetable)

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ======================
//   // Fetch Teachers
//   // ======================

//   const fetchTeachers = async () => {

//     const res = await API.get("/teacher")

//     setTeachers(res.data)

//   }


//   useEffect(() => {

//     fetchTimetable()
//     fetchTeachers()

//   }, [])


//   // ======================
//   // Add Subject
//   // ======================

//   const addSubject = async () => {

//     try {

//       await API.post("/timetable", {
//         class_id: id,
//         ...form
//       })

//       setShowModal(false)

//       fetchTimetable()

//     } catch (err) {

//       console.log(err)

//     }

//   }


//   // ======================
//   // Build timetable map
//   // ======================

//   const timetableMap = {}

//   timetable.forEach((row) => {

//     if (!timetableMap[row.start_time]) {
//       timetableMap[row.start_time] = {}
//     }

//     timetableMap[row.start_time][row.day] = row

//   })


//   return (

//     <div className="p-6">

//       {/* HEADER */}

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">

//         <div>

//           <h1 className="text-3xl font-bold">

//             Class {classInfo?.class_name}-{classInfo?.section}

//           </h1>

//           <p className="text-gray-500">

//             Academic Year {classInfo?.academic_year}

//           </p>

//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//         >
//           + Add Subject
//         </button>

//       </div>


//       {/* TIMETABLE GRID */}

//       <div className="overflow-x-auto">

//         <table className="min-w-[700px] w-full border rounded-xl overflow-hidden">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="p-3 text-left">Time</th>

//               {days.map(day => (

//                 <th key={day} className="p-3 text-left">

//                   {day}

//                 </th>

//               ))}

//             </tr>

//           </thead>

//           <tbody>

//             {Object.keys(timetableMap).map(time => (

//               <tr key={time} className="border-t">

//                 <td className="p-3 font-medium">

//                   {time}

//                 </td>

//                 {days.map(day => {

//                   const slot = timetableMap[time][day]

//                   return (

//                     <td key={day} className="p-3">

//                       {slot ? (

//                         <div className="bg-indigo-50 p-3 rounded-lg">

//                           <div className="font-semibold">

//                             {slot.subject}

//                           </div>

//                           <div className="text-sm text-gray-500">

//                             {slot.teacher_name}

//                           </div>

//                           <div className="text-xs text-gray-400">

//                             {slot.start_time} - {slot.end_time}

//                           </div>

//                         </div>

//                       ) : (

//                         <span className="text-gray-300">

//                           Empty

//                         </span>

//                       )}

//                     </td>

//                   )

//                 })}

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>



//       {/* ADD SUBJECT MODAL */}

//       {showModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

//           <div className="bg-white p-6 rounded-xl w-[90%] md:w-[400px]">

//             <h2 className="text-xl font-bold mb-4">

//               Add Subject

//             </h2>


//             <input
//               placeholder="Subject"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, subject: e.target.value })
//               }
//             />


//             <select
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, teacher_id: e.target.value })
//               }
//             >

//               <option>Select Teacher</option>

//               {teachers.map((t) => (

//                 <option key={t.id} value={t.id}>

//                   {t.full_name}

//                 </option>

//               ))}

//             </select>


//             <select
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, day: e.target.value })
//               }
//             >

//               {days.map(day => (

//                 <option key={day} value={day}>

//                   {day}

//                 </option>

//               ))}

//             </select>


//             <input
//               type="time"
//               className="border p-2 w-full mb-3 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, start_time: e.target.value })
//               }
//             />


//             <input
//               type="time"
//               className="border p-2 w-full mb-4 rounded"
//               onChange={(e) =>
//                 setForm({ ...form, end_time: e.target.value })
//               }
//             />


//             <div className="flex justify-end gap-2">

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="border px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={addSubject}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded"
//               >
//                 Save
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   )

// }

// export default ClassDetails






































import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

const PERIODS = [
{p:1,time:"08:00-08:45"},
{p:2,time:"08:45-09:30"},
{p:3,time:"09:30-10:15"},
{p:4,time:"10:15-11:00"},
{p:5,time:"11:15-12:00"},
{p:6,time:"12:00-12:45"},
{p:7,time:"13:30-14:15"},
{p:8,time:"14:15-15:00"},
]

const subjectColors=[
"bg-indigo-100 text-indigo-700",
"bg-green-100 text-green-700",
"bg-orange-100 text-orange-700",
"bg-blue-100 text-blue-700",
"bg-purple-100 text-purple-700"
]

const subjectColorMap={}
let colorIndex=0

function getColor(subject){
if(!subjectColorMap[subject]){
subjectColorMap[subject]=subjectColors[colorIndex++%subjectColors.length]
}
return subjectColorMap[subject]
}

function ClassDetails(){

const {id}=useParams()

const [classInfo,setClassInfo]=useState(null)
const [timetable,setTimetable]=useState([])
const [teachers,setTeachers]=useState([])

const [showModal,setShowModal]=useState(false)
const [editing,setEditing]=useState(null)

// const [form,setForm]=useState({
// subject:"",
// teacher_id:"",
// day:"",
// start_time:"",
// end_time:"",
// room:""
// })

const [form,setForm]=useState({
subject:"",
teacher_id:"",
day:"",
period:"",
start_time:"",
end_time:"",
room:""
})

const fetchTimetable=async()=>{
try{
const res=await API.get(`/timetable/${id}`)
setClassInfo(res.data.class)
setTimetable(res.data.timetable)
}catch(err){
console.log(err)
}
}

const fetchTeachers=async()=>{
const res=await API.get("/teacher")
setTeachers(res.data)
}

// useEffect(()=>{
// fetchTimetable()
// fetchTeachers()
// },[])

useEffect(()=>{
fetchTimetable()
fetchTeachers()
},[id])

const addSubject=async()=>{
try{

if(editing){
await API.put(`/timetable/${editing.id}`,form)
}else{
await API.post("/timetable",{
class_id:id,
...form
})
}

setShowModal(false)
setEditing(null)

setForm({
subject:"",
teacher_id:"",
day:"",
period:"",
start_time:"",
end_time:"",
room:""
})

fetchTimetable()

}catch(err){
console.log(err)
}
}

const deleteEntry=async(id)=>{
if(!confirm("Delete this entry?")) return
await API.delete(`/timetable/${id}`)
fetchTimetable()
}

const openCreate=(day,time)=>{

setEditing(null)

setForm({
subject:"",
teacher_id:"",
day:day,
period:"",
start_time:time.split("-")[0],
end_time:time.split("-")[1],
room:""
})

setShowModal(true)
}

const openEdit=(entry)=>{

setEditing(entry)

setForm({
subject:entry.subject,
teacher_id:entry.teacher_id,
day:entry.day,
start_time:entry.start_time,
end_time:entry.end_time,
room:entry.room || ""
})

setShowModal(true)
}
//**** 

const handlePeriodChange=(period)=>{

// const slot=PERIODS.find(p=>p.p==period)
const slot = PERIODS.find(p => p.p === Number(period))

setForm({
...form,
period:period,
start_time:slot.time.split("-")[0],
end_time:slot.time.split("-")[1]
})

}

const grid={}

DAYS.forEach(d=>grid[d]={})

// timetable.forEach(t=>{
// const period=PERIODS.findIndex(
// p=>p.time===`${t.start_time}-${t.end_time}`
// )+1

// if(period>0){
// grid[t.day][period]=t
// }
// })

timetable.forEach(t => {

  const start = t.start_time.slice(0,5)
  const end = t.end_time.slice(0,5)

  const periodObj = PERIODS.find(p => {
    const [pStart,pEnd] = p.time.split("-")
    return pStart === start && pEnd === end
  })

  if(periodObj){
    grid[t.day][periodObj.p] = t
  }

})

return(

<div className="p-6 space-y-6">

<div className="flex justify-between items-center">

<div>
<h1 className="text-3xl font-bold">
Class {classInfo?.class_name}-{classInfo?.section}
</h1>

<p className="text-gray-500">
Academic Year {classInfo?.academic_year}
</p>
</div>

<button
onClick={()=>setShowModal(true)}
disabled={!classInfo}
className={`px-4 py-2 rounded-lg text-white ${
classInfo
? "bg-indigo-600 hover:bg-indigo-700"
: "bg-gray-400 cursor-not-allowed"
}`}
>
+ Add Entry
</button>

</div>

<div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

<h2 className="text-xl font-semibold mb-4">
Class Timetable
</h2>

<table className="w-full min-w-[700px] border-collapse">

<thead>

<tr className="bg-gray-50">

<th className="p-3 text-left">Period</th>

{DAYS.map(day=>(
<th key={day} className="p-3 text-center">
{day}
</th>
))}

</tr>

</thead>

<tbody>

{PERIODS.map(({p,time})=>(

<tr key={p} className="border-t">

<td className="p-3">

<div className="font-semibold">
P{p}
</div>

<div className="text-xs text-gray-500">
{time}
</div>

</td>

{DAYS.map(day=>{

const entry=grid[day]?.[p]

return(

<td key={day} className="p-2">

{entry?(

<div
className={`rounded-lg px-2 py-2 text-xs relative group ${getColor(entry.subject)}`}
>

<p className="font-semibold truncate">
{entry.subject}
</p>

{entry.teacher_name&&(
<p className="text-[11px] opacity-80 truncate">
{entry.teacher_name}
</p>
)}

{entry.room&&(
<p className="text-[10px] opacity-70">
Room {entry.room}
</p>
)}

<div className="absolute top-1 right-1 hidden group-hover:flex gap-1">

<button
onClick={()=>openEdit(entry)}
className="text-xs bg-white px-1 rounded"
>
✏️
</button>

<button
onClick={()=>deleteEntry(entry.id)}
className="text-xs bg-white px-1 rounded text-red-500"
>
🗑
</button>

</div>

</div>

):(

<button
onClick={()=>openCreate(day,time)}
className="w-full h-12 border-2 border-dashed rounded-lg text-gray-400 hover:text-indigo-500 hover:border-indigo-300"
>
+
</button>

)}

</td>

)

})}

</tr>

))}

</tbody>

</table>

</div>

{showModal&&(

<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl w-96">

<h2 className="text-xl font-bold mb-2">
{editing?"Edit":"Add"} Timetable Entry
</h2>

<p className="text-sm text-gray-500 mb-4">
Class {classInfo?.class_name}-{classInfo?.section}
</p>

{/* <div className="grid grid-cols-2 gap-3 mb-3">

<input
value={form.day}
readOnly
className="border p-2 w-full"
/>

<input
value={`${form.start_time}-${form.end_time}`}
readOnly
className="border p-2 w-full"
/>

</div> */}

<div className="space-y-4 mb-4">

<div className="grid grid-cols-2 gap-4">

<div>

<label className="text-sm font-medium">
Day
</label>

<select
className="border p-2 w-full rounded"
value={form.day}
onChange={(e)=>setForm({...form,day:e.target.value})}
>

<option value="">Day</option>

{DAYS.map(d=>(
<option key={d} value={d}>
{d}
</option>
))}

</select>

</div>


<div>

<label className="text-sm font-medium">
Period
</label>

<select
className="border p-2 w-full rounded"
value={form.period}
onChange={(e)=>handlePeriodChange(e.target.value)}
>

<option value="">Period</option>

{PERIODS.map(p=>(
<option key={p.p} value={p.p}>
P{p.p} ({p.time})
</option>
))}

</select>

</div>

</div>

</div>

<input
placeholder="Subject"
className="border p-2 w-full mb-3"
value={form.subject}
onChange={e=>setForm({...form,subject:e.target.value})}
/>

<select
className="border p-2 w-full mb-3"
value={form.teacher_id}
onChange={e=>setForm({...form,teacher_id:e.target.value})}
>

<option>Select Teacher</option>

{teachers.map(t=>(
<option key={t.id} value={t.id}>
{t.full_name}
</option>
))}

</select>

<input
placeholder="Room"
className="border p-2 w-full mb-4"
value={form.room}
onChange={e=>setForm({...form,room:e.target.value})}
/>

<div className="flex justify-end gap-2">

<button
onClick={()=>setShowModal(false)}
className="border px-4 py-2 rounded"
>
Cancel
</button>

<button
onClick={addSubject}
disabled={!form.day || !form.period || !form.subject}
className={`px-4 py-2 rounded text-white ${
form.day && form.period && form.subject
? "bg-indigo-600 hover:bg-indigo-700"
: "bg-gray-400 cursor-not-allowed"
}`}
>
{editing?"Update":"Add"}
</button>

</div>

</div>

</div>

)}

</div>

)

}

export default ClassDetails