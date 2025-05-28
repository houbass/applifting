import { useCallback } from "react";
import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();

  const goToDashboard = useCallback(() => {
    router.push({
      pathname: "/dashboard",
    });
  }, [router]);

  const goToCreateProject = useCallback(() => {
    router.push("/createproject");
  }, [router]);

  return {
    goToDashboard,
    goToCreateProject,
  };
};

export default useRedirect;
