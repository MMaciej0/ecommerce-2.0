"use client";

import React, {
  createContext,
  FC,
  useState,
  ReactNode,
  ButtonHTMLAttributes,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { Button, buttonVariants } from "./Button";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils/utils";
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

  const handleKayboardClose = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen],
  );

  useEffect(() => {
    if (open) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

    window.addEventListener("keydown", handleKayboardClose);

    return () => {
      document.body.classList.remove("disable-scroll");
      window.removeEventListener("keydown", handleKayboardClose);
    };
  }, [open, handleKayboardClose]);

  useClickOutside(dialogContentRef, () => setOpen(false));

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-foreground/70">
          <div
            ref={dialogContentRef}
            className={cn(
              "absolute left-0 top-0 z-50 h-full w-full rounded-md border border-border bg-background p-2 shadow-lg md:left-1/2 md:top-1/2 md:h-auto md:w-auto md:min-w-[300px] md:max-w-[600px] md:-translate-x-1/2 md:-translate-y-1/2",
              className,
            )}
          >
            <div className="relative w-full">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="absolute right-2 top-2"
              >
                <X className="h-4 w-4 flex-shrink-0" />
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
        "border-b p-3 text-lg font-medium",
        center && "text-center",
      )}
    >
      {children}
    </h3>
  );
};

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
