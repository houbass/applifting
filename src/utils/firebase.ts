
import { db, storage } from "@/config/firebase";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

export async function deleteFileFromStorage(filePath: string) {
  const fileRef = ref(storage, filePath); 

  try {
      await deleteObject(fileRef); 
  } catch (error) {
      console.error("Error deleting file: ", error);
  }
};

export async function deleteDocumentById (collectionName: string, documentId: string) {
  const docRef = doc(db, collectionName, documentId); 

  try {
      await deleteDoc(docRef);
      
  } catch (error) {
      console.error("Error deleting document: ", error);
  }
};

export async function removeProjectId(userId: string, projectId: string) {
  const userRef = doc(db, "users", userId);

  try {
      await updateDoc(userRef, {
          projectIds: arrayRemove(projectId)
      });
      
  } catch (error) {
      console.error("Error removing project ID: ", error);
  }
};