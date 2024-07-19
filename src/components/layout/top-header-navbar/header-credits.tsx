import CreditsIcon from "@/assets/svg/credits.svg?react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TypographySmall } from "@/components/ui/typography";
import { Icons } from "@/components/ui/icons";

interface Props {
  balance: number;
}

function HeaderCredits(props: Props) {
  const { balance } = props;

  return (
    <div className="flex justify-center items-center space-x-1 h-[28px]">
      <div className="bg-[#232323] flex space-x-1 p-2 text-btn_secondary-foreground dark:text-foreground">
        <CreditsIcon />
        <TypographySmall>{balance.toFixed(2)}</TypographySmall>
      </div>

      <Link to="/buy-credits">
        <Button size="sm" className="h-[30px] relative top-[1px] rounded-bl-none rounded-tl-none">
          <Icons.PlusDark className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}

export default HeaderCredits;
