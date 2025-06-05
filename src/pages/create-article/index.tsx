import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { setAlert, setSucces } from "@/redux/slices/userSlice";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Utils
import { handleArticleAction } from "@/utils/firebase";

// Types
import { NewArticleFormData } from "@/types/types";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import ArticleForm from "@/components/forms/ArticleForm";

export default function ArticleDetail() {
  const dispatch = useDispatch();

  // Redirect when log out
  const { redirectHome } = useHomeRedirectOnLogOut();

  // States
  const [isUploading, setIsUploading] = useState(false);

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewArticleFormData>();

  // Utils
  // Upload data to storage and database
  async function onSubmit(data: NewArticleFormData) {
    if (isUploading) return;
    setIsUploading(true);
    try {
      await handleArticleAction("create", data);
      dispatch(setSucces("article created Successfully"));
      setIsUploading(false);

      redirectHome();
    } catch (err) {
      dispatch(setAlert("Something went wrong, Please try again"));
      console.error("Upload error:", err);
      setIsUploading(false);
    }
  }

  // Register image field
  useEffect(() => {
    register("image", { required: "Image is required" });
  }, [register]);

  return (
    <>
      <BasicHead title="Create Article" />

      <PageLayout
        title="Create new article"
        button={
          <Button
            aria-label="publish article"
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            startIcon={
              isUploading && <CircularProgress size={20} color="inherit" />
            }
          >
            Publish Article
          </Button>
        }
      >
        <section>
          <ArticleForm
            register={register}
            formState={{ errors }}
            setValue={setValue}
          />
        </section>
      </PageLayout>
    </>
  );
}
