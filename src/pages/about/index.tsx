// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import { Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <BasicHead title="About" />

      <PageLayout title="About">
        <section>
          <Typography>Todo, About</Typography>
        </section>
      </PageLayout>
    </>
  );
}
