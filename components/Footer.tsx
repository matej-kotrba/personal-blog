import React from "react";
import styled from "@emotion/styled";
import { AiFillGithub } from "react-icons/ai";
import { RiLinkedinFill } from "react-icons/ri";
import { VscGithub } from "react-icons/vsc";

const StyledFooter = styled("footer")`
  position: absolute;
  top: 100%;
  width: 100%;

  background-color: transparent;
  backdrop-filter: blur(12px);
  border-top: white 2px solid;
  padding: 45px;
`;

function Footer() {
  return (
    <StyledFooter>
      <div className="flex flex-wrap items-center gap-3">
        <button className="relative group">
          <RiLinkedinFill className="text-[3rem] duration-150 text-white group-hover:bg-blue-500 rounded-sm cursor-pointer" />
        </button>
        <button className="relative cursor-pointer group">
          <AiFillGithub className="text-[3rem] opacity-100 group-hover:opacity-0 duration-150 text-white" />
          <VscGithub
            className="absolute text-[3rem] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
          opacity-0 group-hover:opacity-100 duration-150"
          />
        </button>
      </div>
    </StyledFooter>
  );
}

export default Footer;
