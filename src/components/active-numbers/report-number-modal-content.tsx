import React from "react";
import { Button } from "@/components/ui/button";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LinesAPI from "@/api/lines";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ILine } from "@/api/lines/types";
import { Icons } from "../ui/icons";

export const ReportNumberModalContent = ({
  line,
  setIsOpenReportPhoneNumberModal,
}: {
  line?: ILine;
  setIsOpenReportPhoneNumberModal: (value: boolean) => void;
}) => {
  const [radioValue, setRadioValue] = React.useState("comfortable");
  const [reportReason, setReportReason] = React.useState("");

  const queryClient = useQueryClient();

  const prolongPhoneMutation = useMutation({
    mutationFn: LinesAPI.report,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lines-active"] });
      queryClient.invalidateQueries({ queryKey: ["get-me"] });
    },
  });

  const handleReportNumber = async () => {
    if (!line) return;
    prolongPhoneMutation.mutate({ lineId: line.id, text: reportReason });
    setIsOpenReportPhoneNumberModal(false);
  };

  return (
    <div className="flex flex-col space-y-6 px-7 py-5">
      <RadioGroup
        defaultValue="comfortable"
        value={radioValue}
        onValueChange={(value) => setRadioValue(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">
            <TypographyMuted>I dont receive anything</TypographyMuted>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">
            <TypographyMuted>Number is invalid</TypographyMuted>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">
            <TypographyMuted>Use as default card</TypographyMuted>
          </Label>
        </div>
      </RadioGroup>

      <Textarea
        className="text-text_02 placeholder:text-text_03"
        placeholder="Enter your reason"
        value={reportReason}
        onChange={(e) => setReportReason(e.target.value)}
      />

      <div className="flex space-x-2">
        <Button
          className="w-full"
          variant="secondary"
          onClick={() => setIsOpenReportPhoneNumberModal(false)}
        >
          <div className="flex space-x-2 items-center">
            <Icons.XBrandIcon />
            <TypographySmall className="font-bold relative top-[1px]">Cancel</TypographySmall>
          </div>
        </Button>

        <Button className="w-full" onClick={handleReportNumber}>
          <div className="flex space-x-2 items-center">
            <Icons.Send />
            <TypographySmall className="font-bold relative top-[1px]">Send Report</TypographySmall>
          </div>
        </Button>
      </div>
    </div>
  );
};
