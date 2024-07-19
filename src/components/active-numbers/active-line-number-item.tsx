import React, { useMemo } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Badge } from "@/components/ui/badge";
import CopyButton from "@/components/ui/button-copy";
import { TypographyMuted, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ILine, ILineWithSms } from "@/api/lines/types";
import { useNumberFormatted } from "./hooks/use-number-formatted";
import { SMSItem } from "./sms-item";
import { ServicesNames } from "./services-names";
import { TimerComponent } from "./timer-component";
import { ActiveNumbersTableRowWrapper } from "./active-line-table-row-wrapper";
import { ActiveNumbersTableSmsRowWrapper } from "./active-line-table-row-sms-wrapper";
import { Icons } from "@/components/ui/icons";

type ActiveLieNumberItemProps = {
  iLinesWithSms: ILineWithSms;
  setIsOpenSelectServicesModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenProlongPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenReportPhoneNumberModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedILine: React.Dispatch<React.SetStateAction<ILine | undefined>>;
};

export function ActiveLineNumberItem({
  iLinesWithSms,
  setIsOpenSelectServicesModal,
  setIsOpenProlongPhoneNumberModal,
  setIsOpenReportPhoneNumberModal,
  setSelectedILine,
}: ActiveLieNumberItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const numberFormatted = useNumberFormatted(iLinesWithSms.number);

  const smsCount = useMemo(() => iLinesWithSms.smses.length, [iLinesWithSms.smses]);

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col space-y-2 border-b border-input min-w-max"
    >
      <ActiveNumbersTableRowWrapper className="py-2 h-16">
        <div className="flex items-center pl-8 pr-6 gap-[10px]">
          <TypographyP className="w-[138px]">{numberFormatted}</TypographyP>
          <div className="flex-1 flex justify-center">
            <CopyButton value={numberFormatted} className="dark:text-icond_dark_2" />
          </div>
        </div>

        <div className="flex items-center pl-6 pr-6">
          <TypographyMuted className="text-text_02">
            <ServicesNames iLine={iLinesWithSms} />
          </TypographyMuted>
        </div>

        <div className="flex space-x-2 items-center pl-6 pr-6">
          <TimerComponent endDate={iLinesWithSms.rentEndDate} />
        </div>

        <div className="flex space-x-2 justify-end pl-8 pr-8">
          {!!smsCount && (
            <div className="flex flex-col space-y-2 items-center">
              <TypographyMuted>{smsCount} messages</TypographyMuted>
              <div className="flex justify-end w-full">
                <Badge variant={"secondary"} className="w-fit justify-center">
                  {smsCount} new
                </Badge>
              </div>
            </div>
          )}

          <div className="flex flex-row space-x-2">
            <Collapsible.Trigger asChild>
              <Button
                data-state={isOpen ? "open" : "closed"}
                className="transition-all [&[data-state=open]>svg]:rotate-180 w-8 h-8 p-2"
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icons.DownArrow className="h-5 w-5 shrink-0 transition-transform duration-200" />
              </Button>
            </Collapsible.Trigger>

            <DropdownMenuLineItem
              onAddServiceClick={() => {
                setIsOpenSelectServicesModal(true);

                setSelectedILine(iLinesWithSms);
              }}
              onAddTimeClick={() => {
                setIsOpenProlongPhoneNumberModal(true);
                setSelectedILine(iLinesWithSms);
              }}
              onReportServiceClick={() => {
                setIsOpenReportPhoneNumberModal(true);
                setSelectedILine(iLinesWithSms);
              }}
            />
          </div>
        </div>
      </ActiveNumbersTableRowWrapper>

      <Collapsible.Content
        className="dark:bg-container_light w-full overflow-hidden transition-all 
          data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      >
        <div className="pb-4 pt-0 flex flex-col">
          <ActiveNumbersTableSmsRowWrapper className="border-b py-4">
            <TypographyMuted className="text-text_03 pl-6 pr-6">Service</TypographyMuted>
            <TypographyMuted className="text-text_03 pl-6 pr-6">Time Left</TypographyMuted>
            <TypographyMuted className="text-text_03 pl-6 pr-6">Message</TypographyMuted>
            <div className="flex justify-end pl-6 pr-6">
              <TypographyMuted className="text-text_03">Actions</TypographyMuted>
            </div>
          </ActiveNumbersTableSmsRowWrapper>

          {iLinesWithSms.smses?.map((item, index) => (
            <div
              className={clsx(index != iLinesWithSms.smses.length - 1 && "border-b")}
              key={item.id}
            >
              <ActiveNumbersTableSmsRowWrapper className="py-4">
                <SMSItem sms={item} />
              </ActiveNumbersTableSmsRowWrapper>
            </div>
          ))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function DropdownMenuLineItem({
  onAddServiceClick,
  onAddTimeClick,
  onReportServiceClick,
}: {
  onAddServiceClick?: () => void;
  onAddTimeClick?: () => void;
  onReportServiceClick?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="w-8 h-8 p-2">
          <Icons.EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-container_dark">
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex space-x-2" onClick={onAddServiceClick}>
            <Icons.PlusIcon className="text-icond_dark_2 w-[28px] h-[28px]" />
            <TypographyMuted>Add service</TypographyMuted>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex space-x-2" onClick={onAddTimeClick}>
            <Icons.AddTimeSvg className="text-icond_dark_2 w-[28px] h-[28px]" />
            <TypographyMuted>Add time</TypographyMuted>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex space-x-2" onClick={onReportServiceClick}>
            <Icons.Warning className="w-[28px] h-[28px]" />
            <TypographyMuted className="text-text_warning">Report service</TypographyMuted>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
