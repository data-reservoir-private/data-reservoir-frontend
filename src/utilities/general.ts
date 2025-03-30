/**
 * Second to string timespan (d:HH:mm:ss)
 * @param p Time in seconds
 * @returns String denoting timespan
 */
export function secondToTimespan(p: number): string {
  let s = p;
  const d = Math.trunc(s / (3600 * 24));

  s %= (3600 * 24);
  const h = Math.trunc(s / 3600).toString().padStart(2, "0");

  s %= 3600;
  const m = Math.trunc(s / 60).toString().padStart(2, "0");

  s %= 60;
  const ns = s.toString().padStart(2, "0");

  return d > 0 ? `${d}:${h}:${m}:${ns}` : `${h}:${m}:${ns}`;
}

export function ticksToTime(p: number): string {
  const s = p / 10_000_000;
  if (s === 0) return "00:00";

  const h = Math.trunc(s / 3600);
  const m = Math.trunc(s % 3600 / 60); 
  
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}