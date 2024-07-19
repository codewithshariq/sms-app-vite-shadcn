import { BadgeCount } from "@/components/ui/badge-count";
import { TypographySmall } from "@/components/ui/typography";
import clsx from "clsx";
import { Link, LinkProps } from "react-router-dom";

interface Props extends LinkProps {
  label: string;
  linkActive: boolean;

  featureActive?: boolean;
  featureActiveCount?: number;
}

function HeaderNavLink(props: Props) {
  const { label, linkActive, featureActive, featureActiveCount, ...rest } = props;

  const featureCountShorted =
    featureActiveCount && featureActiveCount > 99 ? "99+" : featureActiveCount;

  return (
    <Link className="h-full flex items-center justify-center space-x-1 relative" {...rest}>
      <li
        className={clsx(
          "h-full flex items-center gap-2 border-b-4 border-transparent font-semibold opacity-50",
          linkActive && "!border-light-50 !opacity-100"
        )}
      >
        <TypographySmall className="text-[13px] leading-4 font-medium">{label}</TypographySmall>
      </li>
      {featureActive && (
        <BadgeCount
          count={featureCountShorted}
          className="top-[-2px] h-4 min-w-4 relative"
          textClassName="p-[1px]"
        />
      )}
    </Link>
  );
}

export default HeaderNavLink;
