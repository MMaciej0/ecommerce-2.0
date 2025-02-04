"use client";

import React, {
  createContext,
  FC,
  useState,
  ReactNode,
  ButtonHTMLAttributes,
  useRef,
  useEffect,
} from "react";
import { Button, buttonVariants } from "./Button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { useGenericContext } from "@/app/lib/hooks/useGenericContext";
import { X } from "lucide-react";
import { useClickOutside } from "@/app/lib/hooks/useClickOutside";

interface DialogContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

interface DialogProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: ReactNode;
}

export const Dialog = ({ open, setOpen, children }: DialogProps) => {
  const [innerOpen, setInnerOpen] = useState<boolean>(open ?? false);

  const isControlled = open !== undefined;
  const effectiveOpen = isControlled ? open : innerOpen;
  const effectiveSetOpen = isControlled ? setOpen! : setInnerOpen;

  return (
    <DialogContext.Provider
      value={{ open: effectiveOpen, setOpen: effectiveSetOpen }}
    >
      {children}
    </DialogContext.Provider>
  );
};

interface DialogTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof buttonVariants> {
  ref?: React.ForwardedRef<HTMLButtonElement>;
  className?: string;
}

export const DialogTrigger: FC<DialogTriggerProps> = ({
  className,
  size,
  variant,
  ...props
}) => {
  const { open, setOpen } = useGenericContext(DialogContext);
  return (
    <Button
      onClick={() => setOpen(!open)}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
};

interface DialogContentProps {
  children?: ReactNode;
  className?: string;
}

export const DialogContent: FC<DialogContentProps> = ({
  className,
  children,
}) => {
  const { open, setOpen } = useGenericContext(DialogContext);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [open]);

  useClickOutside(dialogContentRef, () => setOpen(false));

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-secondary/70">
          <div
            ref={dialogContentRef}
            className={cn(
              "z-50 absolute top-0 left-0 w-full h-full md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 md:w-auto md:h-auto md:min-w-[300px] md:max-w-[600px] p-2 border border-border bg-background shadow-lg rounded-md",
              className
            )}
          >
            <div className="relative w-full">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4 flex-shrink-0" />
              </Button>
            </div>
            <div className="h-full w-full">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

interface DialogHeaderProps {
  children?: ReactNode;
  center?: boolean;
}

const DialogHeader: FC<DialogHeaderProps> = ({ center, children }) => {
  return (
    <h3
      className={cn(
        "p-3 text-lg border-b font-medium",
        center && "text-center"
      )}
    >
      {children}
    </h3>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
