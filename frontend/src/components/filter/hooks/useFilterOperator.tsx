import type { TEXT_OPERATORS } from "../constants";
import { type FilterField } from "../types";

function filterText(operator: keyof typeof TEXT_OPERATORS, field: string, data: FilterField[], value: string) {
  if (!data) {
    return [];
  }

  switch (operator) {
    case "startsWith":
      return data.filter((item) =>
        String(item.field || "")
          .toLowerCase()
          .startsWith(value.toLowerCase())
      );

    case "contains":
      return data.filter((item) =>
        String(item.field || "")
          .toLowerCase()
          .includes(value.toLowerCase())
      );

    case "equals":
      return data.filter(
        (item) =>
          String(item.field || "").toLowerCase() ===
          value.toLowerCase()
      );

    case "notEquals":
      return data.filter(
        (item) =>
          String(item.field || "").toLowerCase() !==
          value.toLowerCase()
      );

    case "notContains":
      return data.filter(
        (item) =>
          !String(item.field || "")
            .toLowerCase()
            .includes(value.toLowerCase())
      );

    default:
      return data;

  }
}

export default function useFilterOperator() {
  function filterOperation(type: "text" | "number" | "boolean" | "select", operator: keyof typeof TEXT_OPERATORS, field: string, filtered: FilterField[], value: string) {
    switch (type) {
      case "text":
        return filterText(operator, field, filtered, value);

      case "number":
        return filtered.filter((item) => parseInt(item.label) === parseInt(value));

      case "boolean":
        return filtered.filter((item) => (String(value) === "true"));

      case "select":
        return filtered.filter((item) => item.label == value);

      default:
        return filtered;
    }
  }

  return {
    filterOperation
  }
}