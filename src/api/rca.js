export async function fetchLatestRCA() {
  const res = await fetch("https://56.228.43.181:8000/rca/latest", {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch latest RCA result");
  const json = await res.json();
  if (Array.isArray(json)) {
    return json;
  }
  return [];
}
