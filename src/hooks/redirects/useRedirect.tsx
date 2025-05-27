import { useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectFilterData } from "@/redux/slices/dashboardSlice";

const useRedirect = () => {
  const router = useRouter();
  const filterData = useSelector(selectFilterData);

  const goToDashboard = useCallback(() => {
    router.push({
      pathname: "/dashboard",
      query: {
        filter: JSON.stringify(filterData),
      },
    });
  }, []);

  const goToCreateProject = useCallback(() => {
    router.push("/createproject");
  }, []);

  return {
    goToDashboard,
    goToCreateProject,
  };
};

export default useRedirect;
