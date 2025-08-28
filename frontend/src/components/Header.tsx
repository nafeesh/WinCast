// import React from "react";
import { Bell, ChevronDown } from "lucide-react";

function Header() {
  return (
    <header className="flex items-center justify-between bg-neutral-950 p-4 shadow">
      {/* Search */}
      <input
        type="text"
        placeholder="Search events"
        className="bg-neutral-800 px-4 py-2 rounded-xl text-sm focus:outline-none w-1/3"
      />

      {/* Right side */}
      <div className="flex items-center gap-6">
        <Bell className="text-gray-300 cursor-pointer hover:text-white" />
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium">User123</span>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </header>
  );
}

export default Header;
