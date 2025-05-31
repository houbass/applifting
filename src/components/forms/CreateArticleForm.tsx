import { useState } from "react";
import Image from "next/image";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";

// Types
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { NewArticleFormData } from "@/pages/create-article";

// Components
import ImgUploadBtn from "../input/ImgUploadBtn";

interface Props {
  register: UseFormRegister<NewArticleFormData>;
  formState: { errors: FieldErrors<FieldValues> };
  defaultImageUrl: null | string;
}

export default function CreateArticleForm({
  register,
  formState: { errors },
  defaultImageUrl,
}: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    defaultImageUrl
  );

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <form>
      <Stack sx={{ pt: 6, pb: 2, gap: 4, maxWidth: 760 }}>
        <Stack sx={{ gap: 1 }}>
          <Typography id="articletitle-label">Article Title</Typography>
          <TextField
            aria-labelledby="articletitle-label"
            fullWidth
            {...register("articleTitle", { required: "Title is required" })}
            error={!!errors.articleTitle}
            helperText={
              errors.articleTitle ? String(errors.articleTitle.message) : ""
            }
          />
        </Stack>

        {!imagePreview && (
          <Stack>
            {!!errors.image && (
              <Typography variant="caption" color="error">
                {errors.image ? String(errors.image.message) : ""}
              </Typography>
            )}
            <Box>
              {/* Change uppercase on buttons by default */}
              <ImgUploadBtn
                onChange={handleFileChange}
                variant="contained"
                color="secondary"
                register={register}
              />
            </Box>
          </Stack>
        )}

        {imagePreview && (
          <Stack sx={{ gap: 1 }}>
            <Typography>Featured image</Typography>

            <Image
              src={imagePreview}
              alt="featured image"
              width={100}
              height={100}
              style={{
                width: "112px",
                height: "auto",
              }}
            />

            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
              <ImgUploadBtn onChange={handleFileChange} />
              <Divider
                orientation="vertical"
                sx={{ height: 16, background: "orange" }}
              />
              <Button color="error" onClick={() => setImagePreview(null)}>
                Delete
              </Button>
            </Stack>
          </Stack>
        )}

        <Stack sx={{ gap: 1 }}>
          <Typography id="content-label">Content</Typography>
          <TextField
            aria-labelledby="content-label"
            multiline
            rows={30}
            fullWidth
            {...register("content", { required: "Content is required" })}
            error={!!errors.content}
            helperText={errors.content ? String(errors.content.message) : ""}
          />
        </Stack>
      </Stack>
    </form>
  );
}
