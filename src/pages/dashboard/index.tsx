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
  const t = useTranslations("dashboard");

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
  const dashboard = (await import(`../../../messages/${locale}/dashboard.json`))
    .default;

  const timelineFilter = (
    await import(`../../../messages/${locale}/timelineFilter.json`)
  ).default;

  const songCard = (await import(`../../../messages/${locale}/songCard.json`))
    .default;

  const navbar = (await import(`../../../messages/${locale}/navbar.json`))
    .default;

  return {
    props: {
      messages: {
        dashboard,
        timelineFilter,
        songCard,
        navbar,
      },
    },
  };
}
