import React from "react";
import { ArticleResponse } from "../types";
import ArticleMinified from "./ArticleMinified";

type RecentArticlesSidebarType = {
  recentArticles: ArticleResponse[];
};

function RecentArticlesSidebar({ recentArticles }: RecentArticlesSidebarType) {
  return (
    <aside className="flex flex-col col-span-6 gap-4 p-6 bg-white rounded-lg lg:col-span-2">
      The recent articles
      {recentArticles.map(
        ({ title, image, categories, publishedAt, excerpt }, index) => {
          return (
            <ArticleMinified
              key={title + index}
              title={title}
              image={image.url}
              categories={categories}
              releaseDate={publishedAt}
              excerpt={excerpt}
            />
          );
        }
      )}
    </aside>
  );
}

export default RecentArticlesSidebar;
