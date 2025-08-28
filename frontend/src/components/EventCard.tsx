type EventProps = {
    event: {
      id: number;
      name: string;
      date: string;
      participants: number;
      prize: number;
    };
  };
  
  export default function EventCard({ event }: EventProps) {
    return (
      <div className="bg-gray-900 p-4 rounded-2xl shadow-lg w-full min-w-[200px] hover:scale-105 transition-transform">
        <h2 className="text-lg font-semibold">{event.name}</h2>
        <p className="text-sm text-gray-400">{event.date}</p>
  
        <div className="flex justify-between items-center mt-3 text-sm">
          <span>👥 {event.participants} joined</span>
          <span>🏆 ${event.prize}</span>
        </div>
  
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
          Predict Now
        </button>
      </div>
    );
  }
  