import { TService } from "@/api/services";
import CreditsIcon from "@/assets/svg/credits.svg?react";
import TanstackTableCheckbox from "@/components/ui/tanstack-table-checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { TypographyMuted } from "../ui/typography";
import clsx from "clsx";

const columnHelper = createColumnHelper<TService>();

export const servicesColumns = [
  columnHelper.accessor("name", {
    id: "selection",
    header: () => (
      <div className="flex">
        <TypographyMuted className="text-text_03">Service Name</TypographyMuted>
      </div>
    ),
    cell: ({ getValue, row }) => (
      <div className="flex items-center gap-2">
        <TanstackTableCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
        <TypographyMuted
          className={clsx("capitalize text-text_02", row.getIsSelected() && "text-foreground")}
        >
          {getValue()}
        </TypographyMuted>
      </div>
    ),
  }),
  columnHelper.accessor("price", {
    header: () => (
      <div className="flex justify-end">
        <TypographyMuted className="text-text_03">Cost</TypographyMuted>
      </div>
    ),
    cell: (props) => (
      <div className="flex items-center gap-2 justify-end">
        <CreditsIcon />
        <TypographyMuted
          className={clsx("text-text_02", props.row.getIsSelected() && "text-foreground")}
        >
          {props.getValue().toFixed(2)}
        </TypographyMuted>
      </div>
    ),
  }),
];
