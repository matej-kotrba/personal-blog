import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";
import useDateFromString from "../hooks/useDateFromString";

const StyledContainer = styled("div")`
  &::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 300%;
    background-color: white;
    filter: blur(20px);
    opacity: 1;
    right: 100%;
    bottom: 100%;
    rotate: 45deg;
  }

  &:hover::after {
    translate: 1000% 100%;
    transition: 1s ease;
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

function ArticleMinified({
  title,
  image,
  categories,
  releaseDate,
}: {
  title: string;
  image: string;
  categories: { name: string }[];
  releaseDate: string;
}) {
  const categoriesString = categories.reduce((prev, item, index) => {
    return index != 0 ? prev + " | " + item.name : item.name;
  }, "");

  const dateResult = useDateFromString(releaseDate);

  return (
    <StyledContainer
      className="relative w-full overflow-hidden rounded-md before:content-[''] before:absolute before:inset-0
    isolate before:z-[0] before:bg-black before:opacity-40 before:pointer-events-none cursor-pointer"
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
      <p
        className="absolute top-[50%] translate-y-[-50%] text-center
      text-white text-3xl w-full font-bold"
      >
        {title}
      </p>
      <p className="font-light text-white absolute bottom-1 left-[50%] translate-x-[-50%] text-xl">
        {categoriesString}
      </p>
      <p className="absolute text-lg font-light text-white top-2 right-2">
        {dateResult}
      </p>
    </StyledContainer>
  );
}

export default ArticleMinified;
