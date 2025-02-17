import { HTMLAttributes, type FC } from "react";
import { cn } from "../lib/utils/utils";

interface AnimatedHeightWrapperProps extends HTMLAttributes<HTMLDivElement> {
  isExpanded: boolean;
}

const AnimatedHeightWrapper: FC<AnimatedHeightWrapperProps> = ({
  isExpanded,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "grid h-full grid-rows-[0fr] transition-all duration-500 ease-in-out",
        isExpanded && "grid-rows-[1fr]",
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

export default AnimatedHeightWrapper;
