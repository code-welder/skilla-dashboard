"use client";
import { useEffect, useState } from "react";
import styles from "./CallsFilters.module.css";
import { DateFilter } from "../DateFilter";
import { CallsFilter } from "../CallsFilter";
import { typesFilterItems } from "./config";
import { format } from "date-fns";
import { CallsQueryParams } from "../../api";

interface Props {
  onChange?: (filters: CallsQueryParams) => void;
}

export const CallsFilters = ({ onChange }: Props) => {
  const [filters, setFilters] = useState<CallsQueryParams>({
    dateStart: null,
    dateEnd: null,
    inOut: null,
  });

  useEffect(() => {
    if (Object.values(filters).every((filter) => filter !== null) && onChange) {
      onChange(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className={styles.core}>
      <div className={styles.top}>
        <DateFilter
          onChange={(dates) => {
            if (dates.start && dates.end) {
              setFilters({
                ...filters,
                dateStart: format(dates.start, "yyyy-MM-dd"),
                dateEnd: format(dates.end, "yyyy-MM-dd"),
              });
            }
          }}
        />
      </div>
      <div className={styles.bottom}>
        <CallsFilter
          selectItems={typesFilterItems}
          onChange={(value) => setFilters({ ...filters, inOut: value })}
        />
      </div>
    </div>
  );
};
