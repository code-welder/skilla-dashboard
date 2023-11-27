import clsx from "clsx";
import styles from "./MenuItem.module.css";

interface Props {
  isDefault?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const MenuItem = ({ isDefault = true, isActive, onClick, children }: Props) => {
  const classes = clsx(styles.core, !isDefault && styles.custom, isActive && styles.active);

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};
