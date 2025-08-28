import { Home, Search, Bookmark, Download, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    // <aside className="h-screen w-64 bg-black text-white flex flex-col justify-between p-4">
    <aside className="h-screen w-64 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-between p-4">
      <div>
        <h1 className="text-xl font-bold mb-6">WinCast</h1>

        {/* Menu */}
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
          >
            <Home size={20} /> Home
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
          >
            <Search size={20} /> Browse Events
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
          >
            <Bookmark size={20} /> Saved
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white-400 transition"
          >
            <Download size={20} /> Downloads
          </a>
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
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
        >
          <Settings size={20} /> Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-red-400 transition"
        >
          <LogOut size={20} /> Log Out
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
