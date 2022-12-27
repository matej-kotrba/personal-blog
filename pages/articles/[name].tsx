/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react";
import {
  getAllArticles,
  getSpecificArticle,
  getRecentArticles,
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

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-tsx");

const StyledContent = styled("article")`
  & > pre {
    /* background-color: #efefef; */
    padding: 10px;
    border-radius: 15px;
  }
`;

type ArticleType = {
  article: ArticleResponse;
  recentArticles: ArticleResponse[];
};

function Article({ article, recentArticles }: ArticleType) {
  useEffect(() => {
    Prism.highlightAll();
  });

  const releaseDate = useDateFromString(article.createdAt);

  return (
    <>
      <section className="col-span-6 p-6 bg-white rounded-md lg:col-span-4 max-h-fit">
        <h2 className="text-3xl font-medium text-black">{article.title}</h2>
        <span className="text-gray-800">{releaseDate}</span>
        <div className="flex flex-wrap gap-2 my-3">
          {article.categories.map(
            (category: { name: string }, index: number) => {
              return (
                <Link
                  href={"/articles"}
                  key={category.name + index}
                  className="px-5 py-2 duration-100 bg-gray-300 rounded-full shadow-md hover:bg-gray-200 hover:scale-105"
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
          className={`language-${article.langType}`}
          dangerouslySetInnerHTML={{
            __html: article.content.html,
          }}
        ></StyledContent>
        <ArticleEndingParagraph />
        <RelatedArticles
          category={article.categories}
          limit={3}
          id={article.id}
        />
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

  return {
    props: {
      article: article[0],
      recentArticles: recentArticles,
    },
    revalidate: 60,
  };
}

export default Article;
