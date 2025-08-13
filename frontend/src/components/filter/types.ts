import { GetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { NameFieldMap } from "./constants";

// type Field = {"allCountries":[{"CountryID":51,"Name":"Peru"},{"CountryID":54,"Name":"Argentina"}]};
export type FilterField = Omit<
  GetFilterFieldsQuery["filterFields"][0],
  "__typename"
> & {
  __typename?: string;
  relationModel?: NameFieldMap;
};

export type RenderInputsBaseProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  operator?: string;
  disabled?: boolean;
  onChange: (name: string, value: string) => void;
  filterField?: FilterField;
  className?: string;
};
