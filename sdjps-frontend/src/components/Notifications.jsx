import { useEffect, useState } from "react"
import API from "../services/api"

function Notifications() {

  const [notifications, setNotifications] = useState([])

  const fetchNotifications = async () => {

    const res = await API.get("/notifications")
    setNotifications(res.data)

  }

  useEffect(() => {

    fetchNotifications()

    const interval = setInterval(() => {
      fetchNotifications()
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  const markRead = async (id) => {

    await API.patch(`/notifications/${id}`)

    fetchNotifications()

  }

  return (

    <div className="bg-white shadow rounded p-4">

      <h2 className="text-xl font-bold mb-4">
        Notifications
      </h2>

      {notifications.map(n => (

        <div
          key={n.id}
          className="border-b py-2 flex justify-between"
        >

          <p>{n.message}</p>

          {!n.read && (

            <button
              onClick={() => markRead(n.id)}
              className="text-blue-600"
            >
              Mark Read
            </button>

          )}

        </div>

      ))}

    </div>

  )

}

export default Notifications