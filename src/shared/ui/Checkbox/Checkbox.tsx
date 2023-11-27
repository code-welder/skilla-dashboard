import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Checkbox.module.css";
import clsx from "clsx";

interface Props {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ checked = false, defaultChecked, onChange }: Props) => {
  const [isChecked, toggleChecked] = useState<boolean | undefined>(false);

  useEffect(() => {
    toggleChecked(checked);
  }, [checked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleChecked(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <div className={clsx(styles.core, isChecked && styles.ch)}>
      <input
        type="checkbox"
        className={styles.inp}
        checked={isChecked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />
    </div>
  );
};
