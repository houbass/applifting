import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Stack, Box, Typography } from "@mui/material";

// Firebase
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

// Types
import { Article } from "@/types/types";

// Utils
import { formatTimestamp } from "@/utils/utils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";

const fetchArticleById = async (id: string): Promise<Article> => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Document not found");
  }

  return { id: docSnap.id, ...docSnap.data() } as Article;
};

interface Props {
  article: Article;
}

export default function ArticleDetail({ article }: Props) {
  const { articleTitle, content, pictureUrl, author, timeStamp } = article;
  console.log("article", article);

  const formatedDate = formatTimestamp(timeStamp);
  return (
    <>
      <BasicHead title={articleTitle} />
      <PageLayout title={articleTitle}>
        <section>
          <Stack
            sx={{
              gap: 3,
              maxWidth: 760,
            }}
          >
            <Typography color="secondary">
              {author + " - " + formatedDate}
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "760/504",
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              <Image
                src={pictureUrl}
                alt="Cover"
                priority
                width={600}
                height={600}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Typography
              component="pre"
              sx={{
                whiteSpace: "pre-wrap",
              }}
            >
              {content}
            </Typography>
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
