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
            <Search size={20} /> Events
          </button>

          
          <button onClick={() => navigate("/dashboard/my-events")} className={menuItemClass}>
            <Search size={20} /> My Events
          </button>


          <button onClick={() => navigate("/profile")} className={menuItemClass}>
            <User size={20} /> Profile
          </button>

          <button onClick={() => navigate("/dashboard/saved")} className={menuItemClass}>
            <Bookmark size={20} /> Saved
          </button>

          <button onClick={() => navigate("/dashboard/results")} className={menuItemClass}>
            <Search size={20} /> Results
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

