import Link from "next/link";
import { Stack, Box, Typography } from "@mui/material";
import cover from "../../assets/cat1.png";
import Image from "next/image";

export default function ArticleCard() {
  return (
    <article>
      <Stack
        direction={{ sm: "column", md: "row" }}
        sx={{ width: "100%", maxWidth: 860, gap: 2 }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            minWidth: { xs: "100%", sm: "100%", md: 244 },
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: "2px",
          }}
        >
          <Image
            src={cover}
            alt="Cover"
            priority
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Stack sx={{ gap: 2 }}>
          <Typography variant="h4">
            Do Cats Drink Water? Cat Hydration & Dehydration Prevention
          </Typography>

          <Typography color="secondary">Ondrej Laube - 02/13/17</Typography>

          <Typography>
            Do cats drink water? Yes, like humans and many other animals, cats
            need water to survive. Many cats don’t drink as much as they should,
            though. Find out why they need water and how to get your own kitty
            to drink more.
          </Typography>

          <Stack sx={{ flexDirection: "row", gap: 1, pl: 1 }}>
            {/*TODO */}
            <Link href="/article-detail" className="unsetLink">
              <Typography color="primary">Read whole article</Typography>
            </Link>

            <Typography color="secondary">4 comments</Typography>
          </Stack>
        </Stack>
      </Stack>
    </article>
  );
}
