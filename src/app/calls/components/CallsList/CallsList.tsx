"use client";
import styles from "./CallsList.module.css";
import { Call } from "../../api";
import clsx from "clsx";
import { CallsListItem } from "../CallsListItem";

interface Props {
  title?: string;
  calls?: Call[];
}

export const CallsList = ({ title, calls = [] }: Props) => {
  return (
    <div className={clsx(styles.core, title && styles.withTitle)}>
      {title && (
        <div className={styles.top}>
          {title}
          <span className={styles.count}>{calls.length}</span>
        </div>
      )}
      <div>
        {calls.map((call) => (
          <CallsListItem key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
};
