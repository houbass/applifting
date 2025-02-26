
import { useDispatch } from "react-redux";
import { selectFilterData, setTimelineData } from "@/redux/slices/dashboardSlice";
import { useSelector } from "react-redux";

// Firebase
import { getDocs, collection, orderBy, limit, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

// Utils
import { combineArrays } from "../upload/utils";

// Types
import { AudioCollectionItem } from "@/components/types";

// Constants
import { PAGE_SIZE } from "@/constants/globalConstants";
import { useMemo } from "react";

const useGetTimelineData = () => {

  // Hooks
  const dispatch = useDispatch();
  
  // States
  const { instruments, styles } = useSelector(selectFilterData);
  const isFilterActive = useMemo(() => instruments.length > 0 || styles.length > 0, [instruments, styles]);

  // Utils
  const fetchTimeline = async () => {
    try {
      let q;
      if(isFilterActive) {
        const searchValue = combineArrays(instruments, styles).join('-');
        q = query(
          collection(db, "audio"), 
          where("searchTags", "array-contains", searchValue),  // Checks if searchArr contains searchValue
          orderBy("timeStamp", "desc"),
          limit(PAGE_SIZE)
        );
      } else {
        q = query(
          collection(db, "audio"), 
          orderBy("timeStamp", "desc"), 
          limit(PAGE_SIZE)
        );
      }

      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      dispatch(setTimelineData(items as AudioCollectionItem[]))
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return { fetchTimeline }
}

export default useGetTimelineData;