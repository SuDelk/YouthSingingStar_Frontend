import { useNavigate } from "react-router-dom";
import contestants from "../data/contestants";
import { getVotes } from "../utils/votes";

export default function ResultsPage() {
  const navigate = useNavigate();
  const votes = getVotes();

  // Build sorted list (highest votes first)
  const ranked = contestants
    .map((c) => ({ ...c, votes: votes[c.id] || 0 }))
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = ranked.reduce((sum, c) => sum + c.votes, 0);
  const maxVotes = ranked[0]?.votes || 1;

  const medalColors = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              🌟 Youth Singing Star
            </h1>
            <p className="text-yellow-100 text-sm mt-1">Live Voting Results</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold bg-white text-orange-500 rounded-full px-5 py-2 shadow hover:shadow-md transition"
          >
            ← Back to Vote
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Summary card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total votes cast</p>
            <p className="text-4xl font-extrabold text-orange-500">{totalVotes}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current leader</p>
            <p className="text-lg font-bold text-gray-800">
              {ranked[0]?.votes > 0 ? ranked[0].name : "—"}
            </p>
          </div>
        </div>

        {/* Results list */}
        <div className="space-y-4">
          {ranked.map((c, index) => {
            const pct = totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(1) : "0.0";
            const barWidth = maxVotes > 0 ? (c.votes / maxVotes) * 100 : 0;

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4"
              >
                <div className="flex items-center gap-4 mb-2">
                  {/* Rank */}
                  <span className="text-xl w-8 text-center flex-shrink-0">
                    {index < 3 ? medalColors[index] : `#${index + 1}`}
                  </span>

                  {/* Avatar */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold text-sm">
                    {c.name.charAt(0)}
                  </div>

                  {/* Name & region */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.region}</p>
                  </div>

                  {/* Vote count */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-800">{c.votes}</p>
                    <p className="text-xs text-gray-400">{pct}%</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="ml-12 h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === 0 ? "bg-yellow-400" : "bg-orange-300"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {totalVotes === 0 && (
          <p className="text-center text-gray-400 py-10">
            No votes yet. Be the first to vote!
          </p>
        )}
      </main>
    </div>
  );
}
