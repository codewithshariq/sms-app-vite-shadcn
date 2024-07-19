import { TypographyMuted, TypographyP, TypographySmall } from "@/components/ui/typography";
import { ILineUsed } from "@/api/lines/types";
import { useNumberFormatted } from "@/components/active-numbers/hooks/use-number-formatted";
import CopyButton from "@/components/ui/button-copy";
import { ServicesNames } from "@/components/active-numbers/services-names";
import { formatDistanceToNow } from "date-fns";
import CreditsIcon from "@/assets/svg/credits.svg?react";
import { Badge } from "@/components/ui/badge";
import { ManameAndRentPhoneTableRowWrapper } from "./manage-and-rent-phone-table-row-wrapper";
import { TableOverflowWrapper } from "../templates/tables-overflow-wrapper";

export const ReportedNumbersTable = ({ linesData }: { linesData?: ILineUsed[] }) => {
  return (
    <TableOverflowWrapper>
      <ManameAndRentPhoneTableRowWrapper className="h-7">
        <TypographyMuted className="text-text_03 pl-8 pr-6">Phone Number</TypographyMuted>
        <TypographyMuted className="text-text_03 px-6">Service Name</TypographyMuted>
        <TypographyMuted className="text-text_03 px-6">Purchase time</TypographyMuted>
        <TypographyMuted className="text-text_03 px-6">Status</TypographyMuted>
        <div className="flex justify-center px-6">
          <TypographyMuted className="text-text_03">Credits</TypographyMuted>
        </div>
      </ManameAndRentPhoneTableRowWrapper>

      {linesData?.map((item) => (
        <ReportedNumberItem key={item.id} iLineUsed={item} />
      ))}
    </TableOverflowWrapper>
  );
};

type ReportedNumberItemProps = {
  iLineUsed: ILineUsed;
};

const ReportedNumberItem = ({ iLineUsed }: ReportedNumberItemProps) => {
  const numberFormatted = useNumberFormatted(iLineUsed.number);

  return (
    <div className="flex flex-col space-y-2 border-b border-input">
      <ManameAndRentPhoneTableRowWrapper className="h-16">
        {/* number column */}
        <div className="flex items-center pl-8 pr-6 gap-[10px]">
          <TypographyP className="w-[138px]">{numberFormatted}</TypographyP>
          <div className="flex-1 flex justify-center">
            <CopyButton value={numberFormatted} className="dark:text-icond_dark_2" />
          </div>
        </div>
        {/* service names */}
        <div className="flex items-center px-6">
          <TypographyMuted className="text-text_02">
            <ServicesNames iLine={iLineUsed} />
          </TypographyMuted>
        </div>
        {/* Purchase time */}
        <div className="flex space-x-2 items-center px-6">
          <TypographyMuted>{formatDistanceToNow(new Date(iLineUsed.createdAt))}</TypographyMuted>
        </div>
        {/* Status */}
        <div className="flex space-x-2 items-center px-6">
          <Badge variant={"outline"} className="bg-text_notice/10 text-text_notice">
            <TypographySmall>Reported</TypographySmall>
          </Badge>
        </div>
        {/* Credits */}
        <div className="flex space-x-2 items-center justify-center px-6">
          <CreditsIcon />
          <TypographyMuted>{iLineUsed.costSum}</TypographyMuted>
        </div>
      </ManameAndRentPhoneTableRowWrapper>
    </div>
  );
};
