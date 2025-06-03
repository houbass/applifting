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
