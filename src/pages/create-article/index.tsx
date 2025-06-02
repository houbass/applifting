import { Button } from "@mui/material";
import dynamic from "next/dynamic";

// Hooks
import useHomeRedirectOnLogOut from "@/hooks/redirects/useHomeRedirectOnLogOut";
import { useForm } from "react-hook-form";

// Firebase
import { storage, db } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

// Utils
import { toKebabCase } from "@/utils/utils";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import { use, useEffect } from "react";

const CreateArticleForm = dynamic(
  () => import("@/components/forms/CreateArticleForm"),
  {
    ssr: false,
  }
);

export interface NewArticleFormData {
  articleTitle: string;
  content: string;
  image: File | null;
}

export default function ArticleDetail() {
  // Redirect when log out
  const { redirectHome } = useHomeRedirectOnLogOut();

  // TODO use tanstack query for fetching data
  // Fetch detail data

  // Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewArticleFormData>({
    defaultValues: {
      articleTitle: "",
      content: "",
      image: null,
    },
  });

  // TODO add progress bar and setAlert
  // Utils
  // Upload data to storage and database
  async function onSubmit(data: NewArticleFormData) {
    const { articleTitle, content, image } = data;

    if (!image) return;

    const timeStamp = Date.now();
    const customId = toKebabCase(articleTitle) + "-" + timeStamp;
    const storageRef = ref(storage, `posts/${customId}.jpg`);

    try {
      // Upload the image
      await uploadBytes(storageRef, image);

      // Get download URL
      const imageUrl = await getDownloadURL(storageRef);

      // Save to Firestore
      await setDoc(doc(db, "posts", customId), {
        id: customId,
        timeStamp,
        articleTitle,
        content,
        pictureUrl: imageUrl,
        author: "Elisabeth Strain",
      });

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
          {/* TODO use skeletons */}
          <CreateArticleForm
            register={register}
            formState={{ errors }}
            defaultImageUrl={null}
            setValue={setValue}
          />
        </section>
      </PageLayout>
    </>
  );
}
