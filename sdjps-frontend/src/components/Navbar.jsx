// function Navbar() {
//   return (
//     <div className="w-full bg-white shadow p-4 flex justify-between">

//       <h1 className="text-xl font-semibold">
//         Admin Dashboard
//       </h1>

//       <button className="bg-blue-600 text-white px-4 py-2 rounded">
//         Logout
//       </button>

//     </div>
//   )
// }

// export default Navbar

import { Menu } from "lucide-react"

function Navbar({ toggleSidebar }) {

  return (

    <div className="w-full bg-white shadow p-4 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <button
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <Menu />
        </button>

        <h1 className="text-xl font-semibold">
          Admin Dashboard
        </h1>

      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Logout
      </button>

    </div>

  )

}

export default Navbar