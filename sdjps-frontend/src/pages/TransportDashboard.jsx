import { useEffect, useState } from "react"
import API from "../services/api"
import AdminLayout from "../layouts/AdminLayout"
import { useNavigate } from "react-router-dom"

function TransportDashboard() {

    const [buses, setBuses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        const fetchBuses = async () => {

            try {

                const res = await API.get("/transport/dashboard")
                setBuses(res.data)

            } catch (err) {
                console.error(err)
            }

        }

        fetchBuses()

    }, [])

    return (

        <AdminLayout>

            <div className="flex justify-between items-center mb-6">

<h1 className="text-2xl font-bold">
Transport
</h1>

<div className="flex gap-3">

<button
 className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
 onClick={() => navigate("/transport/add-bus")}
>
➕ Add Bus
</button>

<button
 className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
 onClick={() => navigate("/transport/add-student")}
>
👨‍🎓 Add Student
</button>

</div>

</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {buses.map(bus => (

                    <div
                        key={bus.bus_id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100"
                    >

                        {/* Bus Title */}
                        <h2 className="text-lg font-semibold text-yellow-600">
                            🚌 Bus {bus.bus_number}
                        </h2>

                        {/* Driver */}
                        <div className="mt-3 text-gray-600 text-sm space-y-1">

                            <p>
                                👨‍✈️ <span className="font-medium">Driver:</span> {bus.driver_name}
                            </p>

                            <p>
                                📞 <span className="font-medium">Phone:</span> {bus.driver_phone || "N/A"}
                            </p>

                            <p>
                                👨‍🎓 <span className="font-medium">Students:</span>
                                {bus.total_students} / {bus.capacity}
                            </p>

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center mt-5">

                            <button
                                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg"
                                onClick={() =>
                                    navigate(`/transport/bus/${bus.bus_id}`)
                                }
                            >
                                Open Students
                            </button>

                            <button
                                className="flex items-center gap-1 text-yellow-600 font-medium text-sm"
                                onClick={() =>
                                    navigate(`/transport/live/${bus.bus_id}`)
                                }
                            >
                                📍 Live
                            </button>

                        </div>

                    </div>

                ))}

            </div>
        </AdminLayout>

    )

}

export default TransportDashboard



















// import { useEffect, useState } from "react"
// import API from "../services/api"
// import AdminLayout from "../layouts/AdminLayout"
// import { useNavigate } from "react-router-dom"

