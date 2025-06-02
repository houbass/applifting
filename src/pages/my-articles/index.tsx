import Link from "next/link";
import { Button } from "@mui/material";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import ArticlesList from "@/components/tables/articleList/ArticlesList";

const TITLE = "My articles";

export default function MyArticles() {
  // Redirect when log out
  useHomeRedirectOnLogOut();

  // TODO use tanstack query for fetching data
  // Fetch articles data

  return (
    <>
      <BasicHead title={TITLE} />

      <PageLayout
        title={TITLE}
        button={
          <Link href="/create-article" passHref legacyBehavior>
            <Button variant="contained">Create new article</Button>
          </Link>
        }
      >
        <section>
          {/* TODO use skeletons */}
          <ArticlesList />
        </section>
      </PageLayout>
    </>
  );
}
