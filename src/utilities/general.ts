/**
 * Second to string timespan (d:HH:mm:ss)
 * @param p Time in seconds
 * @returns String denoting timespan
 */
export function secondToTimespan(p: number, addString: boolean = false): string {
  let remainingS = p;
  const d = Math.trunc(remainingS / (3600 * 24));
  const dStr = d > 0 ? `${d} day${d > 1 ? 's' : ''}` : ''
  
  remainingS %= (3600 * 24);
  const h = Math.trunc(remainingS / 3600);
  
  remainingS %= 3600;
  const m = Math.trunc(remainingS / 60);
  
  const s = remainingS % 60;
  const tickString = d > 0 ? `${d}:${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}` : `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  if (!addString) return tickString;
  
  const strString = [
    (d > 0 ? `${d} day${d > 1 ? 's' : ''}` : ''),
    (h > 0 ? `${h} hour${h > 1 ? 's' : ''}` : ''),
    (m > 0 ? `${m} minute${m > 1 ? 's' : ''}` : ''),
    (s > 0 ? `${s} second${s > 1 ? 's' : ''}` : '')
  ].filter(x => x.length > 0).join(' ')

  return `${tickString} (${strString})`;
}

export function ticksToTime(p: number): string {
  const s = p / 10_000_000;
  if (s === 0) return "00:00";

  const h = Math.trunc(s / 3600);
  const m = Math.trunc(s % 3600 / 60); 
  
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export function omitProperty<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) delete result[key];
  return result;
}