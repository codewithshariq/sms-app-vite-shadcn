import React from "react";
import { Button } from "@/components/ui/button";
import { TypographyP, TypographySmall } from "@/components/ui/typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LinesAPI from "@/api/lines";
import useUserState from "@/store/slices/userSlice";
import { ILine } from "@/api/lines/types";
import { SummaryModalView } from "../layout/summary/summary";
import { Icons } from "../ui/icons";

export const AddTimeModalContent = ({
  line,
  setIsOpenProlongPhoneNumberModal,
}: {
  line?: ILine;
  setIsOpenProlongPhoneNumberModal: (value: boolean) => void;
}) => {
  const { ...user } = useUserState();

  const [initialProlongTime, setInitialProlongTime] = React.useState(5);

  const totalCost = initialProlongTime * 0.5;

  const queryClient = useQueryClient();

  const prolongPhoneMutation = useMutation({
    mutationFn: LinesAPI.prolong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lines-active"] });
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
    },
  });

  const handleSubmitProlongPhone = async () => {
    if (!line) return;
    prolongPhoneMutation.mutate({ lineId: line.id, minutes: initialProlongTime });
    setIsOpenProlongPhoneNumberModal(false);
  };

  return (
    <div className="flex flex-col space-y-4 px-7 py-5">
      <div className="flex space-x-2">
        <Button
          variant={"secondary"}
          onClick={() => {
            if (initialProlongTime > 5) {
              setInitialProlongTime(initialProlongTime - 5);
            }
          }}
        >
          <Icons.MinusBrandIcon />
        </Button>

        <div className="bg-container_dark rounded-lg flex justify-center flex-1 items-center">
          <TypographyP>{initialProlongTime} minutes</TypographyP>
        </div>

        <Button
          variant={"secondary"}
          onClick={() => {
            setInitialProlongTime(initialProlongTime + 5);
          }}
        >
          <Icons.PlusBrandIcon />
        </Button>
      </div>

      {/* summary */}
      <SummaryModalView balance={user.balance || 0} totalCost={totalCost} />

      <Button onClick={handleSubmitProlongPhone}>
        <div className="flex space-x-2 items-center">
          <Icons.AddTime />
          <TypographySmall className="font-bold leading-none relative">Add time</TypographySmall>
        </div>
      </Button>
    </div>
  );
};
