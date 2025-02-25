
import { useEffect, useState } from "react";

// Firebase
import { db } from "@/config/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

// Types
import { AudioCollectionItem } from "@/components/types";

const useGetUserSongs = (id: string | undefined) => {

  // States
  const [songs, setSongs] = useState<AudioCollectionItem[] | null>(null);
  const [isSongsLoading, setIsSongsLoading] = useState(false);

  async function fetchUserSongs(id: string, setSongs: (value: AudioCollectionItem[]) => void) {
    setIsSongsLoading(true)
    try {

      // TODO WHEN FILTERING
      /*
      const q = query(
        collection(db, "audio"), 
        where("searchArr", "array-contains", searchValue),  // Checks if searchArr contains searchValue
        orderBy("timeStamp", "desc"),
        limit(10)
      );
      */

      const q = query(
        collection(db, "audio"), 
        where("uid", "==", id),
        orderBy("timeStamp", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setSongs(docs as AudioCollectionItem[]);
      setIsSongsLoading(false);
    } catch (error) {
      console.error("Error fetching documents: ", error);
      setIsSongsLoading(false);
    }
  };

  // Fetch user songs
  useEffect(() => {
    if(id) {
      fetchUserSongs(id, setSongs)
    }
  }, [id])

  return { songs, setSongs, isSongsLoading }
}

export default useGetUserSongs;