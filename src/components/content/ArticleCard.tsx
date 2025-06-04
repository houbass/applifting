import { useState } from "react";
import Link from "next/link";
import { Stack, Box, Typography, Skeleton } from "@mui/material";
import Image from "next/image";

// Types
import { Article } from "@/types/types";

// Utils
import { formatTimestamp } from "@/utils/utils";

interface Props {
  data: Article;
}

export default function ArticleCard({ data }: Props) {
  const { id, timeStamp, articleTitle, content, pictureUrl, author } = data;
  const formatedDate = formatTimestamp(timeStamp);
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <article>
      <Stack
        direction={{ sm: "column", md: "row" }}
        sx={{ width: "100%", maxWidth: 860, gap: 2 }}
      >
        <Link href={"/article-detail/" + id} className="unsetLink">
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
            {!isImgLoaded && <Skeleton variant="rectangular" height="100%" />}

            <Image
              src={pictureUrl}
              onLoad={() => setIsImgLoaded(true)}
              alt="Cover"
              priority
              width={400}
              height={400}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isImgLoaded ? 1 : 0,
                transition: "0.3s ease-in-out",
              }}
            />
          </Box>
        </Link>

        <Stack sx={{ gap: 2 }}>
          <Link href={"/article-detail/" + id} className="unsetLink">
            <Typography variant="h4">{articleTitle}</Typography>
          </Link>

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
