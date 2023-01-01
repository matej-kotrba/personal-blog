import React, { useState } from "react";
import { useQuery } from "react-query";
import { ArticleResponse } from "../types";
import { ArticleMinified } from "./";
import { createArticleLink } from "./ArticleMinified";
import { BiTrash } from "react-icons/bi";
import { Popup } from "./";
import styled from "@emotion/styled";

const StyledLoader = styled("div")`
  width: 120px;
  aspect-ratio: 1/1;
  background-color: #1e293b;
  border-radius: 50%;
  margin-inline: auto;
  position: relative;
  overflow: hidden;
  background-color: #333333;

  &::after {
    content: "";
    width: 100px;
    aspect-ratio: 1/1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #1e293b;
  }

  &::before {
    content: "";
    width: 80px;
    height: 80px;
    position: absolute;
    left: 60px;
    top: 20px;
    background-color: royalblue;
    transform-origin: left center;
    clip-path: polygon(0 50%, 100% 100%, 100% 0);
    /* border-radius: 10px; */
    animation: rotateAnim 3s linear infinite;
  }

  @keyframes rotateAnim {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
`;

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
          <button
            name="Clear all filters"
            onClick={() => setSelectedCategories([])}
          >
            <BiTrash className="text-4xl text-slate-800 dark:text-white" />
          </button>
        </Popup>
        {categories.map((category, index) => {
          return (
            <button
              name={`Filter articles by ${category} category`}
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
        <StyledLoader />
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
