import { cn } from "@/utils/functions";
import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

export default function ProductModal({
  open,
  localOpen = false,
  onClose,
  className,
  title,
  extra,
  children,
  closeIcon = true,
  outsideClick = true,
  zIndex,
}) {
  const [isOpen, setIsOpen] = useState(localOpen);

  useEffect(() => {
    const bodyStyle = window.document.body.style;
    if (isOpen || open) bodyStyle.overflowY = "hidden";
    else bodyStyle.overflowY = "auto";
  }, [open, isOpen]);

  const handleClose = useCallback(() => {
    const close = () => setIsOpen(false);
    if (onClose) onClose(close);
    else close();
  }, [onClose]);

  const handleClick = useCallback(() => {
    setIsOpen(!open);
  }, [open]);

  const childrenWithProps = useMemo(
    () =>
      Children.map(children, (child) =>
        cloneElement(child, { onClose: handleClose })
      ),
    [children, handleClose]
  );

  if (!(isOpen || open)) return null;

  return createPortal(
    <div
      className="h-screen w-screen fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: zIndex || 100,
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-70"
        onClick={outsideClick ? handleClose : null}
      />
      <div
        className={cn(
          "relative bg-modalBg min-w-[370px] w-full md:w-auto h-full md:h-auto md:max-h-[90%] md:rounded-md flex flex-col",
          className
        )}
      >
        <div className="bg-modalBg flex justify-between items-start sticky top-0 md:rounded-t-md p-2">
          <div className="text-lg font-semibold text-gray-600 select-none w-full">
            {title}
          </div>
          {(extra || closeIcon) && (
            <div className="flex gap-2">
              {extra}
              {closeIcon && (
                <button
                  className="p-2 rounded-md hover:bg-gray-200 hover:text-black"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
        <div className="flex-grow px-2 pb-2 overflow-y-auto">
          {childrenWithProps}
        </div>
      </div>
    </div>,
    document.body
  );
}
