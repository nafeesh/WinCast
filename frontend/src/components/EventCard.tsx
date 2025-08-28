import { formatDateTime } from "../utils/formatDate";


type EventProps = {
    event: {
      id: number;
      title: string;
      description: string;
      category: string;
      end_time: string;
      start_time: string;
      options: [];
    };
  };
  
  export default function EventCard({ event }: EventProps) {
    
    return (
      <div className="bg-gray-900 p-4 rounded-2xl shadow-lg w-full min-w-[200px] hover:scale-105 transition-transform">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        
        <div className="mt-2 text-md text-white-400">
          <p >Description: {event.description}</p>
          <p >Category: {event.category}</p>
        </div>
        <div className="flex justify-between items-right mt-3 text-sm">
          <span>Start: {formatDateTime(event.start_time)}</span>
          <span>End: {formatDateTime(event.end_time)}</span>
        </div>
        
  
        {/* <div className="flex justify-between items-center mt-3 text-sm">
          <span>👥 {event.participants} joined</span>
          <span>🏆 ${event.prize}</span>
        </div> */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <span>👥 100 joined</span>
          {/* <span>🏆 $100</span> */}
        </div>
  
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">
          Predict Now
        </button>
      </div>
    );
  }
  