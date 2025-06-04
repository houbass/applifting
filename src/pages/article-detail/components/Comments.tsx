import { Stack, Avatar, Typography, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser, selectUserAvatarUrl } from "@/redux/slices/userSlice";

// Components
import CommentCard from "./CommentCard";

// Assets
import img1 from "@/assets/1.png";
import img2 from "@/assets/2.png";
import img3 from "@/assets/3.png";
import img4 from "@/assets/4.png";

const thisPostComments = [
  {
    name: "Lily Hawkins",
    avatar: img1.src,
    timeStamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
    content:
      "You see, wire telegraph is a kind of a very, very long cat. You pull his tail in New York and his head is meowing in Los Angeles. Do you understand this? And radio operates exactly the same way: you send signals here, they receive them there. The only difference is that there is no cat.",
    likes: 3,
  },
  {
    name: "Annette Bell",
    avatar: img2.src,
    timeStamp: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
    content:
      "A cat has absolute emotional honesty: human beings, for one reason or another, may hide their feelings, but a cat does not",
    likes: 16,
  },
  {
    name: "Priscilla Simmmons",
    avatar: img3.src,
    timeStamp: Date.now() - 1000 * 60 * 60 * 26, // 8 hours ago
    content:
      "In its flawless grace and superior self-sufficiency I have seen a symbol of the perfect beauty and bland impersonality of the universe itself, objectively considered, and in its air of silent mystery there resides for me all the wonder and fascination of the unknown",
    likes: 6,
  },
  {
    name: "Pat Miles",
    avatar: img4.src,
    timeStamp: Date.now() - 1000 * 60 * 60 * 24 * 17, //  hours ago
    content:
      "I regard cats as one of the great joys in the world. I see them as a gift of highest order",
    likes: 9,
  },
];

export default function Comments() {
  // States
  const user = useSelector(selectUser);
  const userAvatarUrl = useSelector(selectUserAvatarUrl);

  return (
    <Stack sx={{ gap: 4 }}>
      <Typography variant="h4">
        {"Comments (" + thisPostComments.length + ")"}
      </Typography>
      {user && userAvatarUrl && (
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <Avatar alt="avatar" src={userAvatarUrl} />
          <TextField
            aria-label="Join the discussion"
            fullWidth
            variant="outlined"
            placeholder="Join the discussion"
            multiline
            rows={1}
          />
        </Stack>
      )}

      {thisPostComments.map((comment, index) => {
        return <CommentCard key={comment.timeStamp + index} data={comment} />;
      })}
    </Stack>
  );
}
