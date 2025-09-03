import { formatDateTime } from "../utils/formatDate";
// import { Trophy } from "lucide-react"; // choose icons you like
import { Link } from "react-router-dom";



type EventProps = {
  event: {
    id: number;
    title: string;
    description: string;
    category: string;
    end_time: string;
    start_time: string;
    options?: [];
  };
  prediction?: {
    predicted_value: string | number;
    is_correct?: number | null;
    score?: number | null;
  };
};

export default function EventCard({ event, prediction  }: EventProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl w-full min-w-[240px] hover:scale-[1.03] transition-transform duration-300 border border-gray-700">
      {/* Title with Icon */}
      <div className="flex items-center gap-2 mb-2">
        {/* <Trophy className="w-6 h-6 text-purple-400" /> Change icon based on sport */}
        <h2 className="text-xl font-bold text-white">🏆{event.title}</h2>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>

      {/* Category */}
      <span className="inline-block px-3 py-1 bg-purple-600/20 text-purple-400 text-xs font-medium rounded-full mb-4">
        {event.category}
      </span>

      {/* Timing */}
      <div className="bg-gray-800 rounded-xl px-4 py-2 text-sm text-gray-300 space-y-1 mb-4">
        <p>
          <span className="font-medium text-gray-400">Start:</span>{" "}
          {formatDateTime(event.start_time)}
        </p>
        <p>
          <span className="font-medium text-gray-400">End:</span>{" "}
          {formatDateTime(event.end_time)}
        </p>
      </div>

      {/* Prediction Info (only if passed) */}
      {prediction && (
        <div className="mt-3 p-2 rounded-lg bg-gray-800 text-sm">
          <p className="text-blue-400">
            Your Prediction: {prediction.predicted_value}
          </p>
          {prediction.is_correct !== null && (
            <p
              className={
                prediction.is_correct ? "text-green-400" : "text-red-400"
              }
            >
              {prediction.is_correct ? "✅ Correct" : "❌ Wrong"}
            </p>
          )}
          {prediction.score !== undefined && (
            <p className="text-yellow-400">Score: {prediction.score}</p>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
        <span>👥 100 joined</span>
        <span className="text-yellow-400 font-semibold">🏆 Prize Pool</span>
      </div>

      {/* CTA Button */}
      {!prediction && (
      <Link to={`/event/${event.id}`}>
        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white py-2.5 rounded-xl font-semibold transition-all">
          Predict Now
        </button>
      </Link>
      )}
    </div>
  );
}
