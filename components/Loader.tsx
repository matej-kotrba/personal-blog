import React from "react";
import styled from "@emotion/styled";

const StyledContainer = styled("div")`
  display: grid;
  place-items: center;

  & .circle {
    width: 200px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: white;
    font-family: Arial;
    font-size: 1.5rem;

    position: relative;
    overflow: hidden;
    isolation: isolate;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      aspect-ratio: 1/1;
      right: 80%;
      top: 0%;
      border-radius: inherit;
      background-color: blue;
      z-index: -1;
      transform-origin: 130% 50%;
      filter: blur(40px);

      animation: rotateAnim 2s linear infinite;
    }

    &::after {
      content: "";
      position: absolute;
      width: 90%;
      aspect-ratio: 1/1;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      background-color: black;
      border-radius: inherit;
      z-index: -1;
    }
  }

  @keyframes rotateAnim {
    from {
      rotate: 0;
    }
    to {
      rotate: 360deg;
    }
  }
`;

function Loader() {
  return (
    <StyledContainer className="container">
      <div className="circle">Loading ...</div>
    </StyledContainer>
  );
}

export default Loader;
