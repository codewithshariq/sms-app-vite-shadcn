import TanstackTable from "@/components/ui/tanstack-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ServicesAPI, { TService } from "@/api/services";
import { servicesColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import useUserState from "@/store/slices/userSlice";
import { SummaryModalView, SummarySidebarView } from "../layout/summary/summary";
import SearchField from "../ui/search-field";
import { Icons } from "../ui/icons";

export function SelectServicesTable({
  onSubmitSelectedServices,
  submitButtonText,
  summaryView,
}: {
  onSubmitSelectedServices: (services: TService[]) => void;
  submitButtonText: string;
  summaryView: "sidebar" | "modal";
}) {
  const [searchValue, setSearchValue] = useState("");

  const { ...user } = useUserState();

  const [rowSelection, setRowSelection] = useState({});

  const { data: linesResponse } = useQuery({
    queryKey: ["search-services", searchValue],
    queryFn: async () => {
      const response = await ServicesAPI.get(searchValue);
      return response.data;
    },
  });

  const defaultValue = useMemo(() => {
    return [];
  }, []);

  const table = useReactTable<TService>({
    data: linesResponse ?? defaultValue,
    columns: servicesColumns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.name,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalCost = table
    .getSelectedRowModel()
    .flatRows.reduce((acc, c) => (acc += c.original.price), 0);

  const selectedServicesLength = table.getSelectedRowModel().flatRows.length;

  const selectedServices = table.getSelectedRowModel().flatRows.map((r) => r.original);

  const insufficientCredits = user?.balance && user.balance < totalCost;

  const isButtonDisabled = !selectedServicesLength || !!insufficientCredits;

  return (
    <div className="flex flex-col space-y-2 flex-1 h-full">
      {/* search input with table */}
      <div className="flex flex-col space-y-2 flex-1 px-7">
        <TypographyMuted>Select services</TypographyMuted>
        <SearchField
          className="w-full"
          placeholder="Search service by name"
          onChange={(e) => setSearchValue(e.target.value)}
        ></SearchField>
        <TanstackTable table={table} />
      </div>

      {/* summary */}
      <div
        className={clsx(
          ` flex flex-col border-t border-input bg-container_same_bg py-5 px-7 space-y-4
            shadow-[0px_-5px_18.8px_0px_rgba(0,0,0,0.25)]
          `
        )}
      >
        {/* Summary */}
        {!!selectedServicesLength &&
          (summaryView === "sidebar" ? (
            <>
              <SummarySidebarView balance={user.balance || 0} totalCost={totalCost} />
            </>
          ) : (
            <>
              <SummaryModalView balance={user.balance || 0} totalCost={totalCost} />
            </>
          ))}

        {summaryView === "sidebar" ? (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                onSubmitSelectedServices(selectedServices);
                setRowSelection({});
              }}
              disabled={isButtonDisabled}
              className="flex items-center space-x-1 "
            >
              {isButtonDisabled ? <Icons.PlusDisabled /> : <Icons.PlusBrandIcon />}
              <TypographySmall
                className={clsx("font-bold", isButtonDisabled && "text-text_disabled")}
              >
                {submitButtonText}
              </TypographySmall>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="default"
              onClick={() => {
                onSubmitSelectedServices(selectedServices);
                setRowSelection({});
              }}
              disabled={isButtonDisabled}
              className="flex items-center space-x-1 "
            >
              {isButtonDisabled ? <Icons.PlusDisabled /> : <Icons.PlusDark />}
              <TypographySmall
                className={clsx("font-bold", isButtonDisabled && "text-text_disabled")}
              >
                {submitButtonText}
              </TypographySmall>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
