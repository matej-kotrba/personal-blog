import { ReactElement, createContext, useState, useEffect } from "react";

type MainContextType = {
  isDarkMode: boolean;
  setIsDarkModeFunction: Function;
};

export const MainContext = createContext<MainContextType>({
  isDarkMode: false,
  setIsDarkModeFunction: () => {},
});

function MainContextWrapper({ children }: { children: ReactElement }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  function setIsDarkModeFunction() {
    localStorage.setItem("mode", !isDarkMode ? "dark" : "");
    setIsDarkMode((old) => !old);
  }

  useEffect(() => {
    setIsDarkMode(Boolean(localStorage.getItem("mode")));
  }, []);

  return (
    <MainContext.Provider value={{ isDarkMode, setIsDarkModeFunction }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextWrapper;
