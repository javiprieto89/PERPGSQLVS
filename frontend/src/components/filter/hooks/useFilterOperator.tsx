import { FilterField } from "../types";

function switchTextOperator(operator: string, field: string, data: FilterField[], value: string) {
  if (!data) {
    return [];
  }

  console.log("switchTextOperator", { data, field });

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

  function filterOperation(type: string, operator: string, field: string, filtered: FilterField[], value: string) {
    console.log("filterOperation", { operator, field, filtered, value })
    switch (type) {
      case "text":
        return switchTextOperator(operator, field, filtered, value);

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