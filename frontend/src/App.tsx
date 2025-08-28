// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Sidebar from "./components/Sidebar";
// // import Header from "./components/Header";
// // import EventList from "./components/EventList";
// // import LandingPage from "./pages/LandingPage";
// // import SignInPage from "./pages/SignInPage";
// // import SignUpPage from "./pages/SignUpPage";
// // import ProfilePage from "./pages/ProfilePage";
// // import EventDetailsPage from "./pages/EventDetailsPage";


// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Landing Page */}
// //         <Route path="/" element={<LandingPage />} />

// //          {/* Auth Pages */}
// //         <Route path="/signin" element={<SignInPage />} />
// //         <Route path="/signup" element={<SignUpPage />} />

// //         {/* Dashboard Page */}
// //         <Route
// //           path="/dashboard"
// //           element={
// //             <div className="flex h-screen w-screen bg-black text-white">
// //               {/* Sidebar */}
// //               <Sidebar />

// //               {/* Main Content */}
// //               <div className="flex flex-col flex-1">
// //                 <Header />
// //                 <main className="p-6 overflow-y-auto">
// //                   <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
// //                   <EventList />
                    
// //                 </main>
// //               </div>

// //             </div>
// //           }
// //         />

// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
// import EventList from "./components/EventList";
// import LandingPage from "./pages/LandingPage";
// import SignInPage from "./pages/SignInPage";
// import SignUpPage from "./pages/SignUpPage";
// import ProfilePage from "./pages/ProfilePage";
// import EventDetailsPage from "./pages/EventDetailsPage";

// function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex h-screen w-screen bg-black text-white">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex flex-col flex-1">
//         <Header />
//         <main className="p-6 overflow-y-auto ">{children}</main>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing Page */}
//         <Route path="/" element={<LandingPage />} />

//         {/* Auth Pages */}
//         <Route path="/signin" element={<SignInPage />} />
//         <Route path="/signup" element={<SignUpPage />} />

//         {/* Dashboard Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <DashboardLayout>
//               <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
//               <EventList />
//             </DashboardLayout>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <DashboardLayout>
//               <ProfilePage />
//             </DashboardLayout>
//           }
//         />

//         <Route
//           path="/event/:id"
//           element={
//             <DashboardLayout>
//               <EventDetailsPage />
//             </DashboardLayout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EventList from "./components/EventList";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import EventDetailsPage from "./pages/EventDetailsPage";

function DashboardLayout() {
  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-y-auto">
          <Outlet /> {/* child routes render here */}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Redirect `/dashboard` → `/dashboard/events` */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/events" replace />} />

          {/* Events list */}
          <Route
            path="/dashboard/events"
            element={
              <>
                <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
                <EventList />
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
