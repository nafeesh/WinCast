import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { formatDateTime } from "../utils/formatDate";
import PageWrapper from "../components/PageWrapper";
import { Calendar, Trophy, Tag, ArrowLeft } from "lucide-react";
import Toast from "../components/Toast";

interface Winner {
  username: string;
  score: number;
}

interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  start_time: string;
  end_time: string;
  options: string[];
  // Optional (only present when event is closed / winners exist)
  is_closed?: boolean;
  winner_option?: string;
  winners?: Winner[];
}

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/events/event/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvent(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmitPrediction = async () => {
    if (!selectedOption) {
      setToast({ message: "Please select an option before submitting", type: "error" });
      return;
    }
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await API.post(
        `/predictions/predict`,
        {
          event_id: id,
          predicted_value: selectedOption,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast({ message: "✅ Prediction submitted!", type: "success" });
    } catch (err: any) {
      setToast({ message: err.response?.data?.detail || "Failed", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!event) return <p className="text-gray-400">No event found</p>;

  const isClosed = Boolean(event.is_closed); // safe check

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto bg-gradient-to-b from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </button>

        {/* Title & Description */}
        <h1 className="text-3xl font-bold mb-3 text-white">{event.title}</h1>
        <p className="text-gray-400 mb-6 leading-relaxed">{event.description}</p>

        {/* Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-xl">
            <Tag className="w-5 h-5 text-purple-400" />
            <span className="text-gray-200">{event.category}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-xl">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="text-gray-200">Start: {formatDateTime(event.start_time)}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-xl">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-200">End: {formatDateTime(event.end_time)}</span>
          </div>
        </div>

        {/* Winner Section (only if backend marks event closed) */}
        {isClosed && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2 mb-4">
              <Trophy className="w-6 h-6" /> Winners
            </h2>

            {/* Winning Option */}
            <p className="text-lg text-gray-200 mb-4">
              🏆 Winning Option:{" "}
              <span className="font-semibold text-white">{event.winner_option ?? "—"}</span>
            </p>

            {/* Winners Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-3 text-gray-400">Rank</th>
                    <th className="py-2 px-3 text-gray-400">User</th>
                    <th className="py-2 px-3 text-gray-400">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {event.winners && event.winners.length > 0 ? (
                    event.winners.map((w, idx) => (
                      <tr key={`${w.username}-${idx}`} className="border-b border-gray-700 hover:bg-gray-700/40">
                        <td className="py-2 px-3 text-gray-200">{idx + 1}</td>
                        <td className="py-2 px-3 text-white font-medium">{w.username}</td>
                        <td className="py-2 px-3 text-green-400 font-semibold">{w.score}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-400">
                        Winners will be announced soon
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prediction Options (hidden when closed) */}
        {!isClosed && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">Prediction Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(event.options || []).map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(opt)}
                  className={`py-3 rounded-xl font-semibold shadow-md transition-all
                    ${
                      selectedOption === opt
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmitPrediction}
                disabled={submitting}
                className="w-full bg-gradient-to-r from-pink-600 to-red-600 hover:opacity-90 text-white py-3 rounded-xl font-bold shadow-md disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Prediction"}
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </PageWrapper>
  );
}
