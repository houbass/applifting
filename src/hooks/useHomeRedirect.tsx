import { useEffect } from "react";
import { selectUser, selectUserCheck, setUserCheck } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const useHomeRedirect = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const userCheck = useSelector(selectUserCheck);
  
  useEffect(() => {
    if(!user && userCheck) {
      router.push("/");
      dispatch(setUserCheck(false));
    } 
  }, [user, userCheck])
}

export default useHomeRedirect;