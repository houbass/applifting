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
export default function ArticleDetail({ data }: Props) {
  const { timeStamp, content, pictureUrl, author, articleTitle } = data;
  const formatedDate = formatTimestamp(timeStamp);
  return (
    <article>
      <Stack>
        <Typography variant="h1">{articleTitle}</Typography>
        <Stack
          sx={{
            gap: 3,
            flex: 1,
            mt: 6,
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
      </Stack>
    </article>
  );
}
