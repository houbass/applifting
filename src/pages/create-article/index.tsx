import { useEffect } from "react";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";
import { useForm } from "react-hook-form";

// Utils
import { handleArticleAction } from "@/utils/utils";

// Types
import { NewArticleFormData } from "@/types/types";

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
  // Redirect when log out
  const { redirectHome } = useHomeRedirectOnLogOut();

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewArticleFormData>();

  // TODO add progress bar and setAlert
  // Utils
  // Upload data to storage and database
  async function onSubmit(data: NewArticleFormData) {
    try {
      await handleArticleAction("create", data);
      alert("Upload complete!");

      redirectHome();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
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
            setValue={setValue}
          />
        </section>
      </PageLayout>
    </>
  );
}
