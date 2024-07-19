import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";

export type ModalBaseProps = {
  trigger?: ReactNode;

  header: boolean;

  title?: ReactNode;
  titleDescription?: ReactNode;

  children: ReactNode;
  childrenFooter?: ReactNode;
  className?: string;
} & DialogPrimitive.DialogProps;

export function Modal({
  trigger,

  header,
  title,
  titleDescription,

  children,

  childrenFooter,
  className,
  ...rest
}: ModalBaseProps) {
  return (
    <Dialog {...rest}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={clsx("sm:max-w-[425px]", className)}>
        {header && (
          <DialogHeader className="px-7 pt-5 space-x-y">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{titleDescription}</DialogDescription>
          </DialogHeader>
        )}

        {children}
        {childrenFooter && <DialogFooter>{childrenFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}
