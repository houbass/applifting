import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, Stack } from "@mui/material";
import { MAX_CREATE_ARTICLE_WIDTH } from "@/constants/globalConstants";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";
import { useForm } from "react-hook-form";

// Types
import { NewArticleFormData } from "@/types/types";

// Utils
import { handleArticleAction } from "@/utils/utils";
import { fetchArticleById } from "../article-detail/utils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";

const CreateArticleForm = dynamic(
  () => import("@/components/forms/CreateArticleForm"),
  {
    ssr: false,
  }
);

export default function ArticleDetail() {
  const router = useRouter();
  const { slug } = router.query;

  // Redirect when log out
  useHomeRedirectOnLogOut();

  // Fetch related articles based on the current article's slug
  const { data } = useQuery({
    queryKey: ["editArticle", slug],
    queryFn: () => fetchArticleById(String(slug)),
  });

  const initialData = {
    articleTitle: data?.articleTitle || "",
    content: data?.content || "",
    image: data?.pictureUrl || "",
  };

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
    setValue,
    reset,
  } = useForm<NewArticleFormData>();

  console.log(dirtyFields);

  // TODO add progress bar and setAlert
  // Utils
  async function onSubmit(formData: NewArticleFormData) {
    if (!data || !formData?.image) return;
    const thisId = data.id;

    try {
      await handleArticleAction("update", formData, thisId);
      router.push("/my-articles");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    }
  }

  // Register image field
  useEffect(() => {
    register("image", { required: "Image is required" });
  }, [register]);

  // Reset form when data arrives
  useEffect(() => {
    if (data) {
      reset({
        articleTitle: data.articleTitle,
        content: data.content,
        image: data.pictureUrl,
      });
    }
  }, [data, reset]);

  return (
    <>
      <BasicHead title="Edit Article" />

      <PageLayout
        title="Edit article"
        button={
          <Button
            disabled={!isDirty}
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            Publish Article
          </Button>
        }
      >
        <section>
          {!data && (
            <Stack sx={{ gap: 4, maxWidth: MAX_CREATE_ARTICLE_WIDTH }}>
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rectangular" width={150} height={150} />
              <Skeleton variant="rectangular" height={700} />
            </Stack>
          )}

          {data && (
            <CreateArticleForm
              register={register}
              formState={{ errors }}
              setValue={setValue}
              initialImageUrl={data.pictureUrl}
            />
          )}
        </section>
      </PageLayout>
    </>
  );
}
