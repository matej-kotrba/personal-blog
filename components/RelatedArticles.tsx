import React, { useEffect, useState } from "react";
import { ArticleResponse } from "../types";
import ArticleMinified from "./ArticleMinified";
import styled from "@emotion/styled";

type RelatedArticlesProps = {
  category: { name: string }[];
  limit: number;
  id: string;
};

const StyledRelatedArticles = styled("div")`
  --tile-size: 350px;

  display: grid;
  overflow-x: scroll;
  grid-auto-flow: column;
  grid-auto-columns: var(--tile-size);
  scroll-snap-type: x mandatory;
  gap: 8px;

  & > * {
    scroll-snap-align: center;
  }
`;

function RelatedArticles({ category, limit, id }: RelatedArticlesProps) {
  const [relatedArticles, setRelatedArticles] = useState<ArticleResponse[]>([]);

  useEffect(() => {
    fetchRecentArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchRecentArticles() {
    const categories: string[] = category.map((item) => {
      return item.name;
    });

    const data: any = await fetch(
      `/api/getRelatedArticles?categories=[${categories}]&limit=${limit}&id=${id}`
    );
    const json = await data.json();
    setRelatedArticles(json);
  }

  return (
    <section>
      <StyledRelatedArticles>
        {relatedArticles.map((item, index) => {
          return (
            <ArticleMinified
              title={item.title}
              categories={item.categories}
              excerpt={item.excerpt}
              image={item.image.url}
              releaseDate={item.createdAt}
              key={item.title + index}
            />
          );
        })}
        {relatedArticles.map((item, index) => {
          return (
            <ArticleMinified
              title={item.title}
              categories={item.categories}
              excerpt={item.excerpt}
              image={item.image.url}
              releaseDate={item.createdAt}
              key={item.title + index}
            />
          );
        })}
        {relatedArticles.map((item, index) => {
          return (
            <ArticleMinified
              title={item.title}
              categories={item.categories}
              excerpt={item.excerpt}
              image={item.image.url}
              releaseDate={item.createdAt}
              key={item.title + index}
            />
          );
        })}
      </StyledRelatedArticles>
    </section>
  );
}

export default RelatedArticles;
