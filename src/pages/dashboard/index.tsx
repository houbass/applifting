import React from "react";
import { Divider } from '@mui/material';
import useHomeRedirect from '@/hooks/redirects/useHomeRedirect';

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import Timeline from "@/components/content/Timeline";
import TimelineFilter from "@/components/filter/TimelineFilter/TimelineFilter";

export default function Dashboard() {

  // Redirect when logout
  const { user, userCheck } = useHomeRedirect();

  return (
    <>
      <BasicHead title="Collabro"/>

      { user && userCheck && (
        <PageLayout>
          <TimelineFilter />
          <Divider />     
          <Timeline />
        </PageLayout>
      )}
    </>
  )
}
