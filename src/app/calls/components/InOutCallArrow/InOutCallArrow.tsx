import clsx from "clsx";
import styles from "./InOutCallArrow.module.css";
import ArrowSvg from "./arrow.svg";

interface Props {
  status: "success" | "failed";
  inOut: "in" | "out";
}

export const InOutCallArrow = ({ status, inOut }: Props) => {
  return (
    <div className={clsx(styles.core, styles[status], styles[inOut])}>
      <ArrowSvg />
    </div>
  );
};
