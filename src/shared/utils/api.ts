export const getAllTickets = async () => {
  const res = await fetch("/api/tickets/alltickets");

  return res.json();
};

export const updateTicket = async (updatedTicket) => {
  const body = JSON.stringify(updatedTicket);
  const res = await fetch("/api/tickets/updateticket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const data = await res.json()
  return data
};
