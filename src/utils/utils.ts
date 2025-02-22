
export const scrollIn = (element: HTMLInputElement) => {
  element.scrollIntoView({block: "start", behavior: "smooth"})
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp); 

  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = String(date.getFullYear()); 

  return `${day}/${month}/${year}`; 
}