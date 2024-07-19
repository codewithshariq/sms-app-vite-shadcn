import { TypographyH1, TypographyMuted, TypographyP } from "@/components/ui/typography";
import { useModalsSelectedAndOpenState } from "@/components/active-numbers/hooks/use-modals-selected-and-open-state";
import { ModalsForSelectedLine } from "@/components/active-numbers/modals-for-selected-line";
import clsx from "clsx";
import { useState } from "react";
import { BadgeCount } from "@/components/ui/badge-count";
import { useLinesInfiniteQuery } from "@/components/usage-history/hooks/use-lines-infinite-query";
import { useReportedLinesInfiniteQuery } from "@/components/usage-history/hooks/use-reported-lines-infinite-query";
import { UsedNumbersTable } from "@/components/usage-history/used-numbers-table";
import { ReportedNumbersTable } from "@/components/usage-history/reported-numbers-table";

export const UsageHistoryPage = () => {
  const { data: linesReponse } = useLinesInfiniteQuery();

  const linesData = linesReponse?.pages.flatMap((page) => page.data);

  const { data: reportedLinesResponse } = useReportedLinesInfiniteQuery();

  const reportedLines = reportedLinesResponse?.pages.flatMap((page) => page.data);

  const modalsState = useModalsSelectedAndOpenState();

  const { setIsOpenReportPhoneNumberModal, setSelectedILine } = modalsState;

  const [currentTableName, setCurrentTableName] = useState<"used" | "reported">("used");

  console.log("linesData", linesData);
  console.log("reportedLines", reportedLines);

  return (
    <div className="flex flex-col space-y-4">
      <div className="px-12 py-8 pb-4">
        <TypographyH1>Manage and Rent Phone Numbers</TypographyH1>
        <TypographyMuted className="text-text_02">
          Easily rent phone numbers and oversee your active rentals in one place
        </TypographyMuted>
      </div>

      <div className="flex space-x-2 w-full px-12 border-b border-input">
        {/* used numbers */}
        <div
          className={clsx(
            "flex items-center space-x-2 pb-3",
            currentTableName == "used" && "border-b-2 border-btn_primary"
          )}
        >
          <TypographyP
            className="cursor-pointer"
            onClick={() => {
              setCurrentTableName("used");
            }}
          >
            Used Numbers
          </TypographyP>
          <BadgeCount
            count={linesData?.length || 0}
            className="bg-container_light w-6 h-6"
            textClassName="text-text_01 text-sm"
          />
        </div>
        {/* reported numbers */}
        <div
          className={clsx(
            "flex items-center space-x-2 pb-3",
            currentTableName == "reported" && "border-b-2 border-btn_primary"
          )}
        >
          <TypographyP
            className="cursor-pointer"
            onClick={() => {
              setCurrentTableName("reported");
            }}
          >
            Reported Numbers
          </TypographyP>
          <BadgeCount
            count={reportedLines?.length || 0}
            className="bg-container_light w-6 h-6"
            textClassName="text-text_01 text-sm"
          />
        </div>
      </div>

      {/* used numbers table */}

      {currentTableName === "used" && (
        <UsedNumbersTable
          linesData={linesData}
          setIsOpenReportPhoneNumberModal={setIsOpenReportPhoneNumberModal}
          setSelectedILine={setSelectedILine}
        />
      )}

      {/* reported numbers table */}
      {currentTableName === "reported" && <ReportedNumbersTable linesData={reportedLines} />}

      <ModalsForSelectedLine {...modalsState} />
    </div>
  );
};
