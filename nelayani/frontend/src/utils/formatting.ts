export function rp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

export function freshnessStyle(f: string): string {
  if (f === "Ultra Fresh") return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  if (f === "Very Fresh") return "bg-teal-100 text-teal-700 border border-teal-200";
  return "bg-blue-100 text-blue-700 border border-blue-200";
}

export function statusStyle(s: string): string {
  if (s === "Delivered") return "bg-emerald-100 text-emerald-700";
  if (s === "In Transit") return "bg-amber-100 text-amber-700";
  return "bg-blue-100 text-blue-700";
}
