import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import API from "../services/api";

interface Prediction {
  id: number;
  event_id: number;
  predicted_value: string | number;
  submitted_at: string;
  is_correct: number | null;
  score: number | null;
  event: {
    id: number;
    title: string;
    description: string;
    category: string;
    start_time: string;
    end_time: string;
  };
}

export default function MyEventsList() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/predictions/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPredictions(res.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load my events");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) return <p className="text-white">Loading my events...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="grid grid-cols-4 gap-6">
      {predictions.map((prediction) => (
        <EventCard
          key={prediction.id}
          event={prediction.event}
          prediction={prediction}
        />
      ))}
    </div>
  );
}
