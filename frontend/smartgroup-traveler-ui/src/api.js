const BASE_URL = "http://localhost:8000/api/v1"; // Adjust if different

export async function fetchDestinations() {
  const res = await fetch(`${BASE_URL}/cms/destinations`);
  return res.json();
}

export async function submitTravelRequest(data) {
  const res = await fetch(`${BASE_URL}/travel/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
