import React from "react";
import useHomeRedirect from "@/hooks/redirects/useHomeRedirect";
import { useTranslations } from "next-intl";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import CreateProjectForm from "@/components/forms/CreateProjectForm";

const CreateProjectPage = () => {
  // Translations
  const t = useTranslations("createCollab");

  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  return (
    <>
      <BasicHead title={t("Create Collab")} />

      {user && userCheck && (
        <main>
          <PageLayout>
            <CreateProjectForm />
          </PageLayout>
        </main>
      )}
    </>
  );
};

export default CreateProjectPage;

export async function getStaticProps({ locale }: { locale: string }) {
  const createCollab = (
    await import(`../../../messages/${locale}/createCollab.json`)
  ).default;

  const timelineFilter = (
    await import(`../../../messages/${locale}/timelineFilter.json`)
  ).default;

  const navbar = (await import(`../../../messages/${locale}/navbar.json`))
    .default;

  return {
    props: {
      messages: {
        createCollab,
        timelineFilter,
        navbar,
      },
    },
  };
}
