import Link from "next/link";
import { Button, Skeleton, Stack } from "@mui/material";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";
import { useQuery } from "@tanstack/react-query";

// Utils
import { fetchArticles } from "@/utils/utils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import ArticlesList from "@/components/tables/articleList/ArticlesList";

const TITLE = "My articles";

export default function MyArticles() {
  // Redirect when log out
  useHomeRedirectOnLogOut();
  // Fetch articles
  const { data } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

  return (
    <>
      <BasicHead title={TITLE} />

      <PageLayout
        title={TITLE}
        button={
          <Link href="/create-article" passHref legacyBehavior>
            <Button aria-label="create article" variant="contained">
              Create new article
            </Button>
          </Link>
        }
      >
        <section>
          {data && <ArticlesList data={data} />}
          {!data && (
            <Stack gap={1}>
              <Skeleton variant="rectangular" height={40} />
              <Skeleton variant="rectangular" width="100%" height={400} />
            </Stack>
          )}
        </section>
      </PageLayout>
    </>
  );
}
