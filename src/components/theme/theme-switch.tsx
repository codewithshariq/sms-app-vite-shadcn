import clsx from "clsx";
import { useTheme } from "./theme-provider";
import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";

function ThemeSwitch() {
  const { setTheme, theme } = useTheme();

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const darkMode = useMemo(() => theme === "dark", [theme]);

  return (
    <div
      className="relative flex gap-2 rounded-md bg-zinc-300 dark:bg-black p-1"
      onClick={toggleDarkMode}
    >
      <button
        className={clsx(
          "p-1  flex items-center  z-10 rounded-lg h-7 w-7",
          !darkMode && "opacity-50"
        )}
      >
        <Moon
          fill="#DD8F57"
          color="#DD8F57"
          className=" h-[1.2rem] w-[1.2rem] transition-all relative left-[2px] "
        />
      </button>

      <button
        className={clsx(
          "p-1 flex items-center z-10 rounded-lg right-[2px] relative h-7 w-7",
          darkMode && "opacity-50"
        )}
      >
        <Sun fill="#DD8F57" color="#DD8F57" className="h-[1.2rem] w-[1.2rem] transition-all  " />
      </button>

      <div
        className={clsx(
          "absolute transition-all top-0.5 left-0.5 rounded bg-dark-50 w-1/2 h-[calc(100%-4px)] duration-200",
          darkMode ? "translate-x-0 bg-card" : "translate-x-[calc(100%-4px)] bg-card"
        )}
      />
    </div>
  );
}

export default ThemeSwitch;
