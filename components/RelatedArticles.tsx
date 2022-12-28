import React, { useEffect, useState } from "react";
import { ArticleResponse } from "../types";
import { Carousel } from "./";

type RelatedArticlesProps = {
  category: { name: string }[];
  limit: number;
  id: string;
};

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
      `/api/getRelatedArticles?categories=[${categories}]&limit=${limit}&id=${id}`
    );
    const json = await data.json();
    setRelatedArticles(json);
  }

  return (
    <section>
      {relatedArticles.length > 0 ? (
        <Carousel articles={relatedArticles} />
      ) : (
        <p className="text-2xl text-center">
          Unfortunatly no other articles on this topic exists.
        </p>
      )}
    </section>
  );
}

export default RelatedArticles;
