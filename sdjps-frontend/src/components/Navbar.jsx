
// import { Menu } from "lucide-react"

// function Navbar({ toggleSidebar }) {

//   return (

//     <div className="w-full bg-white shadow p-4 flex items-center justify-between">

//       <div className="flex items-center gap-3">

//         <button
//           onClick={toggleSidebar}
//           className="md:hidden"
//         >
//           <Menu />
//         </button>

//         <h1 className="text-xl font-semibold">
//           Admin Dashboard
//         </h1>

//       </div>

//       <button className="bg-blue-600 text-white px-4 py-2 rounded">
//         Logout
//       </button>

//     </div>

//   )

// }

// export default Navbar



























// import { useState } from "react"
// import { Menu, LogOut, Bell, Search, X } from "lucide-react"

// const style = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

//   @keyframes slideDown {
//     from { opacity: 0; transform: translateY(-8px) }
//     to   { opacity: 1; transform: translateY(0) }
//   }
//   @keyframes ripple {
//     from { transform: scale(0); opacity: 0.4 }
//     to   { transform: scale(2.5); opacity: 0 }
//   }
//   .navbar-enter { animation: slideDown 0.3s ease both }
//   .ripple-btn {
//     position: relative; overflow: hidden;
//     transition: transform 0.15s, box-shadow 0.15s;
//   }
//   .ripple-btn:hover { transform: translateY(-1px); }
//   .ripple-btn:active { transform: scale(0.97); }
//   .icon-btn {
//     width: 38px; height: 38px; border-radius: 10px;
//     display: flex; align-items: center; justify-content: center;
//     background: rgba(99,102,241,0.06);
//     border: 1px solid rgba(99,102,241,0.1);
//     cursor: pointer; transition: all 0.2s;
//     color: #64748b;
//   }
//   .icon-btn:hover {
//     background: rgba(99,102,241,0.12);
//     color: #6366f1;
//     border-color: rgba(99,102,241,0.2);
//   }
//   .search-bar {
//     display: flex; align-items: center; gap: 8px;
//     background: rgba(99,102,241,0.05);
//     border: 1px solid rgba(99,102,241,0.12);
//     border-radius: 10px;
//     padding: 7px 14px;
//     transition: all 0.25s;
//     width: 220px;
//   }
//   .search-bar:focus-within {
//     background: #fff;
//     border-color: rgba(99,102,241,0.4);
//     box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
//     width: 260px;
//   }
//   .search-bar input {
//     border: none; outline: none; background: transparent;
//     font-size: 13px; color: #374151; width: 100%;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .search-bar input::placeholder { color: #94a3b8; }
//   @media (max-width: 540px) {
//     .search-bar { display: none !important; }
//     .search-bar.mobile-open {
//       display: flex !important;
//       position: absolute; left: 16px; right: 16px;
//       top: 50%; transform: translateY(-50%);
//       width: auto; z-index: 20;
//       background: #fff;
//       box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//     }
//   }
// `

// function Navbar({ toggleSidebar, title = "Admin Dashboard" }) {
//   const [searchOpen, setSearchOpen] = useState(false)
//   const [notifCount] = useState(3)

//   return (
//     <>
//       <style>{style}</style>

//       <header
//         className="navbar-enter"
//         style={{
//           width: "100%",
//           background: "rgba(255,255,255,0.85)",
//           backdropFilter: "blur(16px)",
//           WebkitBackdropFilter: "blur(16px)",
//           borderBottom: "1px solid rgba(99,102,241,0.1)",
//           padding: "0 24px",
//           height: 62,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           position: "sticky",
//           top: 0,
//           zIndex: 30,
//           fontFamily: "'DM Sans', sans-serif",
//           gap: 12,
//         }}
//       >
//         {/* Left — hamburger + title */}
//         <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
//           <button
//             className="icon-btn md:hidden"
//             onClick={toggleSidebar}
//             style={{ display: "flex" }}
//           >
//             <Menu size={18} />
//           </button>

//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             {/* accent dot */}
//             <span style={{
//               width: 8, height: 8, borderRadius: "50%",
//               background: "linear-gradient(135deg,#6366f1,#a78bfa)",
//               display: "inline-block", flexShrink: 0,
//             }} />
//             <h1 style={{
//               fontSize: "clamp(15px, 2.5vw, 17px)",
//               fontWeight: 700,
//               color: "#1e2340",
//               margin: 0,
//               letterSpacing: "-0.3px",
//               whiteSpace: "nowrap",
//             }}>
//               {title}
//             </h1>
//           </div>
//         </div>

//         {/* Center — search */}
//         <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
//           <div className={`search-bar${searchOpen ? " mobile-open" : ""}`}>
//             <Search size={14} color="#94a3b8" style={{ flexShrink: 0 }} />
//             <input placeholder="Search students, teachers…" />
//             {searchOpen && (
//               <button
//                 onClick={() => setSearchOpen(false)}
//                 style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
//               >
//                 <X size={14} color="#94a3b8" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Right — actions */}
//         <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>

