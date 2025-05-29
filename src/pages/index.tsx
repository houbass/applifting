import React, { useEffect } from "react";

// Hooks
import useGetTimelineData from "@/hooks/firebase/useGetTimelineData";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import Timeline from "@/components/content/Timeline";

export default function Home() {
  // Hooks
  const { fetchTimeline } = useGetTimelineData();

  // TODO use tanstack query for fetching data
  // Fetch timeline data
  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  return (
    <>
      <BasicHead title="Home" />

      <PageLayout title="Recent articles">
        <Timeline />
      </PageLayout>
    </>
  );
}
