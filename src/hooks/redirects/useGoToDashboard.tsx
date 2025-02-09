
import { useCallback } from "react";
import { useRouter } from "next/router";

const useGoToDashboard = () => {

  const router = useRouter();

  const goToDashboard = useCallback(() => {
    router.push("/dashboard")
  }, [])
  
  return { goToDashboard }
}

export default useGoToDashboard;