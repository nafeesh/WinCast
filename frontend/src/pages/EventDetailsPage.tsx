import PageWrapper from "../components/PageWrapper";

export default function EventDetailsPage() {
  return (
    <PageWrapper>
      {/* Event Title */}
      <h1 className="text-3xl font-bold mb-4">Event Title</h1>
      <p className="text-gray-400 mb-6">
        Here is a detailed description of the event. It explains what the
        event is about, its importance, and other relevant details.
      </p>

      {/* Predictions Section */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Predictions</h2>
        <ul className="space-y-2">
          <li className="flex justify-between bg-gray-700 p-3 rounded-lg">
            <span>Team A Wins</span>
            <span className="text-purple-400">2.5x</span>
          </li>
          <li className="flex justify-between bg-gray-700 p-3 rounded-lg">
            <span>Team B Wins</span>
            <span className="text-purple-400">1.8x</span>
          </li>
        </ul>
      </div>

      {/* Join Button */}
      <div className="flex justify-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold">
          Join Now
        </button>
      </div>
    </PageWrapper>
  );
}
