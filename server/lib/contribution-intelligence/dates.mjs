const DAY_IN_MS = 24 * 60 * 60 * 1000;

export function startOfUtcDay(input = new Date()) {
  const date = input instanceof Date ? input : new Date(input);

  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function subtractDays(input, days) {
  return new Date(startOfUtcDay(input).getTime() - (days * DAY_IN_MS));
}

export function addDays(input, days) {
  return new Date(startOfUtcDay(input).getTime() + (days * DAY_IN_MS));
}

export function toDateKey(input = new Date()) {
  return startOfUtcDay(input).toISOString().slice(0, 10);
}

export function fromDateKey(value) {
  return new Date(`${value}T00:00:00.000Z`);
}

export function getWeekStartDateKey(value, weekStartsOn = 'monday') {
  const date = startOfUtcDay(value instanceof Date ? value : fromDateKey(value));
  const day = date.getUTCDay();
  const offset = weekStartsOn === 'sunday'
    ? day
    : (day + 6) % 7;

  return toDateKey(addDays(date, offset * -1));
}

export function getWeekEndDateKey(value, weekStartsOn = 'monday') {
  return toDateKey(addDays(fromDateKey(getWeekStartDateKey(value, weekStartsOn)), 6));
}

export function toIsoTimestamp(input = new Date()) {
  return new Date(input).toISOString();
}

