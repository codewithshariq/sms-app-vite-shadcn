import clsx from "clsx";
import { Badge } from "./badge";
import { TypographySmall } from "./typography";

export const BadgeCount = ({
  count,
  className,
  textClassName,
}: {
  count?: string | number;
  className?: string;
  textClassName?: string;
}) => {
  return (
    <Badge variant={"rounded"} className={clsx("grid place-content-center", className)}>
      <TypographySmall className={clsx("text-[12px] font-semibold leading-4", textClassName)}>
        {count}
      </TypographySmall>
    </Badge>
  );
};
