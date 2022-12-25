import React from "react";
import { ArticleResponse } from "../types";
import ArticleMinified from "./ArticleMinified";

function RecentArticlesSidebar({
  recentArticles,
}: {
  recentArticles: ArticleResponse[];
}) {
  return (
    <aside className="flex flex-col col-span-6 gap-4 p-6 bg-white rounded-lg lg:col-span-2">
      The recent articles
      {recentArticles.map((item, index) => {
        return (
          <ArticleMinified
            key={item.title + index}
            title={item.title}
            image={item.image.url}
            categories={item.categories}
            releaseDate={item.publishedAt}
            excerpt={item.excerpt}
          />
        );
      })}
    </aside>
  );
}

export default RecentArticlesSidebar;
