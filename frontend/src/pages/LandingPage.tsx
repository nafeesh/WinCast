import { useNavigate } from "react-router-dom";


export default function LandingPage() {
    const navigate = useNavigate();
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-black text-white">
        <div className="text-center max-w-md">
          <img
            src="/logo.png"
            alt="WinCast"
            className="mx-auto mb-6 h-16"
          />
  
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            WinCast
          </h1>
  
          <p className="mb-6 text-gray-300">
            Discover events and make predictions!
          </p>
  
          <button 
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Get Started
          </button>

        {/* <button
          onClick={() => navigate("/app")}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg text-white font-semibold"
        >
          Get Started
        </button> */}
  
          <button className="w-full mt-3 bg-zinc-900 px-6 py-3 rounded-full font-semibold hover:bg-zinc-800 transition">
            Sign In
          </button>
        </div>
      </div>
    );
  }
  