import { useEffect } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useHomeRedirectOnLogOut() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);

  function redirectHome() {
    router.push("/");
  }

  useEffect(() => {
    if (!user && userCheck) {
      redirectHome();
    }
  }, [user, userCheck, router]);

  return { redirectHome };
}
