import React from "react";
import ArticleMinified from "../../components/ArticleMinified";
import { ArticleResponse } from "../../types";
import { getAllArticles } from "../../services";

function Articles({ allArticles }: { allArticles: ArticleResponse[] }) {
  return (
    <>
      {allArticles.map((article, index) => {
        return (
          <ArticleMinified
            key={article.title + index}
            categories={article.categories}
            excerpt={article.excerpt}
            image={article.image.url}
            releaseDate={article.createdAt}
            title={article.title}
            tailwindStyles="col-span-2"
          />
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const data = await getAllArticles();

  return {
    props: { allArticles: data },
  };
}

export default Articles;
