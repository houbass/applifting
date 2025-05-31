import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
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

  // Utils
  // TODO upload
  function onSubmit(data: NewArticleFormData) {
    console.log("Form submitted with data:", data);
  }

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
      </PageLayout>
    </>
  );
}
