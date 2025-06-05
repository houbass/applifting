import { Article, NewArticleFormData } from "@/types/types";
import { toKebabCase } from "./utils";

// Firebase
import { db, storage } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

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

export async function handleArticleAction(
  type: "create" | "update" | "delete",
  data?: NewArticleFormData,
  id?: string
) {
  try {
    if (type === "create" && data) {
      const { articleTitle, content, image } = data;
      const timeStamp = Date.now();
      const customId = toKebabCase(data.articleTitle) + "-" + timeStamp;
      const storageRef = ref(storage, `posts/${customId}.jpg`);

      // Upload the image
      await uploadBytes(storageRef, image as File);

      // Get download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Save to Firestore
      await setDoc(doc(db, "posts", customId), {
        id: customId,
        timeStamp,
        articleTitle,
        content,
        pictureUrl: imageUrl,
        author: "Elisabeth Strain",
        comments: 0,
      });

      return;
    }

    if (type === "update" && id && data) {
      const { articleTitle, content, image } = data;
      const storageRef = ref(storage, `posts/${id}.jpg`);
      const docRef = doc(db, "posts", id);

      // If image is a string, it means no new image is provided
      // so we only update the database
      if (typeof image === "string") {
        await updateDoc(docRef, {
          articleTitle,
          content,
        });

        return;
      }

      // Delete old image
      await deleteObject(storageRef).catch((err) => {
        if (err.code !== "storage/object-not-found") {
          throw err;
        }
      });

      // Upload new image
      await uploadBytes(storageRef, image as File);

      // Get download URL
      const imageUrl = await getDownloadURL(storageRef);

      await updateDoc(docRef, {
        articleTitle,
        content,
        pictureUrl: imageUrl,
      });

      return;
    }

    if (type === "delete" && id) {
      const storageRef = ref(storage, `posts/${id}.jpg`);
      const docRef = doc(db, "posts", id);

      // Delete old image
      await deleteObject(storageRef).catch((err) => {
        if (err.code !== "storage/object-not-found") {
          throw err;
        }
      });

      // Delete document from database
      await deleteDoc(docRef);

      return;
    }
  } catch (err) {
    throw err;
  }
}
