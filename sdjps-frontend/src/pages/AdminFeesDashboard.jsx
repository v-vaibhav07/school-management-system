import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import { useNavigate } from "react-router-dom"

function AdminFeesDashboard(){

  const [stats,setStats] = useState({})
  const [recentPayments,setRecentPayments] = useState([])
  const [classes,setClasses] = useState([])

  const navigate = useNavigate()
  useEffect(()=>{
    fetchFinance()
    fetchRecentPayments()
    fetchClassSummary()
  },[])

  const fetchFinance = async()=>{
    const res = await API.get("/fees/admin/finance")
    setStats(res.data)
  }

  const fetchRecentPayments = async()=>{
    const res = await API.get("/fees/admin/recent-payments")
    setRecentPayments(res.data)
  }

  const fetchClassSummary = async()=>{
    const res = await API.get("/fees/admin/class-summary")
    setClasses(res.data)
  }

  return(

  <AdminLayout>

  <h1 className="text-2xl font-bold mb-6">
  Fees Dashboard
  </h1>

  {/* Top Stats */}

  <div className="grid md:grid-cols-3 gap-6 mb-8">

  <div className="bg-white shadow rounded-xl p-5">
  <p className="text-gray-500">Total Collected</p>
  <h2 className="text-2xl font-bold text-indigo-600">
  ₹{stats.total_collected}
  </h2>
  </div>

  <div className="bg-white shadow rounded-xl p-5">
  <p className="text-gray-500">Pending Fees</p>
  <h2 className="text-2xl font-bold text-red-500">
  ₹{stats.pending_fees}
  </h2>
  </div>

  <div className="bg-white shadow rounded-xl p-5">
  <p className="text-gray-500">Students Due</p>
  <h2 className="text-2xl font-bold">
  {stats.students_due}
  </h2>
  </div>

  </div>

  {/* Recent Payments */}

  <div className="bg-white shadow rounded-xl p-5 mb-8">

  <h2 className="font-semibold mb-4">
  Recent Payments
  </h2>

  <div className="max-h-48 overflow-y-auto">

  {recentPayments.map((p,i)=>(
    <div key={i} className="flex justify-between border-b py-2">

    <span>{p.student_name}</span>

    <span className="text-green-600 font-medium">
    ₹{p.amount}
    </span>

    </div>
  ))}

  </div>

  </div>

  {/* Class Cards */}

  <div className="grid md:grid-cols-3 gap-6">

  {classes.map(c=>(

  <div key={c.class_id} className="bg-white shadow rounded-xl p-5">

  <h2 className="text-lg font-bold text-indigo-600">
  Class {c.class_name}{c.section}
  </h2>

  <p className="text-sm text-gray-500">
  Total ₹{c.total_fee}
  </p>

  <p className="text-sm text-green-600">
  Paid ₹{c.paid_fee}
  </p>

  <p className="text-sm text-red-500">
  Remaining ₹{c.remaining_fee}
  </p>

<button
onClick={()=>navigate(`/fees/class/${c.class_id}`)}
className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded"
>
View
</button>

  </div>

  ))}

  </div>

  </AdminLayout>

  )

}

export default AdminFeesDashboard