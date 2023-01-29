import React from "react";
import styled from "@emotion/styled";

// Heading styles
const StyledHeading = styled("h1")`
  --header-anim-duration: 1s;

  width: fit-content;
  margin-inline: auto;
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  font-style: italic;
  text-shadow: 0 0 2px white;
  animation: appearAnim var(--header-anim-duration)
    cubic-bezier(0.32, 0.92, 0.62, 1.55) forwards;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 15px;
    opacity: 0;
    transform-origin: left;
    scale: 0 1;
    animation: beforeAnim 1s var(--header-anim-duration) ease forwards;
  }

  @keyframes appearAnim {
    from {
      translate: -300% 0;
    }
    to {
      translate: 0 0;
    }
  }
  @keyframes beforeAnim {
    from {
      scale: 0 1;
      opacity: 0;
    }
    to {
      scale: 1 1;
      opacity: 1;
    }
  }
`;

function TitleHeading() {
  return (
    <div className="col-span-6 text-center text-white">
      <StyledHeading>Find yours topic</StyledHeading>
      <p className="text-lg">with {process.env.NEXT_PUBLIC_WEBSITE_TITLE}</p>
    </div>
  );
}

export default TitleHeading;
