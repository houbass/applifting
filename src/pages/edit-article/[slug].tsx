import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, Stack, CircularProgress } from "@mui/material";
import { setAlert, setSucces } from "@/redux/slices/userSlice";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Constatnes
import { MAX_CREATE_ARTICLE_WIDTH } from "@/constants/globalConstants";

// Types
import { NewArticleFormData } from "@/types/types";

// Utils
import { handleArticleAction } from "@/utils/firebase";
import { fetchArticleById } from "@/utils/articleDetailUtils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import CreateArticleForm from "@/components/forms/CreateArticleForm";

export default function ArticleDetail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;

  // States
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect when log out
  useHomeRedirectOnLogOut();

  // Fetch related articles based on the current article's slug
  const { data } = useQuery({
    queryKey: ["editArticle", slug],
    queryFn: () => fetchArticleById(String(slug)),
  });

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
  } = useForm<NewArticleFormData>();

  // Utils
  async function onSubmit(formData: NewArticleFormData) {
    if (!data || !formData?.image) return;
    const thisId = data.id;
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      await handleArticleAction("update", formData, thisId);
      dispatch(setSucces("Article updated successfully"));
      router.push("/my-articles");
    } catch (err) {
      console.error("Upload error:", err);
      dispatch(setAlert("Something went wrong, Please try again"));
      console.error("Upload error:", err);
      setIsUpdating(false);
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
            aria-label="publish article"
            disabled={!isDirty}
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            startIcon={
              isUpdating && <CircularProgress size={20} color="inherit" />
            }
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
