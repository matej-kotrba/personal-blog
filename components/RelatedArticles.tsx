import React, { useEffect, useState } from "react";
import { ArticleResponse } from "../types";
import { Carousel, Loader } from "./";
import { useQuery } from "react-query";

type RelatedArticlesProps = {
  articles: ArticleResponse[];
};

function RelatedArticles({ articles }: RelatedArticlesProps) {
  // async function fetchRecentArticles() {
  //   const categories: string[] = category.map((item) => {
  //     return item.name;
  //   });

  //   const data: any = await fetch(
  //     `/api/getRelatedArticles?categories=[${categories}]&limit=${limit}&id=${id}`
  //   );
  //   const json = await data.json();

  //   return json;
  // }

  // const { isLoading, data, isError } = useQuery(
  //   "relatedArticles" + category + id,
  //   fetchRecentArticles
  // );

  // if (isLoading) return <Loader />;
  // if (isError) return <p>Error appeared during getting data.</p>;

  return (
    <section>
      {articles.length > 0 ? (
        <Carousel articles={articles} />
      ) : (
        <p className="text-2xl text-center text-slate-800 dark:text-white">
          Unfortunatly no other articles on this topic exists.
        </p>
      )}
    </section>
  );
}

export default RelatedArticles;
