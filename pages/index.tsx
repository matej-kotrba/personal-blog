import type { NextPage } from "next";
import styled from "@emotion/styled";
import { getAllArticles, getRecentArticles } from "../services";
import { ArticleResponse } from "../types";
import ArticleMinified from "../components/ArticleMinified";

const Home: NextPage<{ articles: ArticleResponse[] }> = ({ articles }) => {
  return (
    <main className="container mx-auto mt-[100px] grid grid-cols-6 gap-2 p-6 rounded-lg">
      <section className="col-span-6 p-6 bg-white rounded-lg lg:col-span-4">
        The pinned articles
      </section>
      <section className="flex flex-col col-span-6 gap-4 p-6 bg-white rounded-lg lg:col-span-2">
        The recent articles
        {articles.map((item, index) => {
          return (
            <ArticleMinified
              key={item.title + index}
              title={item.title}
              image={item.image.url}
              categories={item.categories}
              releaseDate={item.publishedAt}
            />
          );
        })}
      </section>
    </main>
  );
};

export async function getStaticProps() {
  // const data: ArticleResponse[] = await getAllArticles();
  const data: ArticleResponse[] = await getRecentArticles(3);

  return {
    props: {
      articles: data,
    },
  };
}

export default Home;
