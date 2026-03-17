

// import { useState } from "react"
// import Sidebar from "../components/Sidebar"
// import Navbar from "../components/Navbar"

// function AdminLayout({ children }) {

//   const [open, setOpen] = useState(false)

//   return (

//     <div className="flex">

//       <Sidebar open={open} />

//       <div className="flex-1">

//         <Navbar toggleSidebar={() => setOpen(!open)} />

//         <div className="p-6 bg-gray-50 min-h-screen">
//           {children}
//         </div>

//       </div>

//     </div>

//   )

// }

// export default AdminLayout




//uper wale se replace niche wala replace

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function AdminLayout({ children }) {

  const [open, setOpen] = useState(false)

  return (

    <div className="flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1">

        {/* Navbar */}
        <Navbar toggleSidebar={() => setOpen(!open)} />

        {/* Page Content */}
        <div className="p-6 bg-gray-50 min-h-screen">
          {children}
        </div>

      </div>

    </div>

  )

}

export default AdminLayout


















