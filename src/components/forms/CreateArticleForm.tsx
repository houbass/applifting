import Image from "next/image";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

import { NewArticleFormData } from "@/pages/create-article";
import { useState } from "react";

interface Props {
  register: UseFormRegister<NewArticleFormData>;
  formState: { errors: FieldErrors<FieldValues> };
  defaultImageUrl: undefined | string;
}

export default function CreateArticleForm({
  register,
  formState: { errors },
  defaultImageUrl,
}: Props) {
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    defaultImageUrl
  );

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Create a URL for the selected image
    }
  };
  return (
    <Stack>
      <form>
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

        <Stack>
          <Button
            variant="contained"
            component="label"
            sx={{ marginBottom: 2 }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              style={{ display: "none" }} // Hide the default file input button
              onChange={handleFileChange} // Handle file selection
            />
          </Button>

          {imagePreview && (
            <Box /*sx={{ maxWidth: 200, width: "100%" }}*/>
              <Image
                src={imagePreview}
                alt="Preview"
                width={100}
                height={100}
                style={{
                  width: "112px",
                  height: "auto", // Ensure the image is contained and not cropped
                }}
              />
            </Box>
          )}
        </Stack>

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
      </form>
    </Stack>
  );
}
