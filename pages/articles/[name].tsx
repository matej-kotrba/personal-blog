/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react";
import {
  getAllArticles,
  getSpecificArticle,
  getRecentArticles,
  getRelatedArticles,
} from "../../services";
import { ArticleResponse } from "../../types";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import {
  RecentArticlesSidebar,
  ArticleEndingParagraph,
  RelatedArticles,
} from "../../components";
import useDateFromString from "../../hooks/useDateFromString";
import Head from "next/head";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-tsx");

const StyledContent = styled("article")`
  & > pre {
    padding: 10px;
    border-radius: 15px;
  }
`;

type ArticleType = {
  article: ArticleResponse;
  recentArticles: ArticleResponse[];
  relatedArticles: ArticleResponse[];
};

function Article({ article, recentArticles, relatedArticles }: ArticleType) {
  useEffect(() => {
    Prism.highlightAll();
  });

  const releaseDate = useDateFromString(article.createdAt);
  const title = `${process.env.NEXT_PUBLIC_WEBSITE_TITLE} - ${article.title}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <section className="col-span-6 p-6 bg-white rounded-md lg:col-span-4 max-h-fit dark:bg-slate-800">
        <h2 className="text-3xl font-medium text-black dark:text-white">
          {article.title}
        </h2>
        <span className="text-gray-800 dark:text-white">{releaseDate}</span>
        <div className="flex flex-wrap gap-2 my-3">
          {article.categories.map(
            (category: { name: string }, index: number) => {
              return (
                <Link
                  aria-label={`Read more about ${category.name}`}
                  href={"/categories/" + category.name.toLowerCase()}
                  key={category.name + index}
                  className="px-5 py-2 duration-100 bg-gray-300 rounded-full shadow-md dark:bg-gray-600 hover:bg-gray-200 hover:scale-105 dark:text-white dark:hover:bg-gray-500"
                >
                  {category.name}
                </Link>
              );
            }
          )}
        </div>
        <Image
          src={article.image.url}
          width={999}
          height={666}
          alt={article.title}
          className="my-5 rounded-lg"
        ></Image>
        <StyledContent
          className={`language-${article.langType} dark:text-white`}
          dangerouslySetInnerHTML={{
            __html: article.content.html,
          }}
        ></StyledContent>
        <ArticleEndingParagraph />
        <RelatedArticles articles={relatedArticles} />
      </section>
      <RecentArticlesSidebar recentArticles={recentArticles} />
    </>
  );
}

export async function getStaticPaths() {
  const allPosts: ArticleResponse[] = await getAllArticles();

  return {
    paths: allPosts.map((article) => {
      return { params: { name: article.slug } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const recentArticles: ArticleResponse[] = await getRecentArticles(3);
  const article: ArticleResponse[] = await getSpecificArticle(params.name);
  const relatedArticles: ArticleResponse[] = await getRelatedArticles(
    article[0].categories.map((category) => category.name),
    5,
    article[0].id
  );

  return {
    props: {
      article: article[0],
      recentArticles: recentArticles,
      relatedArticles: relatedArticles,
    },
    revalidate: 60,
  };
}

export default Article;
