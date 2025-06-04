import Link from "next/link";
import { useRouter } from "next/router";
import { Stack, Typography, Divider, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

// Utils
import { fetchRelatedArticles } from "@/utils/articleDetailUtils";

export default function RelatedArticles() {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch related articles based on the current article's slug
  const { data } = useQuery({
    queryKey: ["relatedArticles", slug],
    queryFn: () => fetchRelatedArticles(String(slug)),
  });

  return (
    <aside style={{ flex: 1 }}>
      <Stack
        sx={{
          pt: 2,
          borderLeft: { md: "none", lg: "1px solid #DFDFDF" },
          pl: { md: 0, lg: 2 },
        }}
      >
        <Divider
          sx={{
            width: { md: "initial", lg: "0" },
            mb: { xs: 4, md: 4, lg: 0 },
          }}
        />
        <Typography variant="h4">Related articles</Typography>

        <Stack sx={{ pt: 4, gap: 3 }}>
          {data &&
            data.map((article, index) => (
              <Link
                className="unsetLink"
                key={article.articleTitle + index}
                href={`/article-detail/${article.id}`}
              >
                <Stack className="relatedArticle" sx={{ gap: 1 }}>
                  <Typography variant="h6">{article.articleTitle}</Typography>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {article.content}
                  </Typography>
                </Stack>
              </Link>
            ))}{" "}
          {!data && (
            <>
              {[...Array(4)].map((_, index) => (
                <Stack key={index} sx={{ gap: 1, mb: 2 }}>
                  <Skeleton variant="rectangular" height={30} />
                  <Skeleton variant="rectangular" height={80} />
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </Stack>
    </aside>
  );
}
