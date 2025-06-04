import { useState } from "react";
import Image from "next/image";
import {
  Box,
  TextField,
  Typography,
  Stack,
  Button,
  Divider,
  Skeleton,
} from "@mui/material";
import { MAX_CREATE_ARTICLE_WIDTH } from "@/constants/globalConstants";

// Types
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { NewArticleFormData } from "@/types/types";
import { UseFormSetValue } from "react-hook-form";

// Components
import ImgUploadBtn from "../input/ImgUploadBtn";

interface Props {
  register: UseFormRegister<NewArticleFormData>;
  formState: { errors: FieldErrors<FieldValues> };
  setValue: UseFormSetValue<NewArticleFormData>;
  initialImageUrl?: string;
}

const PREVIEW_SIZE = 112;

export default function CreateArticleForm({
  register,
  formState: { errors },
  setValue,
  initialImageUrl,
}: Props) {
  // States
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialImageUrl || null
  );
  const [imageLoaded, setImageLoaded] = useState(false);

  // Utils
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldDirty: true });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  function handleDeleteImage() {
    setValue("image", null, { shouldDirty: true });
    setImagePreview(null);
    setImageLoaded(false);
  }

  return (
    <form>
      <Stack sx={{ maxWidth: MAX_CREATE_ARTICLE_WIDTH, gap: 4 }}>
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
              <ImgUploadBtn
                onChange={handleFileChange}
                variant="contained"
                color="secondary"
              />
            </Box>
          </Stack>
        )}

        {imagePreview && (
          <Stack sx={{ gap: 1 }}>
            <Typography>Featured image</Typography>
            <Box sx={{ position: "relative" }}>
              {!imageLoaded && (
                <Skeleton
                  variant="rectangular"
                  width={PREVIEW_SIZE}
                  height={PREVIEW_SIZE}
                  sx={{ position: "absolute" }}
                />
              )}
              <Image
                src={imagePreview}
                onLoad={() => setImageLoaded(true)}
                alt="featured image"
                width={PREVIEW_SIZE}
                height={PREVIEW_SIZE}
                style={{
                  width: PREVIEW_SIZE,
                  height: "auto",
                }}
              />{" "}
            </Box>

            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
              <ImgUploadBtn onChange={handleFileChange} />
              <Divider
                orientation="vertical"
                sx={{ height: 16, background: "orange" }}
              />
              <Button
                aria-label="delete image"
                color="error"
                onClick={handleDeleteImage}
              >
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
