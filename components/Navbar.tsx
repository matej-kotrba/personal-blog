import React, { useState } from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { GiHamburgerMenu, GiJugglingSeal } from "react-icons/gi";

function Navbar() {
  const [isOpened, setIsOpened] = useState(false);

  function onLinkClick() {
    setIsOpened(false);
  }

  return (
    <nav
      className="isolate relative top-0 left-0 w-full px-12 py-6 text-2xl text-white bg-transparent border-b-2 border-white border-solid backdrop-blur-md
    before:content-[''] before:inset-0 before:bg-black before:left-0 before:top-0 before:absolute before:z-[-99] before:opacity-30 z-[100]"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-5 md:hidden">
          <p className="font-roboto">{process.env.NEXT_PUBLIC_WEBSITE_TITLE}</p>
          <button name="Collapsible hamburger">
            <GiHamburgerMenu
              className="md:hidden"
              onClick={() => setIsOpened((old) => !old)}
            />
          </button>
          {/* Other links */}

          <div
            className={`absolute flex flex-col gap-5 md:relative md:flex-row top-[100%] left-0 duration-150 origin-top
           md:top-0 bg-slate-900 md:bg-transparent w-full text-center items-center rounded-b-md p-3 md:p-0 ${
             isOpened ? "scale-y-100" : "scale-y-0"
           }`}
          >
            <Link
              aria-label={`Visit homepage`}
              href={"/"}
              onClick={onLinkClick}
              className="relative md:ml-auto before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out text-white"
            >
              Home
            </Link>
            <Link
              aria-label={`Visit articles page`}
              href={"/articles"}
              onClick={onLinkClick}
              className="relative before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out text-white"
            >
              Articles
            </Link>
            <Link
              aria-label={`Visit categories page`}
              href={"/categories"}
              onClick={onLinkClick}
              className="relative before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out text-white"
            >
              Categories
            </Link>
            <DarkModeToggle />
          </div>
        </div>

        <div className="items-center justify-between hidden gap-5 mx-auto md:flex">
          <p className="relative mt-10 font-roboto">
            {process.env.NEXT_PUBLIC_WEBSITE_TITLE}
            <GiJugglingSeal
              className="absolute text-[3rem] left-[50%] bottom-[100%] translate-x-[-50%] text-transparent"
              style={{
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: "10px",
                strokeLinecap: "butt",
                strokeLinejoin: "round",
                fontWeight: "bold",
              }}
            />
          </p>
          {/* Other links */}

          <div
            className={`flex flex-col gap-5 md:relative md:flex-row top-[100%] left-0 duration-150 origin-top
           md:top-0 bg-slate-900 md:bg-transparent w-full text-center items-center rounded-b-md p-3 md:p-0`}
          >
            <Link
              aria-label={`Visit homepage`}
              href={"/"}
              className="relative md:ml-auto before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out text-white"
            >
              Home
            </Link>
            <Link
              aria-label={`Visit articles page`}
              href={"/articles"}
              className="relative before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out text-white"
            >
              Articles
            </Link>
            <Link
              aria-label={`Visit categories page`}
              href={"/categories"}
              className="relative before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out text-white"
            >
              Categories
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
