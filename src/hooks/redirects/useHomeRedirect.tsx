import { useEffect } from "react";
import { selectUser, selectUserCheck } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const useHomeRedirect = () => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);
  
  useEffect(() => {
    if(!user && userCheck) {
      router.push("/");
    } 
  }, [user, userCheck])
}

export default useHomeRedirect;