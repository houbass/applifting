import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, } from "@mui/material";

// Firebase
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

// Types
import { AudioCollectionItem } from "@/components/types";

// Components
import SongCard from "./SongCard";

// TODO make on scroll fetching
const Timeline = () => {

  // States
  const [data, setData] = useState<AudioCollectionItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch data
  useEffect(() => {
    if(!data) {
      fetchCollection();
    }
  }, []);

  // Utils
  const fetchCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "audio"));
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(items as AudioCollectionItem[]);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Stack pt={3} gap={1}>
      {data?.map((item, index) => {
        return (
          <SongCard 
            key={index}
            item={item}
          />
        )
      })}
    </Stack>
  )
}

export default Timeline;