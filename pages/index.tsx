import type { NextPage } from "next";
import RecentArticlesSidebar from "../components/RecentArticlesSidebar";
import { getAllPingedArticles, getRecentArticles } from "../services";
import { ArticleResponse } from "../types";
import ArticleMinified, {
  createArticleLink,
} from "../components/ArticleMinified";

const Home: NextPage<{
  recentArticles: ArticleResponse[];
  pinnedArticles: ArticleResponse[];
}> = ({ recentArticles, pinnedArticles }) => {
  return (
    <>
      <section className="col-span-6 p-6 text-gray-900 bg-white rounded-lg dark:text-white dark:bg-slate-800 lg:col-span-4">
        The pinned articles
        {pinnedArticles.map((item, index) => {
          return (
            <ArticleMinified
              key={item.title + index}
              title={item.title}
              image={item.image.url}
              categories={item.categories}
              releaseDate={item.publishedAt}
              excerpt={item.excerpt}
              url={createArticleLink(item.slug)}
            />
          );
        })}
      </section>
      <RecentArticlesSidebar recentArticles={recentArticles} />
    </>
  );
};

export async function getStaticProps() {
  const recentArticles: ArticleResponse[] = await getRecentArticles(3);
  const pinnedArticles: ArticleResponse[] = await getAllPingedArticles();

  return {
    props: {
      recentArticles: recentArticles,
      pinnedArticles: pinnedArticles,
    },
    revalidate: 60,
  };
}

export default Home;
