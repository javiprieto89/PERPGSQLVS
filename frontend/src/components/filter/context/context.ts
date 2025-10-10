import { createContext } from "react";
import {
  type GetFilterFieldsQuery,
  type GetRelationsQuery,
} from "~/graphql/_generated/graphql";

export type AdvancedFilterContextProps = {
  filterData?: GetFilterFieldsQuery;
  loading: boolean;
  error?: Error | null;
  relationData?: GetRelationsQuery;
  modelName?: string;
};

export const AdvancedFilterContext = createContext<AdvancedFilterContextProps>({
  loading: false,
});
