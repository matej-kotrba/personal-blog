import React, { useEffect, useState } from "react";
import { getRelatedArticles } from "../services";
import { ArticleResponse } from "../types";

type RelatedArticlesProps = {
  category: { name: string }[];
  limit: number;
  id: string;
};

const dummyData = [
  { title: "asdasd" },
  { title: "asdasd" },
  { title: "asdasd" },
  { title: "asdasd" },
  { title: "asdasd" },
];

function RelatedArticles({ category, limit, id }: RelatedArticlesProps) {
  const [relatedArticles, setRelatedArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    fetchRecentArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRecentArticles() {
    const categories: string[] = category.map((item) => {
      return item.name;
    });

    const data: any = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/getRelatedArticles?categories=${categories}&limit=${limit}&id=${id}`
    );

    setRelatedArticles(data);
  }

  return (
    <section>
      {dummyData.map((item, index) => {
        return <div key={index}>{item.title}</div>;
      })}
    </section>
  );
}

export default RelatedArticles;
