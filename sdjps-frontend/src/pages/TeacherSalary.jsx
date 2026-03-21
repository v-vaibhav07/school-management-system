import { useEffect, useState } from "react"
import API from "../services/api"

function TeacherSalary() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalary()
  }, [])

  const fetchSalary = async () => {
    try {
      const res = await API.get("/teacher/my-salary")
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
        My Salary
      </h1>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">No salary records yet</p>
      ) : (

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full min-w-[500px]">

            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Month</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>

              {data.map((item) => (

                <tr key={item.id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">
                    {item.month}
                  </td>

                  <td className="p-3 text-green-600 font-semibold">
                    ₹ {item.amount}
                  </td>

                  <td className="p-3 capitalize">
                    {item.payment_method}
                  </td>

                  <td className="p-3 text-gray-500 text-sm">
                    {new Date(item.payment_date).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  )
}

export default TeacherSalary