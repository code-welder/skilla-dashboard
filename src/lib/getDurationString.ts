import { intervalToDuration } from "date-fns";

export const getDurationString = (durationInSeconds: number) => {
  const duration = intervalToDuration({ start: 0, end: durationInSeconds * 1000 });
  const durationMin =
    duration.minutes && duration.minutes < 10 ? `0${duration.minutes}` : duration.minutes;
  const durationSec =
    duration.seconds && duration.seconds < 10 ? `0${duration.seconds}` : duration.seconds;
  return `${durationMin}:${durationSec}`;
};
