import { db } from "@/config/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { Article } from "@/types/types";

export async function fetchArticleById(id: string): Promise<Article> {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Document not found");
  }

  return { id: docSnap.id, ...docSnap.data() } as Article;
}

export async function fetchRelatedArticles(slug: string) {
  const excludedId = slug;
  const colRef = collection(db, "posts");
  const q = query(colRef, where("__name__", "!=", excludedId), limit(4));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => doc.data());

  return data;
}

export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < hour) {
    const minutes = Math.floor(diffMs / minute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffMs < 2 * day) {
    return `yesterday`;
  } else if (diffMs < week) {
    const days = Math.floor(diffMs / day);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diffMs < month) {
    const weeks = Math.floor(diffMs / week);
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (diffMs < year) {
    const months = Math.floor(diffMs / month);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffMs / year);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}
