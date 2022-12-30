import React from "react";

type PopupType = {
  children: React.ReactElement;
  title: string;
};

function Popup({ children, title }: PopupType) {
  return (
    <div className="relative grid items-center group">
      <div
        className="absolute bottom-0 left-[50%] translate-x-[-50%] whitespace-nowrap rounded-full pointer-events-none
      py-2 px-4 bg-[#333333] opacity-0 group-hover:opacity-100 group-hover:bottom-[110%] duration-150 text-white"
      >
        {title}
      </div>
      {children}
    </div>
  );
}

export default Popup;
