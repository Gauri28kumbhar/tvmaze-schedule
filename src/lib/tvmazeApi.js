const BASE_URL = "https://api.tvmaze.com";

async function handle(res) {
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function fetchSchedule(country = "US") {
  return handle(await fetch(`${BASE_URL}/schedule?country=${country}`));
}

export async function fetchShowById(id) {
  return handle(await fetch(`${BASE_URL}/shows/${id}`));
}