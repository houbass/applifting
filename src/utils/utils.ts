export const scrollIn = (element: HTMLInputElement) => {
  element.scrollIntoView({ block: "start", behavior: "smooth" });
};

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp);

  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  const formatted = `${mm}/${dd}/${yy}`;
  return formatted;
}

export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
