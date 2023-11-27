import styles from "./Grid.module.css";

interface Props {
  topLeftSlot?: React.ReactNode;
  topRightSlot?: React.ReactNode;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const Grid = ({ topLeftSlot, topRightSlot, leftSlot, rightSlot }: Props) => {
  return (
    <div className={styles.core}>
      <div className={styles.topLeft}>{topLeftSlot}</div>
      <div className={styles.topRight}>
        <div className={styles.container}>{topRightSlot}</div>
      </div>
      <div className={styles.left}>{leftSlot}</div>
      <div className={styles.right}>
        <div className={styles.container}>{rightSlot}</div>
      </div>
    </div>
  );
};
