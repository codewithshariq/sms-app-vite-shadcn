import { Table as ReactTable, flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { ScrollArea } from "./scroll-area";

interface Props<T = object> {
  table: ReactTable<T>;
}

function TanstackTable<T = object>(props: Props<T>) {
  const { table } = props;

  return (
    <ScrollArea className="h-[625px]">
      <table className="w-full border-separate border-spacing-0 box-border">
        <thead className="sticky z-10 top-0 m-0 bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="h-9 bg-light-50 dark:bg-dark-300" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} className="first:pl-2 pr-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIdx) => (
            <tr
              key={row.id}
              onClick={row.getToggleSelectedHandler()}
              className={clsx(
                "h-16 cursor-pointer hover:bg-primary-100",
                row.getIsSelected() && "bg-subtle dark:bg-container_same_bg text-subtle",
                table.options.enableRowSelection && !row.getCanSelect() && "opacity-70"
              )}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    className={clsx(
                      "first:pl-2 pr-4 typography-body-md border-b border-input border-subtle dark:border-subtle-100 box-border",
                      rowIdx == table.getRowModel().rows.length - 1 && "border-none"
                    )}
                    key={cell.id}
                    style={{
                      width:
                        cell.column.getSize() === Number.MAX_SAFE_INTEGER
                          ? "auto"
                          : cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}

export default TanstackTable;
