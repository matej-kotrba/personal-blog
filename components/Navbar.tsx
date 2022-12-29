import React from "react";
import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  return (
    <nav
      className="fixed z-10 isolate top-0 left-0 w-full px-12 py-6 text-2xl text-white bg-transparent border-b-2 border-white border-solid backdrop-blur-md
    before:content-[''] before:inset-0 before:bg-black before:left-0 before:top-0 before:absolute before:z-[-99] before:opacity-30"
    >
      <div className="container flex items-center gap-5 mx-auto">
        <p className="font-roboto">MyBlog</p>
        {/* Other links */}

        <Link
          href={"/"}
          className="relative ml-auto before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out"
        >
          Home
        </Link>
        <Link
          href={"/articles"}
          className="relative before:content-[''] before:absolute before:left-[50%] before:top-full
        before:translate-x-[-50%] before:h-1 before:w-4 before:bg-white before:rounded-md hover:before:w-[105%]
        before:duration-150 before:ease-in-out"
        >
          Articles
        </Link>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
