import { GetServerSidePropsContext } from "next";
import { Stack, Divider } from "@mui/material";

// Types
import { Article } from "@/types/types";

// Utils
import { fetchArticleById } from "@/utils/articleDetailUtils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import ArticleDetail from "@/components/content/ArticleDetail";
import RelatedArticles from "../../components/content/RelatedArticles";
import Comments from "../../components/content/Comments";

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
            <Stack sx={{ flex: 2, gap: 4 }}>
              <ArticleDetail data={article} />
              <Divider />
              <Comments />
            </Stack>

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
