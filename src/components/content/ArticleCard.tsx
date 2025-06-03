import Link from "next/link";
import { Stack, Box, Typography } from "@mui/material";
import Image from "next/image";

// Types
import { Article } from "@/types/types";

// Utils
import { formatTimestamp } from "@/utils/utils";

interface Props {
  data: Article;
}

// TODO comments
export default function ArticleCard({ data }: Props) {
  const { id, timeStamp, articleTitle, content, pictureUrl, author } = data;
  const formatedDate = formatTimestamp(timeStamp);
  return (
    <article>
      <Stack
        direction={{ sm: "column", md: "row" }}
        sx={{ width: "100%", maxWidth: 860, gap: 2 }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", sm: "100%", md: 244 },
            minWidth: { xs: "100%", sm: "100%", md: 244 },
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          <Image
            src={pictureUrl}
            alt="Cover"
            priority
            width={400}
            height={400}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">{articleTitle}</Typography>

          <Typography color="secondary">
            {author} - {formatedDate}
          </Typography>

          <Typography
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {content}
          </Typography>

          <Stack sx={{ flexDirection: "row", gap: 1, pl: 1 }}>
            {/*TODO */}
            <Link href={"/article-detail/" + id} className="unsetLink">
              <Typography color="primary">Read whole article</Typography>
            </Link>

            <Typography color="secondary">4 comments</Typography>
          </Stack>
        </Stack>
      </Stack>
    </article>
  );
}
