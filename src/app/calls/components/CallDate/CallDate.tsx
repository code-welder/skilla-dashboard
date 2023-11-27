import styles from "./CallDate.module.css";
import { format } from "date-fns";

interface Props {
  date: string;
}

export const CallDate = ({ date }: Props) => {
  return <div className={styles.core}>{format(new Date(date), "HH:mm")}</div>;
};
