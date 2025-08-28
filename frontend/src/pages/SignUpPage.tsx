import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";


function SignUpPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

          if (!form.username.trim()) {
            setError("Username is required.");
            return;
          }

          if (!form.email.trim()) {
            setError("Email is required.");
            return;
          }

          if (!form.password.trim()) {
            setError("Password is required.");
            return;
          }

          
          if (form.password.trim() !== form.confirmPassword.trim()) {
            setError("Password is not same.");
            return;
          }

          const res = await API.post("/auth/register", form);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/dashboard");
        } catch (err: any) {
          setError(err.response?.data?.message || "Sign up failed");
        }
      };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl shadow-lg p-8">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl w-96 space-y-4">

        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-6">
          Create Account
        </h1>
        {error && <p className="text-red-400">{error}</p>}
        
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-purple-500 focus:outline-none"
        />

        {/* Sign Up Button */}
        <button
          // onClick={() => navigate("/dashboard")}
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 px-6 py-3 rounded-lg text-white font-semibold"
        >
          Register
        </button>
        </form>
        {/* Back to Sign In */}
        <p className="text-center mt-4 text-zinc-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
