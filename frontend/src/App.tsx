// // import React from "react";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import EventList from "./components/EventList";
// import LandingPage from "./pages/LandingPage";


// function App() {
//   return (
//     <div className="flex h-screen w-screen bg-black text-white">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         <Header />

//         <main className="p-6 overflow-y-auto">
//           <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
//             {/* Example Event Cards */}
//             <EventList />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EventList from "./components/EventList";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Page */}
        <Route
          path="/dashboard"
          element={
            <div className="flex h-screen w-screen bg-black text-white">
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div className="flex flex-col flex-1">
                <Header />
                <main className="p-6 overflow-y-auto">
                  <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
                  <EventList />
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
