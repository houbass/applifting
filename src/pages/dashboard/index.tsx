import React from "react";
import { Divider } from "@mui/material";
import useHomeRedirect from "@/hooks/redirects/useHomeRedirect";
import { useTranslations } from "next-intl";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import Timeline from "@/components/content/Timeline";
import TimelineFilter from "@/components/filter/TimelineFilter/TimelineFilter";

export default function Dashboard() {
  // Translations
  const t = useTranslations("index");

  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  return (
    <>
      <BasicHead title={t("title")} />

      {user && userCheck && (
        <PageLayout>
          <TimelineFilter />
          <Divider />
          <Timeline />
        </PageLayout>
      )}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const index = (await import(`../../../messages/${locale}/index.json`))
    .default;

  const timelineFilterTexts = (
    await import(`../../../messages/${locale}/timelineFilter.json`)
  ).default;

  return {
    props: {
      messages: {
        index,
        timelineFilterTexts,
      },
    },
  };
}
