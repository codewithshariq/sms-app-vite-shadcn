import React from "react";

import { ISMS } from "@/api/sms/types";
import { formatDistance } from "date-fns";
import { TypographyMuted } from "../ui/typography";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import CopyButton from "../ui/button-copy";
import { Icons } from "../ui/icons";

export function SMSItem({ sms }: { sms: ISMS }) {
  const codeFromContent = sms.content.match(/\d+/)?.[0];

  return (
    <>
      <TypographyMuted className="px-6">{sms.service?.[0]?.name}</TypographyMuted>
      <TypographyMuted className="px-6">
        {formatDistance(new Date(), new Date(sms.receivedAt))}
      </TypographyMuted>
      <div className="text-sm text-text_02 px-6">
        {codeFromContent ? parseAndWrapNumber(sms.content) : sms.content}
      </div>
      <div className="flex justify-end px-6">
        <Button variant="secondary" className="w-8 h-8 p-2">
          <Icons.EllipsisVertical />
        </Button>
      </div>
    </>
  );
}

const NumberWrapper = ({ number }: { number: string }) => {
  const copyBuffunRef = React.useRef<HTMLButtonElement>(null);

  const handleBadgeClick = () => {
    copyBuffunRef.current?.click();
  };

  return (
    <Badge
      onClick={handleBadgeClick}
      variant={"secondary"}
      className="inline-flex space-x-1 hover:cursor-pointer"
    >
      <span>{number}</span>
      <CopyButton ref={copyBuffunRef} value={number} className="text-icon_brand" />
    </Badge>
  );
};

const parseAndWrapNumber = (text: string) => {
  const parts = text.split(/(\d+)/);
  return parts.map((part, index) => {
    if (/\d+/.test(part)) {
      return <NumberWrapper key={index} number={part} />;
    }
    return part;
  });
};
