// import { Home, Search, Bookmark, Download, Settings, LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";


// const Sidebar = () => {
//   const navigate = useNavigate();
//   return (
//     // <aside className="h-screen w-64 bg-black text-white flex flex-col justify-between p-4">
//     <aside className="h-screen w-64 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between p-4">
//       <div>
//         <h1 className="text-xl font-bold mb-6">WinCast</h1>

//         {/* Menu */}
//         <nav className="space-y-2">
//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
//           >
//             <Home size={20} /> Home
//           </a>

//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
//           >
//             <Search size={20} /> Browse Events
//           </a>

//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
//           >
//             <Bookmark size={20} /> Saved
//           </a>

//           <a
//             href="#"
//             className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
//           >
//             <Download size={20} /> Downloads
//           </a>
//         </nav>

//         {/* Premium Section */}
//         <div className="mt-6 p-4 bg-gray-900 rounded-xl text-center">
//           <p className="text-sm mb-2">Join Premium for exclusive features!</p>
//           <button className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
//             Join Now
//           </button>
//         </div>
//       </div>

//       {/* Bottom Menu */}
//       <div className="space-y-2">
//         <a
//           href="#"
//           className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
//         >
//           <Settings size={20} /> Settings
//         </a>
//         <a
//           href="#"
//           className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-red-400 transition"
//         >
//           <LogOut size={20} onClick={() => navigate("/")} /> Log Out
//         </a>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import { Home, Search, Bookmark, Download, Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // Common classes so button looks like <a>
  const menuItemClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 border-none transition w-full text-left";

  return (
    <aside className="h-screen w-64 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between p-4">
      <div>
        <h1
          className="text-xl font-bold mb-6 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          WinCast
        </h1>

        {/* Menu */}
        <nav className="space-y-2">
          <button onClick={() => navigate("/dashboard")} className={menuItemClass}>
            <Home size={20} /> Home
          </button>

          <button onClick={() => navigate("/dashboard/events")} className={menuItemClass}>
            <Search size={20} /> Browse Events
          </button>

          <button onClick={() => navigate("/profile")} className={menuItemClass}>
            <User size={20} /> Profile
          </button>

          <button onClick={() => navigate("/dashboard/saved")} className={menuItemClass}>
            <Bookmark size={20} /> Saved
          </button>

          <button onClick={() => navigate("/dashboard/downloads")} className={menuItemClass}>
            <Download size={20} /> Downloads
          </button>
        </nav>

        {/* Premium Section */}
        <div className="mt-6 p-4 bg-gray-900 rounded-xl text-center">
          <p className="text-sm mb-2">Join Premium for exclusive features!</p>
          <button className="bg-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Join Now
          </button>
        </div>
      </div>

      {/* Bottom Menu */}
      <div className="space-y-2">
        <button onClick={() => navigate("/dashboard/settings")} className={menuItemClass}>
          <Settings size={20} /> Settings
        </button>

        <button onClick={() => navigate("/")} className={menuItemClass + " hover:text-red-400"}>
          <LogOut size={20} /> Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

