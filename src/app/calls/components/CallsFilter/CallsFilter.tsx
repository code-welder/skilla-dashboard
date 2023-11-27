"use client";
import { ArrowIcon } from "@ui/ArrowIcon";
import { MenuItem } from "@ui/MenuItem";
import { Popover } from "@ui/Popover";
import clsx from "clsx";
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import styles from "./CallsFilter.module.css";

export type SelectItem<T> = {
  id: string;
  value: T;
  element: ReactNode;
  defaultActive?: boolean;
};
interface Props<T> {
  selectItems: SelectItem<T>[];
  onChange?: (value: T) => void;
}

export const CallsFilter = <T,>({ selectItems, onChange }: PropsWithChildren<Props<T>>) => {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const [isPopoverOpen, togglePopoverOpen] = useState(false);
  const [defaultItem, setDefaultItem] = useState<SelectItem<T> | null>(null);
  const [activeItem, setActiveItem] = useState<SelectItem<T> | null>(null);

  const openPopover = () => togglePopoverOpen(true);
  const closePopover = () => togglePopoverOpen(false);

  const handleMenuItemClick = (item: SelectItem<T>) => {
    return () => {
      closePopover();
      setActiveItem(item);
    };
  };

  useEffect(() => {
    if (selectItems) {
      const defaultActive: SelectItem<T> | null =
        selectItems.find((item) => item.defaultActive) || null;
      setDefaultItem(defaultActive);
      setActiveItem(defaultActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    activeItem && onChange && onChange(activeItem?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  return (
    <div className={styles.core} ref={coreRef}>
      <button
        className={clsx(
          styles.toggler,
          isPopoverOpen && styles.active,
          defaultItem?.value !== activeItem?.value && styles.notDefault
        )}
        onClick={openPopover}
      >
        <span className={styles.value}>
          {activeItem ? activeItem.element : defaultItem?.element}
        </span>
        <ArrowIcon className={styles.arrow} direction={isPopoverOpen ? "top" : "bottom"} />
      </button>
      <Popover
        open={isPopoverOpen}
        anchorEl={coreRef.current}
        className={styles.popover}
        top="calc(100% + 8px)"
        onClose={closePopover}
      >
        {selectItems.map((item) => {
          return (
            <MenuItem
              key={item.id}
              isActive={activeItem?.value === item.value}
              onClick={handleMenuItemClick(item)}
            >
              {item.element}
            </MenuItem>
          );
        })}
      </Popover>
    </div>
  );
};
