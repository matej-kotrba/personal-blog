import React, { useEffect, useState } from "react";

type ToggleType = {
  initialToggle: boolean;
  fnc: (...args: any[]) => any;
};

function Toggle({ initialToggle, fnc }: ToggleType) {
  const [isToggled, setIsToggled] = useState<boolean>(initialToggle);

  useEffect(() => {
    setIsToggled(initialToggle);
  }, [initialToggle]);

  return (
    <button
      onClick={() => {
        setIsToggled((old) => !old);
        fnc();
      }}
      className={`relative w-20 bg-white rounded-full h-9 duration-150 before:duration-150 before:ease-linear 
      before:content-[''] before:w-7 before:aspect-square before:absolute before:left-1 before:top-1 before:bg-black 
      before:rounded-full
  ${isToggled ? "before:left-10 bg-gray-800 before:bg-white" : ""}
  `}
    ></button>
  );
}

export default Toggle;