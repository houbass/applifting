import { useMemo } from "react";
import { Stack, Avatar, Typography, ButtonGroup, Button } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { timeAgo } from "../utils";

interface Props {
  data: {
    name: string;
    avatar: string;
    timeStamp: number;
    content: string;
    likes: number;
  };
}
export default function CommentCard({ data }: Props) {
  const { name, avatar, timeStamp, content, likes } = data;

  const timeAgoString = useMemo(() => {
    return timeAgo(timeStamp);
  }, [timeStamp]);

  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
      <Avatar alt="avatar" src={avatar} />

      <Stack sx={{ gap: 1 }}>
        <Stack sx={{ flexDirection: "row", gap: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
          <Typography color="secondary">{timeAgoString}</Typography>
        </Stack>

        <Typography>{content}</Typography>

        <Stack sx={{ flexDirection: "row" }}>
          <ButtonGroup
            color="secondary"
            variant="text"
            aria-label="likes button group"
            sx={{ height: "24px" }}
          >
            <Stack
              sx={{
                justifyContent: "center",
                pr: 1,
              }}
            >
              <Typography>{"+" + likes}</Typography>
            </Stack>

            <Button aria-label="like" sx={{ borderLeft: "1px solid" }}>
              <KeyboardArrowUp />
            </Button>
            <Button aria-label="dislike">
              <KeyboardArrowDown />
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  );
}
