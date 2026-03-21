// import { useEffect, useState } from "react"
// import API from "../services/api"

// function AdminTeacherSalary() {

//   const [teachers, setTeachers] = useState([])
//   const [selected, setSelected] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [method, setMethod] = useState("upi")
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     fetchTeachers()
//   }, [])

//   const fetchTeachers = async () => {
//     try {
//       const res = await API.get("/teacher")
//       setTeachers(res.data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   // 🔥 CREATE UPI LINK
//   const getUPILink = () => {
//     const amount = selected.salary || 30000
//     const name = selected.full_name
//     const upiId = "yourupi@okaxis" // ⚠️ CHANGE

//     return `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=Salary`
//   }

//   // 🔥 OPEN UPI (MOBILE ONLY)
//   const openUPI = () => {

//     const url = getUPILink()

//     // 📱 MOBILE CHECK
//     if (/Android|iPhone/i.test(navigator.userAgent)) {
//       window.location.href = url
//     } else {
//       alert("📱 Open on mobile OR scan QR below")
//     }
//   }

//   // ✅ SAVE PAYMENT
//   const markAsPaid = async () => {

//     try {
//       setLoading(true)

//       await API.post("/admin/pay-salary", {
//         teacher_id: selected.id,
//         amount: selected.salary || 30000,
//         payment_method: method,
//         month: new Date().toLocaleString("default", {
//           month: "long",
//           year: "numeric"
//         })
//       })

//       alert("Salary Saved ✅")
//       setShowModal(false)
//       fetchTeachers()

//     } catch (err) {
//       console.log(err)
//       alert("Server Error ❌")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="p-4 md:p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Teacher Salary Management
//       </h1>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         {teachers.map((t) => (

//           <div key={t.id}
//             className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

//             <h2 className="text-lg font-semibold text-indigo-600">
//               {t.full_name || "No Name"}
//             </h2>

//             <p className="text-gray-500 text-sm">
//               📞 {t.phone || "No phone"}
//             </p>

//             <p className="text-xl font-bold mt-3">
//               ₹ {t.salary || 30000}
//             </p>

//             <div className="flex gap-2 mt-4 flex-wrap">

//               <button
//                 onClick={() => {
//                   setSelected(t)
//                   setShowModal(true)
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Pay
//               </button>

//               <button
//                 onClick={() =>
//                   window.location.href = `/admin/salary-history/${t.id}`
//                 }
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
//               >
//                 History
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//       {/* MODAL */}
//       {showModal && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">

//           <div className="bg-white p-6 rounded-xl w-full max-w-sm">

//             <h2 className="text-lg font-bold mb-4">
//               Pay Salary
//             </h2>

//             <p className="mb-1 font-medium">
//               {selected.full_name}
//             </p>

//             <p className="mb-3 text-gray-600">
//               Amount: ₹ {selected.salary || 30000}
//             </p>

//             <select
//               value={method}
//               onChange={(e) => setMethod(e.target.value)}
//               className="border p-2 w-full mb-4 rounded"
//             >
//               <option value="upi">UPI</option>
//               <option value="cash">Cash</option>
//               <option value="bank">Bank Transfer</option>
//             </select>

//             {/* 🔥 QR CODE */}
//             {method === "upi" && (
//               <div className="flex flex-col items-center mb-4">

//                 <img
//                   src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(getUPILink())}`}
//                   alt="QR"
//                   className="mb-2"
//                 />

//                 <p className="text-xs text-gray-500 text-center">
//                   Scan with any UPI app
//                 </p>

//               </div>
//             )}

//             <div className="flex flex-col gap-2">

//               {/* 🔥 OPEN APP */}
//               {method === "upi" && (
//                 <button
//                   onClick={openUPI}
//                   className="bg-blue-600 text-white py-2 rounded"
//                 >
//                   Open UPI App
//                 </button>
//               )}

//               {/* ✅ SAVE */}
//               <button
//                 onClick={markAsPaid}
//                 disabled={loading}
//                 className="bg-green-600 text-white py-2 rounded"
//               >
//                 {loading ? "Saving..." : "Mark as Paid"}
//               </button>

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="border py-2 rounded"
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   )
// }

// export default AdminTeacherSalary






























import { useEffect, useState } from "react"
import API from "../services/api"

function AdminTeacherSalary() {

  const [teachers, setTeachers] = useState([])
  const [selected, setSelected] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [method, setMethod] = useState("upi")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teacher")
      setTeachers(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 CREATE UPI LINK (TEACHER BASED)
  const getUPILink = () => {

    if (!selected?.upi_id) {
      alert("❌ Teacher UPI not added")
      return ""
    }

    const amount = selected.salary || 30000
    const name = selected.full_name
    const upiId = selected.upi_id

    return `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=Salary`
  }

  // 📱 OPEN UPI APP (MOBILE ONLY)
  const openUPI = () => {

    const url = getUPILink()
    if (!url) return

    if (/Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = url
    } else {
      alert("📱 Open on mobile OR scan QR")
    }
  }

  // ✅ SAVE PAYMENT
  const markAsPaid = async () => {

    try {
      setLoading(true)

      await API.post("/admin/pay-salary", {
        teacher_id: selected.id,
        amount: selected.salary || 30000,
        payment_method: method,
        month: new Date().toLocaleString("default", {
          month: "long",
          year: "numeric"
        })
      })

      alert("Salary Saved ✅")
      setShowModal(false)
      fetchTeachers()

    } catch (err) {
      console.log(err)
      alert("Server Error ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-2xl font-bold mb-6">
        Teacher Salary Management
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {teachers.map((t) => (

          <div key={t.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">

            <h2 className="text-lg font-semibold text-indigo-600">
              {t.full_name || "No Name"}
            </h2>

            <p className="text-gray-500 text-sm">
              📞 {t.phone || "No phone"}
            </p>

            <p className="text-gray-500 text-sm">
              💳 {t.upi_id || "No UPI"}
            </p>

            <p className="text-xl font-bold mt-3">
              ₹ {t.salary || 30000}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">

              <button
                onClick={() => {
                  setSelected(t)
                  setShowModal(true)
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Pay
              </button>

              <button
                onClick={() =>
                  window.location.href = `/admin/salary-history/${t.id}`
                }
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                History
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4 z-50">

          <div className="bg-white p-6 rounded-xl w-full max-w-sm">

            <h2 className="text-lg font-bold mb-4">
              Pay Salary
            </h2>

            <p className="mb-1 font-medium">
              {selected.full_name}
            </p>

            <p className="mb-3 text-gray-600">
              Amount: ₹ {selected.salary || 30000}
            </p>

            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            >
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank Transfer</option>
            </select>

            {/* 🔥 QR CODE */}
            {method === "upi" && (
              <div className="flex flex-col items-center mb-4">

                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(getUPILink())}`}
                  alt="QR"
                />

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Scan using any UPI app
                </p>

              </div>
            )}

            <div className="flex flex-col gap-2">

              {/* OPEN UPI */}
              {method === "upi" && (
                <button
                  onClick={openUPI}
                  className="bg-blue-600 text-white py-2 rounded"
                >
                  Open UPI App
                </button>
              )}

              {/* SAVE */}
              <button
                onClick={markAsPaid}
                disabled={loading}
                className="bg-green-600 text-white py-2 rounded"
              >
                {loading ? "Saving..." : "Mark as Paid"}
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="border py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default AdminTeacherSalary