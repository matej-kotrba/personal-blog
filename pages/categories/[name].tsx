import React from "react";
import { getAllCategories, getRelatedArticles } from "../../services";
import { ArticleResponse, CategoryResponse } from "../../types";
import { ArticleMinified } from "../../components";

type CategoryType = {
  relatedArticles: ArticleResponse[];
};

function Category({ relatedArticles }: CategoryType) {
  return (
    <section className="grid grid-cols-3 col-span-6 gap-2 p-6 bg-white rounded-md lg:col-span-4 max-h-fit dark:bg-slate-800">
      {relatedArticles.map((article, index) => {
        return (
          <ArticleMinified
            key={article.title + index}
            categories={article.categories}
            excerpt={article.excerpt}
            image={article.image.url}
            releaseDate={article.createdAt}
            title={article.title}
            url={"/categories/" + article.slug}
          />
        );
      })}
    </section>
  );
}

export default Category;

export async function getStaticPaths() {
  const allCategories: CategoryResponse[] = await getAllCategories();

  return {
    paths: allCategories.map((category) => {
      return { params: { name: category.slug } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const relatedArticles = await getRelatedArticles([params.name], 100, "");

  return {
    props: {
      relatedArticles: relatedArticles,
    },
  };
}
