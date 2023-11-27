import { Call } from "../../api";

export { CallsTable } from "./CallsTable";

export interface SingleDayCalls {
  title: "сегодня" | "вчера" | string;
  calls: Call[];
}
