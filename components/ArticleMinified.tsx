import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import useDateFromString from "../hooks/useDateFromString";
import Link from "next/link";

const StyledContainer = styled("div")`
  &::before {
    content: "";
    inset: 0;
    position: absolute;
    z-index: 0;
    background-color: black;
    opacity: 0.5;
    pointer-events: none;
  }

  & > .span-border {
    position: absolute;
    background-color: #1490d8;
    transform-origin: center;
    transition: 0.4s ease transform;

    --line-size: 5px;

    &:nth-of-type(odd) {
      width: 100%;
      height: var(--line-size);
      transform: scaleX(0);
    }

    &:nth-of-type(even) {
      width: var(--line-size);
      height: 100%;
      transform: scaleY(0);
    }

    &:nth-of-type(1) {
      top: calc(100% - var(--line-size) + 1px);
      left: 0;
    }
    &:nth-of-type(2) {
      top: 0;
      left: calc(100% - var(--line-size) + 1px);
    }
    &:nth-of-type(3) {
      bottom: calc(100% - var(--line-size) + 1px);
      left: 0;
    }
    &:nth-of-type(4) {
      right: calc(100% - var(--line-size) + 1px);
      top: 0;
    }
  }

  &:hover {
    & > .span-border {
      transform: none;
      /* transition: 0.2s ease transform;

      &:nth-of-type(1) {
        transform-origin: left;
        transition-delay: 0;
      }
      &:nth-of-type(2) {
        transform-origin: bottom;
        transition-delay: 0.25s;
      }
      &:nth-of-type(3) {
        transform-origin: right;
        transition-delay: 0.5s;
      }
      &:nth-of-type(4) {
        transform-origin: top;
        transition-delay: 0.75s;
      } */
    }
  }
`;

type ArticleMinifiedType = {
  title: string;
  image: string;
  categories: { name: string }[];
  releaseDate: string;
  excerpt: string;
  url: string;
  tailwindStyles?: string;
};

function ArticleMinified({
  title,
  image,
  categories,
  releaseDate,
  excerpt,
  tailwindStyles,
  url,
}: ArticleMinifiedType) {
  const categoriesString = categories.reduce((prev, item, index) => {
    return index != 0 ? prev + " | " + item.name : item.name;
  }, "");

  const dateResult = useDateFromString(releaseDate);

  return (
    <Link href={url} aria-label={`Read more about ${title}`}>
      <StyledContainer
        className={`relative w-full aspect-video overflow-hidden isolate rounded-md cursor-pointer ${
          tailwindStyles ? tailwindStyles : ""
        }`}
      >
        {/* Span for border animation */}
        <span className="span-border"></span>
        <span className="span-border"></span>
        <span className="span-border"></span>
        <span className="span-border"></span>
        <Image
          src={image}
          alt={title}
          width={450}
          height={300}
          className="object-cover w-full aspect-video"
        ></Image>
        <div className="absolute top-[50%] translate-y-[-50%] w-full text-center px-4 xl:px-12">
          <p className="overflow-hidden text-2xl font-bold text-white whitespace-nowrap overflow-ellipsis">
            <abbr title={title} className="no-underline">
              {title}
            </abbr>
          </p>
          <p className="overflow-hidden text-sm text-gray-300 whitespace-nowrap overflow-ellipsis">
            <abbr title={excerpt} className="no-underline">
              {excerpt}
            </abbr>
          </p>
        </div>
        <p className="font-light text-white absolute bottom-1 left-[50%] translate-x-[-50%] text-xl">
          {categoriesString}
        </p>
        <p className="absolute text-lg font-light text-white top-2 right-2">
          {dateResult}
        </p>
      </StyledContainer>
    </Link>
  );
}

export default ArticleMinified;

export function createArticleLink(slug: string) {
  return "/articles/" + slug;
}
