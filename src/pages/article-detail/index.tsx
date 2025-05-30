// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";

export default function ArticleDetail() {
  // TODO use tanstack query for fetching data
  // Fetch detail data

  return (
    <>
      {/* TODO detail name from title */}
      <BasicHead title="Detail" />

      <PageLayout title="Do Cats Drink Water? Cat Hydration & Dehydration Prevention">
        <section>
          <p>article detail</p>
        </section>
      </PageLayout>
    </>
  );
}
