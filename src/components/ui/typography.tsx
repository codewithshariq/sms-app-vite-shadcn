import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export const TypographyH1 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn("scroll-m-20 text-[1.75rem] font-bold tracking-tight leading-9", className)}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
TypographyH1.displayName = "TypographyH1";

export const TypographyTitleAuth = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={cn(
          "scroll-m-20 tracking-normal dark:text-[#CCC7C4] text-[40px] font-black leading-[44px]",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
TypographyTitleAuth.displayName = "TypographyTitleAuth";

export const TypographyH2 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={cn(
          "scroll-m-20 text-xl font-bold tracking-tight first:mt-0 leading-8",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    );
  }
);
TypographyH2.displayName = "TypographyH2";

export const TypographyH3 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
TypographyH3.displayName = "TypographyH3";

export const TypographyH4 = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}
        {...props}
      >
        {children}
      </h4>
    );
  }
);
TypographyH4.displayName = "TypographyH4";

export const TypographyP = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("leading-4 text-[14px]", className)} {...props}>
        {children}
      </p>
    );
  }
);
TypographyP.displayName = "TypographyP";

export const TypographyLarge = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("text-lg font-semibold", className)} {...props}>
        {children}
      </div>
    );
  }
);
TypographyLarge.displayName = "TypographyLarge";

export const TypographyLogo = forwardRef<HTMLDivElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "font-montserrat text-xl font-extrabold leading-normal  dark:text-[#ffffffb3]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TypographyLogo.displayName = "TypographyLogo";

export const TypographySmall = forwardRef<HTMLElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <small
        ref={ref}
        className={cn("text-sm font-normal leading-none non-italic", className)}
        {...props}
      >
        {children}
      </small>
    );
  }
);
TypographySmall.displayName = "TypographySmall";

export const TypographyMuted = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p ref={ref} className={cn("text-sm text-text_02 font-medium", className)} {...props}>
        {children}
      </p>
    );
  }
);
TypographyMuted.displayName = "TypographyMuted";
