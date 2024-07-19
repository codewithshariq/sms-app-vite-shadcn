import clsx from "clsx";

export const TableOverflowWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        `
      pl-4
      xl:max-w-[1036px] overflow-x-auto 
      flex flex-col w-full`,
        className
      )}
    >
      {children}
    </div>
  );
};
