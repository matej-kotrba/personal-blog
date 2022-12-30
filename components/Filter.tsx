import React, { useState } from "react";
import { useQuery } from "react-query";
import { ArticleResponse } from "../types";
import { ArticleMinified } from "./";
import { createArticleLink } from "./ArticleMinified";
import { BiTrash } from "react-icons/bi";
import { Popup } from "./";

type FilterType = {
  categories: string[];
};

function Filter({ categories }: FilterType) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const changeCategoryFilter = (category: string) => {
    setSelectedCategories((old) => {
      for (let i in old) {
        if (old[i] === category) {
          return [...old].filter((item) => item !== category);
        }
      }
      return [...old, category];
    });
  };

  async function fetchRecentArticles() {
    const data: any = await fetch(
      `/api/getRelatedArticles?categories=[${selectedCategories}]&limit=${10}&id=""`
    );
    const json = await data.json();
    return json;
  }

  const { data, isLoading, isError } = useQuery(
    ["allPostsByCategories", selectedCategories],
    fetchRecentArticles
  );

  return (
    <>
      <section className="flex items-center gap-2 mb-4">
        <Popup title="Clear all filters">
          <button onClick={() => setSelectedCategories([])}>
            <BiTrash className="text-4xl text-slate-800 dark:text-white" />
          </button>
        </Popup>
        {categories.map((category, index) => {
          return (
            <button
              onClick={() => changeCategoryFilter(category)}
              className={`px-5 py-2 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-full duration-150 ${
                selectedCategories.some((item) => item === category)
                  ? "bg-blue-400 text-white dark:bg-slate-500"
                  : ""
              }`}
              key={category + index}
            >
              {category}
            </button>
          );
        })}
      </section>
      {isLoading === true ? (
        <p>Loading ...</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((article: ArticleResponse, index: number) => {
            return (
              <ArticleMinified
                key={article.title + index}
                categories={article.categories}
                excerpt={article.excerpt}
                image={article.image.url}
                releaseDate={article.createdAt}
                title={article.title}
                url={createArticleLink(article.slug)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default Filter;
