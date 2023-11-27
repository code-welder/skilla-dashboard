"use client";
import { useMemo, useState } from "react";
import { CallsFilters } from "../CallsFilters";
import { Call, CallsQueryParams, callsFetcher } from "../../api";
import useSwr from "swr";
import { CallsTable, SingleDayCalls } from "../CallsTable";
import { format, subDays } from "date-fns";

const currentDate = new Date();

export const CallsContainer = () => {
  const [filters, setFilters] = useState<CallsQueryParams | null>(null);
  const { data } = useSwr(filters ? [filters] : null, callsFetcher, {
    revalidateIfStale: false,
  });

  const sortedData: SingleDayCalls[] = useMemo(() => {
    let result: { [key: string]: Call[] } = {};

    data?.results.forEach((call) => {
      let dateKey: SingleDayCalls["title"];

      if (format(currentDate, "yyyy-MM-dd") === call.date_notime) {
        dateKey = "сегодня";
      } else if (format(subDays(currentDate, 1), "yyyy-MM-dd") === call.date_notime) {
        dateKey = "вчера";
      } else {
        dateKey = format(new Date(call.date_notime), 'dd.MM.yyyy');
      }

      if (!result[dateKey]) result[dateKey] = [];
      result[dateKey].push(call);
    });

    return Object.entries(result).map((calls) => ({
      title: calls[0],
      calls: calls[1],
    }));
  }, [data]);

  return (
    <>
      <CallsFilters onChange={(filters: CallsQueryParams) => setFilters(filters)} />
      <CallsTable data={sortedData} />
    </>
  );
};
