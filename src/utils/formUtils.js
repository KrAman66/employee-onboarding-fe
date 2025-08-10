export function cleanPayload(data) {
  const blacklist = ["employee_id", "created_at", "updated_at"];

  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        !blacklist.includes(key) &&
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );
}