//           {/* Mobile search toggle */}
//           <button
//             className="icon-btn"
//             onClick={() => setSearchOpen(true)}
//             style={{
//               display: "none",
//             }}
//             id="mobile-search-btn"
//           >
//             <Search size={16} />
//           </button>

//           {/* Notification bell */}
//           <button className="icon-btn" style={{ position: "relative" }}>
//             <Bell size={16} />
//             {notifCount > 0 && (
//               <span style={{
//                 position: "absolute",
//                 top: 6, right: 6,
//                 width: 8, height: 8,
//                 borderRadius: "50%",
//                 background: "#ef4444",
//                 border: "2px solid #fff",
//                 display: "block",
//               }} />
//             )}
//           </button>

//           {/* Divider */}
//           <div style={{
//             width: 1, height: 24,
//             background: "rgba(99,102,241,0.12)",
//             margin: "0 4px",
//           }} />

//           {/* Logout */}
//           <button
//             className="ripple-btn"
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 7,
//               background: "linear-gradient(135deg, #6366f1, #818cf8)",
//               color: "#fff",
//               border: "none",
//               borderRadius: 10,
//               padding: "8px 16px",
//               fontSize: 13,
//               fontWeight: 600,
//               cursor: "pointer",
//               boxShadow: "0 2px 12px rgba(99,102,241,0.35)",
//               fontFamily: "'DM Sans', sans-serif",
//               whiteSpace: "nowrap",
//             }}
//             onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.5)"}
//             onMouseLeave={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(99,102,241,0.35)"}
//           >
//             <LogOut size={14} />
//             <span className="hide-xs">Logout</span>
//           </button>
//         </div>

//       </header>

//       {/* Hide logout text on very small screens */}
//       <style>{`
//         @media (max-width: 380px) { .hide-xs { display: none } }
//         @media (max-width: 540px) { #mobile-search-btn { display: flex !important } }
//       `}</style>
//     </>
//   )
// }

// export default Navbar


























import { useState } from "react"
import { Menu, LogOut, Bell, Search, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px) }
    to   { opacity: 1; transform: translateY(0) }
  }
  .navbar-enter { animation: slideDown 0.3s ease both }

  .ripple-btn {
    position: relative; overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
  }
  .ripple-btn:hover { transform: translateY(-1px); }
  .ripple-btn:active { transform: scale(0.97); }

  .icon-btn {
    width: 38px; height: 38px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(99,102,241,0.06);
    border: 1px solid rgba(99,102,241,0.1);
    cursor: pointer; transition: all 0.2s;
    color: #64748b;
  }
  .icon-btn:hover {
    background: rgba(99,102,241,0.12);
    color: #6366f1;
    border-color: rgba(99,102,241,0.2);
  }

  .search-bar {
    display: flex; align-items: center; gap: 8px;
    background: rgba(99,102,241,0.05);
    border: 1px solid rgba(99,102,241,0.12);
    border-radius: 10px;
    padding: 7px 14px;
    transition: all 0.25s;
    width: 220px;
  }
  .search-bar:focus-within {
    background: #fff;
    border-color: rgba(99,102,241,0.4);
    box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
    width: 260px;
  }
  .search-bar input {
    border: none; outline: none; background: transparent;
    font-size: 13px; color: #374151; width: 100%;
    font-family: 'DM Sans', sans-serif;
  }

  @media (max-width: 540px) {
    .search-bar { display: none !important; }
    .search-bar.mobile-open {
      display: flex !important;
      position: absolute; left: 16px; right: 16px;
      top: 50%; transform: translateY(-50%);
      width: auto; z-index: 20;
      background: #fff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
  }
`

function Navbar({ toggleSidebar, title = "Admin Dashboard" }) {

  const [searchOpen, setSearchOpen] = useState(false)
  const [notifCount] = useState(3)
  const navigate = useNavigate()

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <>
      <style>{style}</style>

      <header
        className="navbar-enter"
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(99,102,241,0.1)",
          padding: "0 24px",
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 30,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >

        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="icon-btn md:hidden" onClick={toggleSidebar}>
            <Menu size={18} />
          </button>

          <h1 style={{ fontSize: 16, fontWeight: 700 }}>
            {title}
          </h1>
        </div>

        {/* CENTER */}
        <div className={`search-bar ${searchOpen ? "mobile-open" : ""}`}>
          <Search size={14} />
          <input placeholder="Search..." />
          {searchOpen && (
            <button onClick={() => setSearchOpen(false)}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Bell */}
          <button className="icon-btn" style={{ position: "relative" }}>
            <Bell size={16} />
            {notifCount > 0 && (
              <span style={{
                position: "absolute",
                top: 6, right: 6,
                width: 8, height: 8,
                borderRadius: "50%",
                background: "red"
              }} />
            )}
          </button>

          {/* Logout */}
          <button
            className="ripple-btn"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#6366f1",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 14px",
              cursor: "pointer"
            }}
          >
            <LogOut size={14} />
            Logout
          </button>

        </div>

      </header>
    </>
  )
}

export default Navbar