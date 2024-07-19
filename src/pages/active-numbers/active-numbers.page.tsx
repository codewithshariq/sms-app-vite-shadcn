import React from "react";
import { TypographyH1, TypographyMuted } from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import { ActiveLineNumberItem } from "@/components/active-numbers/active-line-number-item";
import SMSApi from "@/api/sms";
import LinesAPI from "@/api/lines";
import { ISMS } from "@/api/sms/types";
import { ILineWithSms } from "@/api/lines/types";
import { useModalsSelectedAndOpenState } from "@/components/active-numbers/hooks/use-modals-selected-and-open-state";
import { ModalsForSelectedLine } from "@/components/active-numbers/modals-for-selected-line";
import { ActiveNumbersTableRowWrapper } from "@/components/active-numbers/active-line-table-row-wrapper";
import { TableOverflowWrapper } from "@/components/templates/tables-overflow-wrapper";

export const ActiveNumbersPage = () => {
  const { data: linesReponse } = useQuery({
    queryKey: ["lines-active"],
    queryFn: async () => {
      const axiosResponse = await LinesAPI.getActive({ page: 1 });
      return axiosResponse.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const linesData = linesReponse?.data;

  const { data: smsResponse } = useQuery({
    queryKey: ["sms"],
    queryFn: async () => {
      const axiosResponse = await SMSApi.activeLinesSms();
      return axiosResponse.data;
    },
    refetchOnWindowFocus: true,
    retry: false,
  });

  const smsData = smsResponse?.data;

  const iLinesWithSms: ILineWithSms[] = React.useMemo(() => {
    if (!linesData || !smsData) return [];

    return linesData.map((line) => {
      const smses = smsData?.filter((sms) => sms.userPhoneId === line.id) as unknown as ISMS[];
      return {
        ...line,
        smses,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;
  }, [linesData, smsData]);

  const modalsState = useModalsSelectedAndOpenState();

  const {
    setIsOpenSelectServicesModal,
    setIsOpenProlongPhoneNumberModal,
    setIsOpenReportPhoneNumberModal,
    setSelectedILine,
  } = modalsState;

  return (
    <div className="flex flex-col space-y-4">
      <div className="px-12 py-8 border-b border-input">
        <TypographyH1>Active Numbers</TypographyH1>
        <TypographyMuted className="text-text_02">
          Easily rent phone numbers and oversee your active rentals in one place
        </TypographyMuted>
      </div>

      <TableOverflowWrapper>
        <ActiveNumbersTableRowWrapper>
          <TypographyMuted className="text-text_03 pl-8 pr-6">Phone Number</TypographyMuted>
          <TypographyMuted className="text-text_03 pl-6 pr-6">Service Name</TypographyMuted>
          <TypographyMuted className="text-text_03 pl-6 pr-6">Time Left</TypographyMuted>
          <div className="flex justify-end pl-8 pr-8">
            <TypographyMuted className="text-text_03">Actions</TypographyMuted>
          </div>
        </ActiveNumbersTableRowWrapper>

        {iLinesWithSms?.map((item) => (
          <ActiveLineNumberItem
            key={item.id}
            iLinesWithSms={item}
            setIsOpenSelectServicesModal={setIsOpenSelectServicesModal}
            setIsOpenProlongPhoneNumberModal={setIsOpenProlongPhoneNumberModal}
            setIsOpenReportPhoneNumberModal={setIsOpenReportPhoneNumberModal}
            setSelectedILine={setSelectedILine}
          />
        ))}
      </TableOverflowWrapper>

      <ModalsForSelectedLine {...modalsState} />
    </div>
  );
};
