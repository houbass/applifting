
import { useCallback } from "react";
import { useRouter } from "next/router";

const useRedirect = () => {

  const router = useRouter();

  const goToDashboard = useCallback(() => {
    router.push("/dashboard")
  }, [])

  const goToCreateProject = useCallback(() => {
    router.push("/createproject")
  }, [])
  
  return { 
    goToDashboard,
    goToCreateProject,
  }
}

export default useRedirect;