import clsx from "clsx";
import MagnifyingGlass from "@/assets/svg/magnifying-glass.svg?react";
import React from "react";
import { Input } from "./input";

interface Props extends React.ComponentProps<"input"> {
  className?: string;
}

const SearchField = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div className={clsx("relative w-full", className)}>
      <span className="absolute top-[12px] left-[12px]">
        <MagnifyingGlass className="text-icond_dark_2 w-4 h-4" />
      </span>
      <Input className="pl-8" ref={ref} type="text" {...rest} />
    </div>
  );
});

export default SearchField;
