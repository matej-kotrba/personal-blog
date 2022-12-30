import React from "react";

type DropdownType = {
  options: { title: string; url?: string }[];
};

function Dropdown({ options }: DropdownType) {
  return (
    <div className="absolute top-[100%] left-0 w-full">
      {options.map((item, index) => {
        return <div key={item.title + index}>{item.title}</div>;
      })}
    </div>
  );
}

export default Dropdown;
