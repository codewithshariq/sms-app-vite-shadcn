import * as Popover from "@radix-ui/react-popover";
import { useNavigate } from "react-router-dom";

import ProfileSettingsIcon from "@/assets/svg/profile-settings.svg?react";
import LogoutIcon from "@/assets/svg/logout.svg?react";
import UserIcon from "@/assets/svg/user-circle.svg?react";
import CreditsIcon from "@/assets/svg/credits.svg?react";
import DropdownArrow from "@/assets/svg/dropdown-arrow.svg?react";

import { useAuthState } from "@/store/slices/authSlice";
import { RiGroupLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { TypographyMuted, TypographySmall } from "@/components/ui/typography";

interface Props {
  fullName: string;
}

function HeaderProfile({ fullName }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex items-center group" asChild>
        <Button
          variant={"secondary"}
          className="flex space-x-2 h-[32px] rounded-tr-none rounded-br-none"
        >
          <UserIcon />

          <TypographySmall className="bg-btn_secondary_hover">{fullName}</TypographySmall>

          <DropdownArrow className="group-hover:brightness-150 group-radix-state-open:rotate-180 " />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded-lg bg-background border border-gray-500/10 dark:bg-dark-400 text-dark 
          dark:text-light shadow-md will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade 
          data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade 
          data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={15}
          alignOffset={0}
          align="end"
        >
          <HeaderProfilePopoverContent />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function HeaderProfilePopoverContent() {
  const { logout, role } = useAuthState();
  const navigate = useNavigate();

  return (
    <div className="flex items-center md:items-start flex-col">
      <Button
        variant={"ghost"}
        onClick={() => navigate("/profile")}
        className="py-2 px-3 flex items-center gap-2 w-full md:justify-start"
      >
        <ProfileSettingsIcon />
        <TypographyMuted>Account settings</TypographyMuted>
      </Button>

      {role === "Primary User" && (
        <Button
          variant={"ghost"}
          onClick={() => navigate("/admin-users")}
          className="py-2 px-3 flex items-center gap-2 w-full md:justify-start"
        >
          <RiGroupLine />
          <TypographyMuted>Team management</TypographyMuted>
        </Button>
      )}
      <Button
        variant={"ghost"}
        onClick={() => navigate("/transactions")}
        className="py-2 px-3 flex items-center gap-2 w-full md:justify-start"
      >
        <CreditsIcon />
        <TypographyMuted>Transaction history</TypographyMuted>
      </Button>
      <Button
        variant={"ghost"}
        onClick={logout}
        className="py-2 px-3 flex items-center gap-2 w-full md:justify-start"
      >
        <LogoutIcon />
        <TypographyMuted>Logout</TypographyMuted>
      </Button>
    </div>
  );
}

export default HeaderProfile;
