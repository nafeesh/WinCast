import EventCard from "./EventCard";

const events = [
  { id: 1, name: "Event A", date: "June 10", participants: 120, prize: 500 },
  { id: 2, name: "Event B", date: "June 9", participants: 90, prize: 300 },
  { id: 3, name: "Event C", date: "June 4", participants: 150, prize: 1000 },
  { id: 4, name: "Event D", date: "May 30", participants: 70, prize: 200 },
];

export default function EventList() {
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div className="grid grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
