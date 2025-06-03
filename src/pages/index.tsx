// Types
import { Article } from "@/types/types";

// Utils
import { fetchArticles } from "@/utils/utils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import Timeline from "@/components/content/Timeline";

interface Props {
  fallbackArticles: Article[];
}

export default function Home({ fallbackArticles }: Props) {
  return (
    <>
      <BasicHead title="Home" />

      <PageLayout title="Recent articles">
        <section>
          <Timeline data={fallbackArticles} />
        </section>
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const articles = await fetchArticles();

  return {
    props: {
      fallbackArticles: articles,
    },
  };
}
