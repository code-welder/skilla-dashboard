import { CallsQueryParams } from "../../api";
import { SelectItem } from "../CallsFilter/CallsFilter";

export const typesFilterItems: SelectItem<CallsQueryParams["inOut"]>[] = [
  {
    id: "1",
    value: "",
    element: "Все типы",
    defaultActive: true,
  },
  {
    id: "2",
    value: "1",
    element: "Входящие",
    defaultActive: true,
  },
  {
    id: "3",
    value: "0",
    element: "Исходящие",
    defaultActive: true,
  },
];
