import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import API from "../services/api";

interface User {
  id: number;
  username: string;
  email: string;
  balance: number;
  total_score: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const token_type = localStorage.getItem("token_type");
        if (!token) {
          setError("Not authenticated");
          return;
        }

        const res = await API.get("/auth/me", {
          headers: { Authorization: `${token_type} ${token}` },
        });

        setUser(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-white text-center">Loading profile...</p>;
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (!user) return null;

  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4">
          <span className="text-white font-bold text-lg">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold">{user.username}</h1>
        <p className="text-gray-400 mb-4">{user.email}</p>


        {/* Total score */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full rounded-lg py-4 text-center mb-6">
          <p className="text-sm">Total score</p>
          <p className="text-2xl font-bold">{user.total_score ?? 0}</p>
        </div>


        {/* Balance Card */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white w-full rounded-lg py-4 text-center mb-6">
          <p className="text-sm">Current Balance</p>
          <p className="text-2xl font-bold">₹ {user.balance ?? 0}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="bg-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700">
            Deposit
          </button>
          {/* <button className="bg-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700">
            Withdraw
          </button> */}
        </div>
      </div>
    </PageWrapper>
  );
}
