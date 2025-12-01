export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(dateValue: any): string {
  if (!dateValue) return "";

  // If it's already a Date object
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString();
  }

  // If it's a string, try to parse it
  if (typeof dateValue === "string") {
    const parsedDate = new Date(dateValue);
    // Check if the parsed date is valid
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString();
    }
    // If parsing failed, return the original string
    return dateValue;
  }

  // If it's a timestamp (number)
  if (typeof dateValue === "number") {
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString();
    }
  }

  // Fallback: return as string
  return String(dateValue);
}
