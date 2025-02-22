
import React from "react";
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import CreateProjectForm from "@/components/forms/CreateProjectForm";

const CreateProjectPage = () => {

  // Redirect when logout
  useHomeRedirect();

  return (
    <>
      <BasicHead title="Create Collab"/>

      <main>
        <PageLayout>
          <CreateProjectForm />
        </PageLayout>
      </main>
    </>
  )
}

export default CreateProjectPage;