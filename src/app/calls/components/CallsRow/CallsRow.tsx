import clsx from "clsx";
import styles from "./CallsRow.module.css";
import { PointerEventHandler, ReactNode } from "react";

interface Props {
  onPointerOver?: PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: PointerEventHandler<HTMLDivElement>;
  className?: string;
  bordersY?: "top" | "bottom" | "topBottom" | null;
  withHoverCss?: boolean;

  checkboxSlot?: ReactNode;
  typeSlot?: ReactNode;
  timeSlot?: ReactNode;
  employeeSlot?: ReactNode;
  callSlot?: ReactNode;
  sourceSlot?: ReactNode;
  qualitySlot?: ReactNode;
  audioSlot?: ReactNode;
}

export const CallsRow = ({
  onPointerOver,
  onPointerLeave,
  className,
  bordersY,
  withHoverCss = true,

  checkboxSlot,
  typeSlot,
  timeSlot,
  employeeSlot,
  callSlot,
  sourceSlot,
  qualitySlot,
  audioSlot,
}: Props) => {
  return (
    <div
      className={clsx(
        styles.core,
        styles[`border-y-${bordersY}`],
        withHoverCss && styles.withHoverCss,
        className
      )}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.left}>{checkboxSlot}</div>
      <div className={styles.right}>
        <div>{typeSlot}</div>
        <div>{timeSlot}</div>
        <div>{employeeSlot}</div>
        <div>{callSlot}</div>
        <div>{sourceSlot}</div>
        <div>{qualitySlot}</div>
        <div className={styles.audio}>{audioSlot}</div>
      </div>
    </div>
  );
};
