"use client";
import CalendarIcon from "@icons/calendar.svg";

import styles from "./DateFilter.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowIcon } from "@ui/ArrowIcon";
import { DateRangePicker, DatesRange } from "@ui/DateRangePicker";
import { Popover } from "@ui/Popover";
import { MenuItem } from "@ui/MenuItem";
import { format, subDays } from "date-fns";

interface Props {
  onChange?: (datesRange: DatesRange) => void;
}

const currentDate = new Date();
const staticVariants: { [key: string]: { num: number; text: string } } = {
  "3days": {
    num: 3,
    text: "3 дня",
  },
  week: {
    num: 7,
    text: "Неделя",
  },
  month: {
    num: 31,
    text: "Месяц",
  },
  year: {
    num: 365,
    text: "Год",
  },
};
const keys = [...Object.keys(staticVariants), "custom"];

export const DateFilter = ({ onChange }: Props) => {
  const coreRef = useRef<HTMLDivElement | null>(null);
  const [isPopoverOpen, togglePopoverOpen] = useState(false);
  const [variantEndIndex, setVariantEndIndex] = useState(keys.length - 1);
  const [variantIndex, setVariantIndex] = useState(0);
  const variantKey = keys[variantIndex];
  const [visibleDate, setVisibleDate] = useState("");
  const [customDates, setCustomDates] = useState<DatesRange>({
    start: null,
    end: null,
  });
  const [selectedDates, setSelectedDates] = useState<DatesRange>({
    start: subDays(currentDate, staticVariants[variantKey]?.num),
    end: currentDate,
  });

  const triggerOnChange = () => onChange && onChange(selectedDates);
  const handleNextClick = () => {
    setVariantIndex(variantIndex >= variantEndIndex ? 0 : variantIndex + 1);
  };
  const handlePrevClick = () => {
    setVariantIndex(variantIndex <= 0 ? variantEndIndex : variantIndex - 1);
  };
  const openPopover = () => togglePopoverOpen(true);
  const closePopover = () => togglePopoverOpen(false);

  const handleMenuItemClick = (vIndex: number) => {
    return () => {
      closePopover();
      setVariantIndex(vIndex);
    };
  };
  const handleCustomDateClick = () => {
    if (Boolean(customDates.start && customDates.end)) {
      handleMenuItemClick(4)();
      printCustomDates();
      triggerOnChange();
    }
  };
  const handleDateRangeChange = (dateRanges: DatesRange) => {
    setCustomDates(dateRanges);
  };
  const printCustomDates = () => {
    if (customDates.start && customDates.end) {
      setVisibleDate(
        `${format(customDates.start, "dd.MM.yyyy")}-${format(customDates.end, "dd.MM.yyyy")}`
      );
    }
  };

  useEffect(() => {
    triggerOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDates]);

  useEffect(() => {
    if (variantKey === "custom") {
      printCustomDates();
      setSelectedDates(customDates);
    } else {
      setVisibleDate(staticVariants[variantKey].text);
      setSelectedDates({
        start: subDays(currentDate, staticVariants[variantKey].num),
        end: currentDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantIndex]);

  useEffect(() => {
    setVariantEndIndex(customDates.start && customDates.end ? keys.length - 1 : keys.length - 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customDates]);

  return (
    <div className={styles.core} ref={coreRef}>
      <div className={styles.top}>
        <button className={styles.arrow} onClick={handlePrevClick}>
          <ArrowIcon direction="left" />
        </button>
        <button className={styles.toggle} onClick={openPopover}>
          <span className={styles.calendarIcon}>
            <CalendarIcon />
          </span>
          <span className={styles.value}>{visibleDate}</span>
        </button>
        <button className={styles.arrow} onClick={handleNextClick}>
          <ArrowIcon />
        </button>
      </div>

      <Popover
        open={isPopoverOpen}
        onClose={closePopover}
        anchorEl={coreRef.current}
        top="calc(100% + 8px)"
      >
        <MenuItem onClick={handleMenuItemClick(0)} isActive={variantIndex === 0}>
          {staticVariants["3days"].text}
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(1)} isActive={variantIndex === 1}>
          {staticVariants["week"].text}
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(2)} isActive={variantIndex === 2}>
          {staticVariants["month"].text}
        </MenuItem>
        <MenuItem onClick={handleMenuItemClick(3)} isActive={variantIndex === 3}>
          {staticVariants["year"].text}
        </MenuItem>
        <MenuItem isDefault={false}>
          <button
            onClick={handleCustomDateClick}
            title={!(customDates.start && customDates.end) ? "Необходимо указать обе даты" : ""}
          >
            Указать даты
          </button>
          <DateRangePicker onChange={handleDateRangeChange} />
        </MenuItem>
      </Popover>
    </div>
  );
};
