import React from "react";
import { ArticleResponse } from "../types";
import ArticleMinified, { createArticleLink } from "./ArticleMinified";

type RecentArticlesSidebarType = {
  recentArticles: ArticleResponse[];
};

function RecentArticlesSidebar({ recentArticles }: RecentArticlesSidebarType) {
  return (
    <aside className="flex flex-col col-span-6 gap-4 p-6 bg-white rounded-lg dark:bg-slate-800 lg:col-span-2 dark:text-white">
      <p className="text-lg">Here are some recent articles</p>
      {recentArticles.map(
        ({ title, image, categories, publishedAt, excerpt, slug }, index) => {
          return (
            <ArticleMinified
              key={title + index}
              title={title}
              image={image.url}
              categories={categories}
              releaseDate={publishedAt}
              excerpt={excerpt}
              url={createArticleLink(slug)}
            />
          );
        }
      )}
    </aside>
  );
}

export default RecentArticlesSidebar;
