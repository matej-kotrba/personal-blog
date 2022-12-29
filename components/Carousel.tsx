import React, { useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { ArticleResponse } from "../types";
import ArticleMinified from "./ArticleMinified";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const StyledCarousel = styled("div")`
  & > .carousel {
    --tile-size: 350px;
    --gap: 8px;
    --scrolledAmount: 0px;

    position: relative;
    display: grid;
    overflow-x: hidden;
    grid-auto-flow: column;
    grid-auto-columns: var(--tile-size);
    scroll-snap-type: x mandatory;
    gap: 8px;

    & > * {
      position: relative;
      scroll-snap-align: center;
      transition: 0.5s ease;
      translate: var(--scrolledAmount) 0;
    }
  }

  & > .controls {
    padding: 5px;
    margin: 5px;
    display: flex;
    justify-content: space-between;

    & > button {
      width: 50px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color: #006e8a;
      color: white;
      z-index: 2;
      display: grid;
      place-items: center;
      font-size: 2rem;
      cursor: pointer;
      transition: 0.2s ease;

      &:hover {
        background-color: #004759;
      }

      & > * {
        transition: 0.1s ease;
      }

      &.left:hover > * {
        translate: -10% 0;
      }
      &.right:hover > * {
        translate: 10% 0;
      }
    }
  }
`;

type CarouselType = {
  articles: ArticleResponse[];
};

function Carousel({ articles }: CarouselType) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const moveCarousel = useCallback((value: number) => {
    const collection = carouselRef.current?.children;

    // If all values exists
    if (collection === undefined && carouselRef.current === undefined) return;

    const carouselCs = getComputedStyle(carouselRef.current as HTMLElement);

    const initialValue = carouselCs.getPropertyValue("--scrolledAmount");
    const convertedInitialValue = +initialValue.slice(
      0,
      initialValue.length - 2
    ) as any;
    const gap =
      (+carouselCs
        .getPropertyValue("--gap")
        .slice(0, carouselCs.getPropertyValue("--gap").length - 2) as any) *
      (value > 0 ? 1 : -1);

    // Checks if you are in range
    if (convertedInitialValue >= 0 && value > 0) return;

    const carouselWidth = carouselRef.current?.clientWidth as number;
    const tileWidth = carouselCs.getPropertyValue("--tile-size");
    const convertedTileWidth = tileWidth.slice(0, tileWidth.length - 2) as any;

    const carouselChildrenLenght = carouselRef.current?.children
      .length as number;

    if (
      -convertedInitialValue + carouselWidth >=
        convertedTileWidth * carouselChildrenLenght &&
      value < 0
    )
      return;

    carouselRef?.current?.style.setProperty(
      "--scrolledAmount",
      String(convertedInitialValue + value + gap) + "px"
    );
  }, []);

  return (
    <StyledCarousel>
      <div className="carousel" ref={carouselRef}>
        {articles.map((item, index) => {
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
      </div>
      <div className="controls">
        <button className="left" onClick={() => moveCarousel(350)}>
          <MdOutlineArrowBackIos />
        </button>
        <button className="right" onClick={() => moveCarousel(-350)}>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </StyledCarousel>
  );
}

export default Carousel;
