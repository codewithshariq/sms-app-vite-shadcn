import { TypographyMuted, TypographyP } from "@/components/ui/typography";

import { ILine, ILineUsed } from "@/api/lines/types";
import { useNumberFormatted } from "@/components/active-numbers/hooks/use-number-formatted";
import CopyButton from "@/components/ui/button-copy";
import { ServicesNames } from "@/components/active-numbers/services-names";
import { formatDistanceToNow } from "date-fns";
import CreditsIcon from "@/assets/svg/credits.svg?react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ManameAndRentPhoneTableRowWrapper } from "./manage-and-rent-phone-table-row-wrapper";
import { TableOverflowWrapper } from "../templates/tables-overflow-wrapper";
import { Icons } from "../ui/icons";

type UsageHistoryTableProps = {
  linesData?: ILineUsed[];
  setIsOpenReportPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedILine: React.Dispatch<React.SetStateAction<ILine | undefined>>;
};

export const UsedNumbersTable = ({
  linesData,
  setIsOpenReportPhoneNumberModal,
  setSelectedILine,
}: UsageHistoryTableProps) => {
  return (
    <TableOverflowWrapper>
      <ManameAndRentPhoneTableRowWrapper className="h-7">
        <TypographyMuted className="text-text_03 pl-8 pr-6">Phone Number</TypographyMuted>
        <TypographyMuted className="text-text_03 px-6">Service Name</TypographyMuted>
        <TypographyMuted className="text-text_03 px-6">Purchase time</TypographyMuted>
        <TypographyMuted className="text-text_03 px-6">Credits</TypographyMuted>
        <div className="flex justify-end px-8">
          <TypographyMuted className="text-text_03">Actions</TypographyMuted>
        </div>
      </ManameAndRentPhoneTableRowWrapper>

      {linesData?.map((item) => (
        <UsageHistoryItem
          key={item.id}
          iLineUsed={item}
          setIsOpenReportPhoneNumberModal={setIsOpenReportPhoneNumberModal}
          setSelectedILine={setSelectedILine}
        />
      ))}
    </TableOverflowWrapper>
  );
};

type UsageHistoryItemProps = {
  iLineUsed: ILineUsed;
  setIsOpenReportPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedILine: React.Dispatch<React.SetStateAction<ILine | undefined>>;
};

const UsageHistoryItem = ({
  iLineUsed,
  setIsOpenReportPhoneNumberModal,
  setSelectedILine,
}: UsageHistoryItemProps) => {
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
        {/* Credits */}
        <div className="flex space-x-2 items-center px-6">
          <CreditsIcon />
          <TypographyMuted>{iLineUsed.costSum}</TypographyMuted>
        </div>
        {/* actions */}
        <div className="flex space-x-2 justify-end items-center px-8">
          <DropdownMenuLineItem
            onReportServiceClick={() => {
              setIsOpenReportPhoneNumberModal(true);
              setSelectedILine(iLineUsed);
            }}
          />
        </div>
      </ManameAndRentPhoneTableRowWrapper>
    </div>
  );
};

function DropdownMenuLineItem({ onReportServiceClick }: { onReportServiceClick?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="w-8 h-8 p-2">
          <Icons.EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-container_dark">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex space-x-2" onClick={onReportServiceClick}>
            <Icons.Warning fill="#B93A3A" className="w-[28px] h-[28px]" />
            <TypographyMuted className="text-text_warning">Report service</TypographyMuted>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
