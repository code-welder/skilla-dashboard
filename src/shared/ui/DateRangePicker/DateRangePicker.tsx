"use client";
import CalendarIcon from "@icons/calendar.svg";
import ru from "date-fns/locale/ru";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatesRange } from ".";
import styles from "./DateRangePicker.module.css";

registerLocale("ru", ru);

const currentDate = new Date();
const dateFormat = "dd.MM.yyyy";

interface Props {
  onChange?: ({ start, end }: DatesRange) => void;
}

export const DateRangePicker = ({ onChange }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    onChange && onChange({ start: startDate, end: endDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className={styles.core}>
      <div className={styles.dates}>
        <ReactDatePicker
          dateFormat={dateFormat}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={currentDate}
          customInput={<CustomInput />}
          locale="ru"
        />
        -
        <ReactDatePicker
          dateFormat={dateFormat}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={currentDate}
          customInput={<CustomInput />}
          locale="ru"
        />
      </div>
      <div className={styles.icon}>
        <CalendarIcon />
      </div>
    </div>
  );
};

interface CustomInputProps {
  value?: string | null;
  onClick?: () => void;
}
const CustomInput = forwardRef(
  ({ value, onClick }: CustomInputProps, ref: ForwardedRef<HTMLButtonElement>) => (
    <button className={styles.customInput} onClick={onClick} ref={ref}>
      {value}
    </button>
  )
);
CustomInput.displayName = "CustomInput";
