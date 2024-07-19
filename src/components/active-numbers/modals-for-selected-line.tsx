import React from "react";
import { TypographyMuted } from "@/components/ui/typography";
import { Modal } from "@/components/ui/modal";
import { SelectServicesTable } from "@/components/sidebar-rent-number/select-services-table";
import { AddTimeModalContent } from "@/components/active-numbers/add-time-modal-content";
import { ReportNumberModalContent } from "@/components/active-numbers/report-number-modal-content";

import { TService } from "@/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LinesAPI from "@/api/lines";
import { Badge } from "@/components/ui/badge";
import { useModalsSelectedAndOpenState } from "./hooks/use-modals-selected-and-open-state";

export const ModalsForSelectedLine = ({
  selectedILine,
  isOpenSelectServicesModal,
  setIsOpenSelectServicesModal,
  isOpenProlongPhoneNumberModal,
  setIsOpenProlongPhoneNumberModal,
  isOpenReportPhoneNumberModal,
  setIsOpenReportPhoneNumberModal,
}: ReturnType<typeof useModalsSelectedAndOpenState>) => {
  const numberFormatted = React.useMemo(
    () =>
      `(${selectedILine?.number.slice(0, 3)}) ${selectedILine?.number.slice(
        3,
        6
      )} ${selectedILine?.number.slice(6, -1)}`,
    [selectedILine]
  );

  const queryClient = useQueryClient();

  const addNewServiceToPhoneMutation = useMutation({
    mutationFn: LinesAPI.addServices,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lines-active"] });
    },
  });

  const onSubmitSelectedServices = async (services: TService[]) => {
    if (!selectedILine) return;

    setIsOpenSelectServicesModal(false);

    const servicesIds = services.map((item) => item.id);
    addNewServiceToPhoneMutation.mutate({ lineId: selectedILine?.id, servicesIds });
  };

  return (
    <>
      {/* add service to current phone modal  */}
      <Modal
        open={isOpenSelectServicesModal}
        onOpenChange={setIsOpenSelectServicesModal}
        header={true}
        title={"Add service"}
        titleDescription={
          <div className="flex items-center space-x-2">
            <TypographyMuted>Select services to add to</TypographyMuted>

            <Badge variant={"destructive"}>{numberFormatted}</Badge>
          </div>
        }
      >
        <div className="pt-6">
          <SelectServicesTable
            onSubmitSelectedServices={onSubmitSelectedServices}
            submitButtonText="Add service"
            summaryView="modal"
          />
        </div>
      </Modal>

      {/* prolong current phone number time  */}

      <Modal
        open={isOpenProlongPhoneNumberModal}
        onOpenChange={setIsOpenProlongPhoneNumberModal}
        header={true}
        title={"Add time"}
        titleDescription={
          <div className="inline-flex space-x-2 ">
            <TypographyMuted>Select the time you want to add to</TypographyMuted>

            <Badge variant={"destructive"}>{numberFormatted}</Badge>
          </div>
        }
      >
        <AddTimeModalContent
          line={selectedILine}
          setIsOpenProlongPhoneNumberModal={setIsOpenProlongPhoneNumberModal}
        />
      </Modal>

      {/* report current phone */}
      <Modal
        open={isOpenReportPhoneNumberModal}
        onOpenChange={setIsOpenReportPhoneNumberModal}
        header={true}
        title={"Report number"}
        titleDescription={
          <div className="inline-flex space-x-2">
            <TypographyMuted>Add report reason of</TypographyMuted>

            <Badge variant={"destructive"}>{numberFormatted}</Badge>
          </div>
        }
      >
        <ReportNumberModalContent
          line={selectedILine}
          setIsOpenReportPhoneNumberModal={setIsOpenReportPhoneNumberModal}
        />
      </Modal>
    </>
  );
};
