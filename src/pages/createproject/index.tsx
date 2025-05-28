import React from "react";
import useHomeRedirect from "@/hooks/redirects/useHomeRedirect";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";

const CreateProjectPage = () => {
  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  return (
    <>
      <BasicHead title="Create Collab" />

      {user && userCheck && (
        <main>
          <PageLayout>
            <p>create post</p>
          </PageLayout>
        </main>
      )}
    </>
  );
};

export default CreateProjectPage;
