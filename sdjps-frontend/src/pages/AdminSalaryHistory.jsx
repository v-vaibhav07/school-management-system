import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import API from "../services/api"

function AdminSalaryHistory() {

  const { teacherId } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await API.get(`/admin/salary-history/${teacherId}`)
      setData(res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-2xl font-bold mb-6">
        Salary History
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          No salary records found
        </div>
      ) : (

        <div className="grid gap-4">

          {data.map((item) => (

            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow flex justify-between items-center flex-wrap"
            >

              <div>
                <p className="font-semibold text-lg">
                  ₹ {item.amount}
                </p>

                <p className="text-gray-500 text-sm">
                  {item.month}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(item.payment_date).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {item.payment_method.toUpperCase()}
                </span>

                <p className="text-green-600 font-medium mt-2">
                  {item.status}
                </p>
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}

export default AdminSalaryHistory