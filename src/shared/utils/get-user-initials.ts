export function getUserInitials(displayName: string, fallback = "MV") {
  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0))
    .join("");

  return initials || fallback;
}
