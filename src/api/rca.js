export async function fetchLatestRCA() {
  const endpoint = window.location.origin.includes('localhost') ? 'https://56.228.43.181:8000/rca/latest' : 'http://56.228.43.181:8000/rca/latest';
  console.log('RCA endpoint:: '+endpoint)
  const res = await fetch(endpoint, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch latest RCA result");
  const json = await res.json();
  if (Array.isArray(json)) {
    return json;
  }
  return [];
}
