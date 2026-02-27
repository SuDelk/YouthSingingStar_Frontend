import { useState } from "react";
import { useNavigate } from "react-router-dom";
import contestants from "../data/contestants";
import ContestantCard from "../components/ContestantCard";
import { castVote } from "../utils/votes";

export default function VotingPage() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState(null); // { type: "success"|"error", text }
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!ticketNumber.trim()) {
      setMessage({ type: "error", text: "Please enter your ticket number." });
      return;
    }
    if (!selectedId) {
      setMessage({ type: "error", text: "Please select a contestant to vote for." });
      return;
    }

    const result = castVote(ticketNumber, selectedId);
    if (result.success) {
      setMessage({ type: "success", text: "✅ Your vote has been recorded! Thank you for participating." });
      setTicketNumber("");
      setSelectedId(null);
    } else {
      setMessage({ type: "error", text: result.error });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              🌟 Youth Singing Star
            </h1>
            <p className="text-yellow-100 text-sm mt-1">
              Cast your vote for your favourite contestant
            </p>
          </div>
          <button
            onClick={() => navigate("/results")}
            className="text-sm font-semibold bg-white text-orange-500 rounded-full px-5 py-2 shadow hover:shadow-md transition"
          >
            View Results →
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Ticket input */}
        <section className="bg-white rounded-2xl shadow-md p-6 max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Step 1 — Enter your ticket number
          </h2>
          <input
            type="text"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            placeholder="e.g. TKT-00123"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </section>

        {/* Contestant grid */}
        <section>
          <h2 className="text-lg font-bold text-gray-700 mb-5 text-center">
            Step 2 — Choose your favourite contestant
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {contestants.map((c) => (
              <ContestantCard
                key={c.id}
                contestant={c}
                selected={selectedId === c.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </section>

        {/* Submit */}
        <section className="flex flex-col items-center gap-4">
          {message && (
            <div
              className={`w-full max-w-xl rounded-xl px-5 py-3 text-sm font-medium text-center ${
                message.type === "success"
                  ? "bg-green-50 border border-green-300 text-green-700"
                  : "bg-red-50 border border-red-300 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-base rounded-full px-10 py-3 shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-orange-500 transition-all"
          >
            Submit Vote
          </button>
        </section>
      </main>
    </div>
  );
}
