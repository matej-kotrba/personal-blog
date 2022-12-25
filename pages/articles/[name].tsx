import React from "react";
import {
  getAllArticles,
  getSpecificArticle,
  getRecentArticles,
} from "../../services";
import { ArticleResponse } from "../../types";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import RecentArticlesSidebar from "../../components/RecentArticlesSidebar";

const StyledContent = styled("div")`
  & > pre {
    background-color: #efefef;
    padding: 10px;
    border-radius: 15px;
  }
`;

function Article({
  article,
  recentArticles,
}: {
  article: ArticleResponse;
  recentArticles: ArticleResponse[];
}) {
  return (
    <>
      <section className="col-span-4 p-6 bg-white rounded-md">
        <h2 className="text-3xl font-medium text-black">{article.title}</h2>
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
          dangerouslySetInnerHTML={{ __html: article.content.html }}
        ></StyledContent>
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
