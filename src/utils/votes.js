const VOTES_KEY = "yss_votes";
const USED_TICKETS_KEY = "yss_used_tickets";

/**
 * Returns a map of { contestantId: voteCount }.
 */
export function getVotes() {
  try {
    return JSON.parse(localStorage.getItem(VOTES_KEY)) || {};
  } catch {
    return {};
  }
}

/**
 * Returns the set of ticket numbers that have already voted.
 */
export function getUsedTickets() {
  try {
    return new Set(JSON.parse(localStorage.getItem(USED_TICKETS_KEY)) || []);
  } catch {
    return new Set();
  }
}

/**
 * Records a vote for contestantId with the given ticketNumber.
 * Returns { success, error }.
 */
export function castVote(ticketNumber, contestantId) {
  const ticket = ticketNumber.trim().toUpperCase();
  if (!ticket) return { success: false, error: "Please enter your ticket number." };

  const used = getUsedTickets();
  if (used.has(ticket)) {
    return { success: false, error: "This ticket has already been used to vote." };
  }

  const votes = getVotes();
  votes[contestantId] = (votes[contestantId] || 0) + 1;

  used.add(ticket);

  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  localStorage.setItem(USED_TICKETS_KEY, JSON.stringify([...used]));

  return { success: true };
}
