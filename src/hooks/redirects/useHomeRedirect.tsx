import { useEffect } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function useHomeRedirect() {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);

  console.log(user);

  useEffect(() => {
    if (user && userCheck) {
      router.push("/");
    }
  }, [user, userCheck, router]);

  return { user, userCheck };
}
