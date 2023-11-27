"use client";
import { CSSProperties, ReactNode, useEffect, useState } from "react";
import styles from "./Popover.module.css";
import clsx from "clsx";

interface Props {
  open: boolean;
  top?: CSSProperties["top"];
  onClose?: () => void;
  anchorEl: HTMLElement | null;
  children?: ReactNode;
  className?: string;
}

export const Popover = ({ open, top, onClose, anchorEl, children, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = clsx(styles.core, isOpen && styles.open, className);

  useEffect(() => {
    !isOpen && onClose && onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (!anchorEl) return;
    const position = window.getComputedStyle(anchorEl).position;
    if (position === "static") {
      anchorEl.style.position = "relative";
    }
  }, [anchorEl]);

  return (
    <div className={classes} style={{ top }}>
      <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
