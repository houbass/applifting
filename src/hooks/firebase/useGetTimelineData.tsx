import { useDispatch } from "react-redux";
import { setTimelineData } from "@/redux/slices/dashboardSlice";

// Firebase
import { getDocs, collection, orderBy, limit, query } from "firebase/firestore";
import { db } from "@/config/firebase";

// Types
import { AudioCollectionItem } from "@/components/types";

// Constants
import { PAGE_SIZE } from "@/constants/globalConstants";

const useGetTimelineData = () => {
  // Hooks
  const dispatch = useDispatch();

  // Utils
  const fetchTimeline = async () => {
    try {
      const q = query(
        collection(db, "audio"),
        orderBy("timeStamp", "desc"),
        limit(PAGE_SIZE)
      );

      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setTimelineData(items as AudioCollectionItem[]));
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return { fetchTimeline };
};

export default useGetTimelineData;