// function TransportDashboard() {
//   const [buses, setBuses] = useState([])
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchBuses = async () => {
//       try {
//         const res = await API.get("/transport/dashboard")
//         setBuses(res.data)
//       } catch (err) {
//         console.error(err)
//       }
//     }
//     fetchBuses()
//   }, [])

//   const getCapacityColor = (students, capacity) => {
//     if (!capacity) return "#6b7280"
//     const ratio = students / capacity
//     if (ratio >= 0.9) return "#ef4444"
//     if (ratio >= 0.7) return "#f59e0b"
//     return "#10b981"
//   }

//   const getCapacityPercent = (students, capacity) => {
//     if (!capacity) return 0
//     return Math.min((students / capacity) * 100, 100)
//   }

//   return (
//     <AdminLayout>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@400;500&display=swap');

//         .transport-wrapper {
//           font-family: 'DM Sans', sans-serif;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
//           padding: 2rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .transport-wrapper::before {
//           content: '';
//           position: absolute;
//           top: -200px;
//           right: -200px;
//           width: 600px;
//           height: 600px;
//           background: radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%);
//           pointer-events: none;
//         }

//         .transport-wrapper::after {
//           content: '';
//           position: absolute;
//           bottom: -200px;
//           left: -100px;
//           width: 500px;
//           height: 500px;
//           background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
//           pointer-events: none;
//         }

//         .page-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 2.5rem;
//           position: relative;
//           z-index: 1;
//         }

//         .header-icon {
//           width: 52px;
//           height: 52px;
//           background: linear-gradient(135deg, #f59e0b, #d97706);
//           border-radius: 14px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 22px;
//           box-shadow: 0 8px 25px rgba(245,158,11,0.35);
//         }

//         .header-text h1 {
//           font-family: 'Sora', sans-serif;
//           font-size: 1.75rem;
//           font-weight: 700;
//           color: #ffffff;
//           margin: 0;
//           letter-spacing: -0.5px;
//         }

//         .header-text p {
//           font-size: 0.85rem;
//           color: rgba(255,255,255,0.45);
//           margin: 2px 0 0;
//         }

//         .bus-count-badge {
//           margin-left: auto;
//           background: rgba(245,158,11,0.15);
//           border: 1px solid rgba(245,158,11,0.3);
//           color: #fbbf24;
//           font-size: 0.8rem;
//           font-weight: 600;
//           padding: 6px 16px;
//           border-radius: 50px;
//           letter-spacing: 0.5px;
//         }

//         .buses-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 1.5rem;
//           position: relative;
//           z-index: 1;
//         }

//         .bus-card {
//           background: rgba(255,255,255,0.04);
//           backdrop-filter: blur(12px);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 20px;
//           padding: 1.5rem;
//           cursor: pointer;
//           transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .bus-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
//           opacity: 0;
//           transition: opacity 0.35s ease;
//         }

//         .bus-card:hover {
//           background: rgba(255,255,255,0.07);
//           border-color: rgba(245,158,11,0.25);
//           transform: translateY(-5px);
//           box-shadow: 0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(245,158,11,0.1);
//         }

//         .bus-card:hover::before {
//           opacity: 1;
//         }

//         .card-top {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 1.25rem;
//         }

//         .bus-number-badge {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .bus-icon-wrap {
//           width: 42px;
//           height: 42px;
//           background: linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05));
//           border: 1px solid rgba(245,158,11,0.25);
//           border-radius: 11px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//         }

//         .bus-number-text {
//           font-family: 'Sora', sans-serif;
//           font-size: 1rem;
//           font-weight: 700;
//           color: #fbbf24;
//           letter-spacing: 0.3px;
//         }

//         .status-dot {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 0.75rem;
//           font-weight: 500;
//           color: #10b981;
//         }

//         .status-dot-pulse {
//           width: 8px;
//           height: 8px;
//           background: #10b981;
//           border-radius: 50%;
//           position: relative;
//           animation: pulse-ring 2s infinite;
//         }

//         @keyframes pulse-ring {
//           0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.5); }
//           70% { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
//           100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); }
//         }

//         .divider {
//           height: 1px;
//           background: rgba(255,255,255,0.06);
//           margin: 1rem 0;
//         }

//         .info-rows {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           margin-bottom: 1.25rem;
//         }

//         .info-row {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }

//         .info-icon {
//           width: 28px;
//           height: 28px;
//           border-radius: 7px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 13px;
//           flex-shrink: 0;
//         }

//         .info-icon.driver { background: rgba(99,102,241,0.15); }
//         .info-icon.phone  { background: rgba(16,185,129,0.15); }
//         .info-icon.students { background: rgba(245,158,11,0.15); }

//         .info-label {
//           font-size: 0.75rem;
//           color: rgba(255,255,255,0.35);
//           text-transform: uppercase;
//           letter-spacing: 0.6px;
//           font-weight: 500;
//           min-width: 54px;
//         }

//         .info-value {
//           font-size: 0.875rem;
//           color: rgba(255,255,255,0.85);
//           font-weight: 500;
//         }

//         .capacity-section {
//           margin-bottom: 1.35rem;
//         }

//         .capacity-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 7px;
//         }

//         .capacity-label {
//           font-size: 0.7rem;
//           color: rgba(255,255,255,0.3);
//           text-transform: uppercase;
//           letter-spacing: 0.6px;
//           font-weight: 500;
//         }

//         .capacity-numbers {
//           font-size: 0.8rem;
//           font-weight: 600;
//           font-family: 'Sora', sans-serif;
//         }

//         .capacity-bar-bg {
//           height: 5px;
//           background: rgba(255,255,255,0.07);
//           border-radius: 10px;
//           overflow: hidden;
//         }

//         .capacity-bar-fill {
//           height: 100%;
//           border-radius: 10px;
//           transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .card-actions {
//           display: flex;
//           gap: 10px;
//         }

//         .btn-students {
//           flex: 1;
//           padding: 10px 0;
//           background: linear-gradient(135deg, #f59e0b, #d97706);
//           border: none;
//           border-radius: 10px;
//           color: #1a0e00;
//           font-size: 0.82rem;
//           font-weight: 700;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer;
//           letter-spacing: 0.2px;
//           transition: all 0.25s ease;
//           box-shadow: 0 4px 14px rgba(245,158,11,0.3);
//         }

//         .btn-students:hover {
//           background: linear-gradient(135deg, #fbbf24, #f59e0b);
//           box-shadow: 0 6px 20px rgba(245,158,11,0.45);
//           transform: translateY(-1px);
//         }

//         .btn-students:active {
//           transform: translateY(0);
//         }

//         .btn-live {
//           padding: 10px 16px;
//           background: rgba(16,185,129,0.1);
//           border: 1px solid rgba(16,185,129,0.25);
//           border-radius: 10px;
//           color: #10b981;
//           font-size: 0.82rem;
//           font-weight: 600;
//           font-family: 'DM Sans', sans-serif;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           transition: all 0.25s ease;
//           white-space: nowrap;
//         }

//         .btn-live:hover {
//           background: rgba(16,185,129,0.18);
//           border-color: rgba(16,185,129,0.4);
//           transform: translateY(-1px);
//         }

//         .btn-live svg {
//           width: 14px;
//           height: 14px;
//         }

//         .empty-state {
//           grid-column: 1 / -1;
//           text-align: center;
//           padding: 4rem 2rem;
//           color: rgba(255,255,255,0.25);
//         }

//         .empty-state .empty-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//           opacity: 0.4;
//         }

//         .empty-state p {
//           font-size: 1rem;
//         }

//         @media (max-width: 640px) {
//           .transport-wrapper { padding: 1.25rem; }
//           .buses-grid { grid-template-columns: 1fr; gap: 1rem; }
//           .header-text h1 { font-size: 1.4rem; }
//           .bus-count-badge { display: none; }
//         }
//       `}</style>

//       <div className="transport-wrapper">
//         {/* Header */}
//         <div className="page-header">
//           <div className="header-icon">🚌</div>
//           <div className="header-text">
//             <h1>Transport</h1>
//             <p>Live fleet management</p>
//           </div>
//           {buses.length > 0 && (
//             <div className="bus-count-badge">
//               {buses.length} {buses.length === 1 ? "Bus" : "Buses"} Active
//             </div>
//           )}
//         </div>

//         {/* Grid */}
//         <div className="buses-grid">
//           {buses.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">🚌</div>
//               <p>No buses found</p>
//             </div>
//           ) : (
//             buses.map((bus) => {
//               const capColor = getCapacityColor(bus.total_students, bus.capacity)
//               const capPercent = getCapacityPercent(bus.total_students, bus.capacity)

//               return (
//                 <div key={bus.bus_id} className="bus-card">
//                   {/* Top row */}
//                   <div className="card-top">
//                     <div className="bus-number-badge">
//                       <div className="bus-icon-wrap">🚌</div>
//                       <span className="bus-number-text">Bus {bus.bus_number}</span>
//                     </div>
//                     <div className="status-dot">
//                       <div className="status-dot-pulse" />
//                       Live
//                     </div>
//                   </div>

//                   <div className="divider" />

//                   {/* Info rows */}
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <div className="info-icon driver">👨‍✈️</div>
//                       <span className="info-label">Driver</span>
//                       <span className="info-value">{bus.driver_name}</span>
//                     </div>
//                     <div className="info-row">
//                       <div className="info-icon phone">📞</div>
//                       <span className="info-label">Phone</span>
//                       <span className="info-value">{bus.driver_phone || "N/A"}</span>
//                     </div>
//                   </div>

//                   {/* Capacity bar */}
//                   <div className="capacity-section">
//                     <div className="capacity-header">
//                       <span className="capacity-label">Capacity</span>
//                       <span
//                         className="capacity-numbers"
//                         style={{ color: capColor }}
//                       >
//                         {bus.total_students} / {bus.capacity || "—"}
//                       </span>
//                     </div>
//                     <div className="capacity-bar-bg">
//                       <div
//                         className="capacity-bar-fill"
//                         style={{
//                           width: `${capPercent}%`,
//                           background: `linear-gradient(90deg, ${capColor}, ${capColor}cc)`,
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Action buttons */}
//                   <div className="card-actions">
//                     <button
//                       className="btn-students"
//                       onClick={() => navigate(`/transport/bus/${bus.bus_id}`)}
//                     >
//                       Open Students
//                     </button>
//                     <button
//                       className="btn-live"
//                       onClick={() => navigate(`/transport/live/${bus.bus_id}`)}
//                     >
//                       <svg viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
//                       </svg>
//                       Track
//                     </button>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>
//       </div>
//     </AdminLayout>
//   )
// }

// export default TransportDashboard