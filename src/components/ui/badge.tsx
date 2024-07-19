import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `grid place-content-center rounded-full border px-2.5 pb-0.5 pt-[5px] text-xs
  font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
  {
    variants: {
      variant: {
        default:
          "leading-none border-transparent bg-btn_primary text-btn_primary-foreground hover:bg-btn_primary/80",
        secondary:
          "leading-none border-transparent bg-btn_secondary text-btn_secondary-foreground hover:bg-btn_secondary/80",

        destructive: "leading-none bg-container_light_2 text-foreground hover:bg-container_light_2",

        outline: "leading-none text-foreground",
        rounded: `leading-none border-transparent bg-btn_primary 
            text-btn_primary-foreground rounded-full font-bold px-0 py-0
            grid place-content-center
            `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
