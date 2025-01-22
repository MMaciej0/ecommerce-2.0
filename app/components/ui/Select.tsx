"use client";

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value?: string;
  onValueChange: (value: string) => void;
  width?: number;
}

import { createContext, FC, ReactNode, useRef, useState } from "react";
import { Button } from "./Button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { useResize } from "@/app/lib/hooks/useResize";
import { useClickOutside } from "@/app/lib/hooks/useClickOutside";
import { useGenericContext } from "@/app/lib/hooks/useGenericContext";

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

interface SelectProps {
  children: ReactNode;
  value?: string;
  onValueChange: (value: string) => void;
}

const Select = ({ children, value, onValueChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useResize(containerRef, setWidth);

  return (
    <SelectContext.Provider
      value={{ isOpen, setIsOpen, value, onValueChange, width }}
    >
      <div className="relative" ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  placeholder?: string;
}

const SelectTrigger: FC<SelectTriggerProps> = ({ placeholder }) => {
  const { isOpen, setIsOpen, value } = useGenericContext(SelectContext);

  return (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      variant="outline"
      className="hover:bg-primary hover:text-primary-foreground bg-muted text-muted-foreground"
    >
      {value || placeholder || "Select"}
      <ChevronDown className="w-4 h-4 flex-shrink-0" />
    </Button>
  );
};

interface SelectContentProps {
  children: ReactNode;
}

const SelectContent: FC<SelectContentProps> = ({ children }) => {
  const { isOpen, setIsOpen, width } = useGenericContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));
  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-11 z-50 bg-background border border-border shadow-md rounded-md overflow-hidden focus:outline-none flex flex-col",
        !isOpen && "hidden"
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
        "hover:bg-primary/60 hover:text-foreground bg-muted text-foreground py-2",
        val === value &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
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
