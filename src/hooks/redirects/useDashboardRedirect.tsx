import { useRouter } from "next/router";
import { useEffect } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";

const useDashboardRedirect = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);

  useEffect(() => {
    if(user && userCheck) {
      router.push("/dashboard");
    }
  }, [user, userCheck])

  return { user, userCheck}
}

export default useDashboardRedirect;