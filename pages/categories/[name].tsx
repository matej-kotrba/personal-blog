import React from "react";
import {
  getAllCategories,
  getRelatedArticles,
  getSpecificCategory,
  getRecentArticles,
} from "../../services";
import { ArticleResponse, CategoryResponse } from "../../types";
import { ArticleMinified, RecentArticlesSidebar } from "../../components";

type CategoryType = {
  relatedArticles: ArticleResponse[];
  categoryData: CategoryResponse;
  recentArticles: ArticleResponse[];
};

function Category({
  relatedArticles,
  categoryData,
  recentArticles,
}: CategoryType) {
  return (
    <>
      <section className="col-span-6 p-6 bg-white rounded-md lg:col-span-4 max-h-fit dark:bg-slate-800">
        <h3 className="text-[2rem] text-gray-900 dark:text-white">
          {categoryData.name}
        </h3>
        <div className="grid grid-cols-3 gap-2">
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
        </div>
      </section>
      <RecentArticlesSidebar recentArticles={recentArticles} />
    </>
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
  const categoryData = await getSpecificCategory(params.name);

  const relatedArticlesPromise = getRelatedArticles(
    [categoryData.name],
    100,
    ""
  );
  const recentArticlesPromise = getRecentArticles(3);

  const [relatedArticles, recentArticles] = await Promise.all([
    relatedArticlesPromise,
    recentArticlesPromise,
  ]);

  return {
    props: {
      relatedArticles,
      categoryData,
      recentArticles,
    },
    revalidate: 60,
  };
}
