import clsx from "clsx";

export const ActiveNumbersTableSmsRowWrapper = ({
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
        grid 
        grid-cols-[111px_117px_568px_222px]
        w-full
      `,
        className
      )}
    >
      {children}
    </div>
  );
};
