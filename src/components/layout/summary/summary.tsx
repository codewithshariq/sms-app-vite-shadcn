import { TypographyMuted, TypographyP, TypographySmall } from "@/components/ui/typography";
import CreditsIcon from "@/assets/svg/credits.svg?react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Icons } from "@/components/ui/icons";

type Props = {
  balance: number;
  totalCost: number;
};

export const SummarySidebarView = ({ balance, totalCost }: Props) => {
  const insufficientCredits = balance < totalCost;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        {/* current credits */}
        <div className="flex justify-between">
          <TypographyMuted>Current credits:</TypographyMuted>

          <div className="flex space-x-1">
            <CreditsIcon />
            <TypographyMuted>{balance.toFixed(2)}</TypographyMuted>
          </div>
        </div>

        {/* remaining credits */}
        <div className="flex justify-between">
          <TypographyMuted>Remaining credits:</TypographyMuted>

          <div className="flex space-x-1">
            <CreditsIcon />
            <TypographyMuted className={clsx(insufficientCredits && "text-text_warning")}>
              {((balance ?? 0) - totalCost).toFixed(2)}
            </TypographyMuted>
          </div>
        </div>
      </div>

      {/* summary */}
      <div className="p-3 flex justify-between items-center bg-[#212121] rounded-lg">
        <TypographyP className="text-[#CCC7C4] leading-5 font-semibold">Summary:</TypographyP>

        <div className="flex space-x-1">
          <CreditsIcon />

          <TypographySmall>{totalCost.toFixed(2)}</TypographySmall>
        </div>
      </div>
      {/* insufficient credits view */}
      {insufficientCredits && <InsufficientCreditsView />}
    </div>
  );
};

export const SummaryModalView = ({ balance, totalCost }: Props) => {
  const insufficientCredits = balance < totalCost;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center space-x-4">
        {/* current & remaining credits */}
        <div className="flex flex-col space-y-2 flex-1">
          <div className="flex justify-between">
            <TypographyMuted>Current credits:</TypographyMuted>

            <div className="flex space-x-1 items-center">
              <CreditsIcon />
              <TypographyMuted>{balance.toFixed(2)}</TypographyMuted>
            </div>
          </div>

          <div className="flex justify-between">
            <TypographyMuted>Remaining credits:</TypographyMuted>

            <div className="flex space-x-1 items-center">
              <CreditsIcon />
              <TypographyMuted className={clsx(insufficientCredits && "text-text_warning")}>
                {((balance ?? 0) - totalCost).toFixed(2)}
              </TypographyMuted>
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="p-3 flex justify-between items-center bg-[#212121] rounded-lg space-x-2">
          <TypographyP className="text-[#CCC7C4] leading-5 font-semibold">Summary:</TypographyP>

          <div className="flex space-x-1 items-center">
            <CreditsIcon />

            <TypographySmall>{totalCost.toFixed(2)}</TypographySmall>
          </div>
        </div>
      </div>
      {insufficientCredits && <InsufficientCreditsView />}
    </div>
  );
};

export const InsufficientCreditsView = () => {
  return (
    <div className="p-2 flex justify-between items-center rounded-lg space-x-2 border-text_warning border">
      <div className="flex space-x-1 items-center">
        <Icons.Warning className="w-4 h-4 text-icond_warning" />
        <TypographySmall className="text-icond_warning text-nowrap font-semibold text-xs relative top-[1px]">
          Insufficient credits
        </TypographySmall>
      </div>

      <Link to="/buy-credits" className="flex space-x-2 justify-center items-center">
        <Icons.PlusWhite className="text-foreground h-4 w-4" />
        <TypographyP className="font-bold text-nowrap text-[0.875rem] leading-4">
          Buy credits
        </TypographyP>
      </Link>
    </div>
  );
};
