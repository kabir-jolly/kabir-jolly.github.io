// Short year labels for list rows: "8/2025 – 4/2026" -> "2025–26",
// "4/2026 – Now" -> "2026–", "Summer 2021" -> "2021", "2017–2019" -> "2017–19".
export function yearLabel(date: string): string {
  const years = (date.match(/\b(?:19|20)\d{2}\b/g) ?? []).map(Number);
  if (years.length === 0) return "";
  const first = Math.min(...years);
  const last = Math.max(...years);
  if (/\bnow\b/i.test(date)) return `${first}–`;
  if (first === last) return String(first);
  const lastLabel =
    Math.floor(first / 100) === Math.floor(last / 100)
      ? String(last).slice(2)
      : String(last);
  return `${first}–${lastLabel}`;
}

// Project dates read "Stanford CS 224N • 2023": the part before the bullet is
// where the work was done.
export function projectPlace(date: string): string {
  const parts = date.split("•");
  return parts.length > 1 ? parts[0].trim() : "";
}
