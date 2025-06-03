import { GetServerSidePropsContext } from "next";
import { Stack } from "@mui/material";

// Types
import { Article } from "@/types/types";

// Utils
import { fetchArticleById } from "./utils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import ArticleDetail from "@/pages/article-detail/components/ArticleDetail";
import RelatedArticles from "./components/RelatedArticles";

interface Props {
  article: Article;
}

export default function ArticleDetailPage({ article }: Props) {
  const { articleTitle } = article;

  return (
    <>
      <BasicHead title={articleTitle} />
      <PageLayout>
        <section>
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "column", lg: "row" },
              gap: 2,
            }}
          >
            <ArticleDetail data={article} />
            <RelatedArticles />
          </Stack>
        </section>
      </PageLayout>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const id = context.params?.slug as string;

    if (!id) {
      return { notFound: true };
    }

    const article = await fetchArticleById(id);

    return {
      props: {
        article,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
