import React, { useEffect, useState, useContext } from "react";
import Toggle from "./Toggle";
import { MainContext } from "../contexts/MainContext";

function DarkModeToggle() {
  const { isDarkMode, setIsDarkModeFunction } = useContext(MainContext);

  useEffect(() => {
    isDarkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    return;
  }, [isDarkMode]);

  return (
    <Toggle
      fnc={setIsDarkModeFunction as () => any}
      initialToggle={isDarkMode}
    />
  );
}

export default DarkModeToggle;
