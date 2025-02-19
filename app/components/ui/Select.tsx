"use client";

import { createContext, FC, ReactNode, useRef, useState } from "react";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils/utils";
import { useResize } from "@/app/lib/hooks/useResize";
import { useClickOutside } from "@/app/lib/hooks/useClickOutside";
import { useGenericContext } from "@/app/lib/hooks/useGenericContext";

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value?: string;
  onValueChange: (value: string) => void;
  width?: number;
  position: "top" | "bottom";
  setPosition: (position: "top" | "bottom") => void;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

interface SelectProps {
  children: ReactNode;
  value?: string;
  onValueChange: (value: string) => void;
}

const Select = ({ children, value, onValueChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);

  useResize(containerRef, setWidth);

  useClickOutside(containerRef, () => setIsOpen(false));

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        value,
        onValueChange,
        width,
        position,
        setPosition,
      }}
    >
      <div className="relative w-full" ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  placeholder?: string;
  disabled?: boolean;
}

const SelectTrigger: FC<SelectTriggerProps> = ({ placeholder, disabled }) => {
  const { isOpen, setIsOpen, value, position, setPosition } =
    useGenericContext(SelectContext);

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    if (disabled) return;

    if (btnRef.current) {
      const windowHeight = window.innerHeight;
      const maxContentHeight = 320;

      const { bottom, top } = btnRef.current.getBoundingClientRect();

      if (bottom + maxContentHeight > windowHeight) {
        if (position === "bottom") {
          setPosition("top");
        }
      }

      if (top - maxContentHeight < 0) {
        if (position === "top") {
          setPosition("bottom");
        }
      }
    }

    setIsOpen(!isOpen);
  };

  return (
    <Button
      size="sm"
      ref={btnRef}
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleOpen}
      variant="outline"
      disabled={disabled}
      className={cn(
        "w-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        value && "text-foreground",
      )}
    >
      {value || placeholder || "Select"}
      <ChevronDown className="h-4 w-4 flex-shrink-0" />
    </Button>
  );
};

interface SelectContentProps {
  children: ReactNode;
}

const SelectContent: FC<SelectContentProps> = ({ children }) => {
  const { isOpen, width, position } = useGenericContext(SelectContext);

  return (
    <div
      className={cn(
        "absolute z-50 flex max-h-80 flex-col overflow-hidden overflow-y-auto rounded-md border border-border bg-background shadow-md focus:outline-none",
        position === "bottom" ? "top-11" : "bottom-11",
        !isOpen && "hidden",
      )}
      style={{ width: `${width}px` }}
    >
      {children}
    </div>
  );
};

interface SelectItemProps {
  val: string;
}

const SelectItem: FC<SelectItemProps> = ({ val }) => {
  const { onValueChange, setIsOpen, value } = useGenericContext(SelectContext);

  return (
    <button
      className={cn(
        "bg-muted py-2 text-foreground hover:bg-accent/30 hover:text-foreground",
        val === value &&
          "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
      )}
      onClick={() => {
        if (val === value) return;
        onValueChange(val);
        setIsOpen(false);
      }}
    >
      {val}
    </button>
  );
};

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Item = SelectItem;

export { Select, SelectTrigger };
