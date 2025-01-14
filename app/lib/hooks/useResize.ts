import { RefObject, useEffect } from "react";

const useResize = (
  ref: RefObject<HTMLDivElement | null>,
  setWidth: (width: number) => void
) => {
  useEffect(() => {
    if (ref && ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        {
          for (const entry of entries) {
            setWidth(entry.contentRect.width);
          }
        }
      });

      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);
};

export { useResize };
