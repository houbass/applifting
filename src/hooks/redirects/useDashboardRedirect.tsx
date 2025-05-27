import { useRouter } from "next/router";
import { useEffect } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { selectFilterData } from "@/redux/slices/dashboardSlice";

const useDashboardRedirect = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const filterData = useSelector(selectFilterData);
  const userCheck = useSelector(selectUserCheck);

  useEffect(() => {
    if (user && userCheck) {
      router.push({
        pathname: "/dashboard",
        query: {
          filter: JSON.stringify(filterData),
        },
      });
    }
  }, [user, userCheck]);

  return { user, userCheck };
};

export default useDashboardRedirect;
