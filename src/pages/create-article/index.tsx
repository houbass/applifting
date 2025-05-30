import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import { useState } from "react";
const CreateArticleForm = dynamic(
  () => import("@/components/forms/CreateArticleForm"),
  {
    ssr: false,
  }
);

export interface NewArticleFormData {
  articleTitle: string;
  content: string;
  image: File | undefined;
}

export default function ArticleDetail() {
  // TODO use tanstack query for fetching data
  // Fetch detail data

  // TODO redirect if not logged in
  // check
  const [text, setText] = useState("");

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewArticleFormData>({
    defaultValues: {
      articleTitle: "",
      content: "",
      image: undefined,
    },
  });

  // TUtils
  const onSubmit = (data: NewArticleFormData) => {
    console.log("Form submitted with data:", data);
    setText(data.content);
  };

  return (
    <>
      {/* TODO detail name from title */}
      <BasicHead title="Create Article" />

      <PageLayout
        title="Create new article"
        button={
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Publish Article
          </Button>
        }
      >
        <section>
          <CreateArticleForm
            register={register}
            formState={{ errors }}
            defaultImageUrl={""}
          />
        </section>

        <Box mt={4}>
          <Typography
            component="pre"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {text}
          </Typography>
        </Box>
      </PageLayout>
    </>
  );
}
