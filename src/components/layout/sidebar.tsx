import { cn } from "@/lib/utils";
import { TypographyH2, TypographyMuted } from "../ui/typography";
import { Input } from "../ui/input";
import { SelectServicesTableSideBar } from "../sidebar-rent-number/select-services-table-sidebar";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  return (
    <nav className={cn(`relative hidden z-10 xl:block h-full`, className)}>
      <div
        className="relative space-y-4 flex flex-col h-full pt-6
        dark:shadow-[-4px_0px_32px_0px_rgba(22,22,22,1)] border-l border-r dark:border-none"
      >
        <div className="flex flex-col space-y-2 px-7">
          <TypographyH2>Rent a new number</TypographyH2>
          <TypographyMuted>Select service & zip code to rent a new number</TypographyMuted>
        </div>

        <div className="flex flex-col space-y-2 px-7">
          <TypographyMuted>Select zip code</TypographyMuted>
          <Input placeholder="Any"></Input>
        </div>

        <div className="flex-1 flex flex-col">
          <SelectServicesTableSideBar />
        </div>
      </div>
    </nav>
  );
}
