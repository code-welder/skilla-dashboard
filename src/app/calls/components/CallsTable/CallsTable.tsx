import { Checkbox } from "@ui/Checkbox";
import { CallsRow } from "../CallsRow";
import styles from "./CallsTable.module.css";
import clsx from "clsx";
import { SingleDayCalls } from ".";
import { CallsList } from "../CallsList";

interface Props {
  data: SingleDayCalls[];
}

export const CallsTable = ({ data }: Props) => {
  return (
    <div className={styles.core}>
      <CallsRow
        withHoverCss={false}
        checkboxSlot={<Checkbox />}
        typeSlot={<span className={styles.th}>Тип</span>}
        timeSlot={<span className={styles.th}>Время</span>}
        employeeSlot={<span className={styles.th}>Сотрудник</span>}
        callSlot={<span className={clsx(styles.th, styles.thCall)}>Звонок</span>}
        sourceSlot={<span className={styles.th}>Источник</span>}
        qualitySlot={<span className={styles.th}>Оценка</span>}
        audioSlot={<span className={styles.th}>Длительность</span>}
      />
      {data.map((callsList, i) => (
        <CallsList
          key={callsList.title}
          title={callsList.title !== "сегодня" ? callsList.title : undefined}
          calls={callsList.calls}
        />
      ))}
    </div>
  );
};
