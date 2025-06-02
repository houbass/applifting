import { useEffect } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useHomeRedirectOnLogIn() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);

  useEffect(() => {
    if (user && userCheck) {
      router.push("/");
    }
  }, [user, userCheck, router]);
}
