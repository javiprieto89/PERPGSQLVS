import {
  type GetFilterFieldsQuery,
  type GetRelationsQuery,
} from "~/graphql/_generated/graphql";

// type Field = {"allCountries":[{"CountryID":51,"Name":"Peru"},{"CountryID":54,"Name":"Argentina"}]};
export type FilterField = Omit<
  GetFilterFieldsQuery["filterFields"][0],
  "__typename"
>;

export type Relations = Omit<GetRelationsQuery, "__typename">;
export type RelationKey = keyof Relations;

export type RenderInputsBaseProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (name: string, value: string) => void; // passing `name` due to _op tags in select
  className?: string;
};
