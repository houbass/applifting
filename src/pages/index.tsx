import React, { useEffect } from "react";

// Hooks
import useGetTimelineData from "@/hooks/firebase/useGetTimelineData";

// Firebase
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";

// Types
import { Article } from "@/types/types";

// Components
import BasicHead from "@/components/containers/BasicHead";
import PageLayout from "@/components/containers/PageLayout";
import Timeline from "@/components/content/Timeline";

const fetchArticles = async (): Promise<Article[]> => {
  const snapshot = await getDocs(collection(db, "posts"));

  const data: Article[] = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id,
      timeStamp: docData.timeStamp,
      articleTitle: docData.articleTitle,
      content: docData.content,
      pictureUrl: docData.pictureUrl,
      author: docData.author,
    };
  });

  const sortedData = data.sort((a, b) => b.timeStamp - a.timeStamp);
  return sortedData;
};

interface Props {
  fallbackArticles: Article[];
}

export default function Home({ fallbackArticles }: Props) {
  // Fetch articles
  /*
  const { data: articles } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    initialData: fallbackArticles,
    staleTime: 300000, // 5 minutes
  });

  console.log("articles", articles);
  */

  return (
    <>
      <BasicHead title="Home" />

      <PageLayout title="Recent articles">
        <section>
          <Timeline data={fallbackArticles} />
        </section>
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const articles = await fetchArticles();

  return {
    props: {
      fallbackArticles: articles,
    },
  };
}
