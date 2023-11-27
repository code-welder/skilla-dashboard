import clsx from "clsx";
import styles from "./ArrowIcon.module.css";

interface Props {
  direction?: "top" | "right" | "bottom" | "left";
  size?: "sm";
  className?: string;
}

export const ArrowIcon = ({ size = "sm", direction = "right", className }: Props) => {
  const classes = clsx(styles.core, className, styles[size], styles[direction]);

  return <span className={classes}>{size === "sm" && <SmallArrow />}</span>;
};

const SmallArrow = () => {
  return (
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.589844 8.825L4.40651 5L0.589844 1.175L1.76484 0L6.76484 5L1.76484 10L0.589844 8.825Z"
        fill="currentColor"
      />
    </svg>
  );
};
