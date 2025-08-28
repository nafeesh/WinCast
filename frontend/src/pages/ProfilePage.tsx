import PageWrapper from "../components/PageWrapper";

export default function ProfilePage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center mb-4">
          <span className="text-white font-bold">User</span>
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold">John Doe</h1>
        <p className="text-gray-400 mb-4">@johndoe</p>

        {/* Balance Card */}
        <div className="bg-purple-600 text-white w-full rounded-lg py-4 text-center mb-6">
          <p className="text-sm">Current Balance</p>
          <p className="text-2xl font-bold">$250</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button className="bg-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700">
            Deposit
          </button>
          <button className="bg-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700">
            Withdraw
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
