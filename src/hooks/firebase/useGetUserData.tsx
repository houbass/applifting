import { useEffect, useState } from "react";

// Firebase
import { db } from "@/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";

// Types
import { UserDataType } from "../types";

const useGetUserData = (id: string | undefined) => {
  const [data, setData] = useState<UserDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "users", id);

    console.log('--- Fetching user data')
    // Listen for real-time updates
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as UserDataType);
      } else {
        console.log("No such document!");
        setData(null);
      }
      setIsLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [id]);

  return { data, isLoading };
};

export default useGetUserData;
