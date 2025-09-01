import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EventList from "./components/EventList";
import MyEventList from "./components/MyEventList";
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
                <h1 className="text-2xl font-bold mb-4">Live Events</h1>
                <EventList />
              </>
            }
          />

          {/* Events list */}
          <Route
            path="/dashboard/my-events"
            element={
              <>
                <h1 className="text-2xl font-bold mb-4">My Events</h1>
                <MyEventList />
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
