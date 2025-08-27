function parseDate(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return new Date(value);
  }
  return value;
}

export default parseDate;
