import React from "react";
import {
  getAllCategories,
  getRelatedArticles,
  getSpecificCategory,
  getRecentArticles,
} from "../../services";
import { ArticleResponse, CategoryResponse } from "../../types";
import { ArticleMinified, RecentArticlesSidebar } from "../../components";
import Head from "next/head";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sealblog - {router.query.name}</title>
        <meta
          name="description"
          content={`${router.query.name} page about it and articles connected to it.`}
        ></meta>
      </Head>
      <section className="col-span-6 p-6 bg-white rounded-md lg:col-span-4 max-h-fit dark:bg-slate-800">
        <h2 className="text-[2rem] text-gray-900 dark:text-white">
          {categoryData.name}
        </h2>
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
