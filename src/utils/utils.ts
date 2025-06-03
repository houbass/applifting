import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Article } from "@/types/types";

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

export async function fetchArticles(): Promise<Article[]> {
  const snapshot = await getDocs(collection(db, "posts"));

  const data: Article[] = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id,
      timeStamp: docData.timeStamp,
      articleTitle: docData.articleTitle,
      content: docData.content,
      pictureUrl: docData.pictureUrl,
      author: docData.author,
      comments: docData.comments,
    };
  });

  const sortedData = data.sort((a, b) => b.timeStamp - a.timeStamp);
  return sortedData;
}
