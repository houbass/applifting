import { useEffect, useCallback } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useHomeRedirectOnLogOut() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);

  const redirectHome = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!user && userCheck) {
      redirectHome();
    }
  }, [user, userCheck, router, redirectHome]);

  return { redirectHome };
}
