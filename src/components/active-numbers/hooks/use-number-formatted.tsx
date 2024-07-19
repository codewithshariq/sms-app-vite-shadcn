import { useMemo } from "react";

export const useNumberFormatted = (number: string) => {
  const numberFormatted = useMemo(
    () => `(${number.slice(0, 3)}) ${number.slice(3, 6)} ${number.slice(6, -1)}`,
    [number]
  );

  return numberFormatted;
};
