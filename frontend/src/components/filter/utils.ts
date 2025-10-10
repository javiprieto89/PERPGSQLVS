import { MODEL_NAME_MAP, pluralMap, type ModelNameMap } from "./constants";
import { type FilterField } from "./types";

export const filterOperators = (filters: Record<string, string>) =>
  Object.keys(filters).filter(
    (key) =>
      !key.endsWith("_op") && filters[key] !== "" && filters[key] !== null
  );

export const getNameField = (model?: ModelNameMap) => {
  return model && MODEL_NAME_MAP[model] ? MODEL_NAME_MAP[model] : "Name";
};

export const formatClientName = (client: Record<string, string>) => {
  if (client.FirstName && client.LastName) {
    return `${client.FirstName} ${client.LastName}`;
  }
  return client.FirstName || client.LastName || `Cliente ${client.ClientID}`;
};

/**
 * @example
 * allSysdoctypes | allCompany | allCountries | allPricelists | allVendors
 * allCreditcards | allCreditcard
 */
export const getQueryName = (model: string) => {
  const plural = pluralMap[model as keyof typeof pluralMap] || `${model}s`;
  return `all${plural}`;
};

// Construir la query dinámicamente basada en el modelo
export function prepareRelationalModelQuery(
  queryName: string,
  relationModel: FilterField["relationModel"],
  isMultiple?: boolean
) {
  if (!queryName || !relationModel) return;

  const extraFields =
    relationModel === "Client"
      ? "FirstName LastName"
      : getNameField(relationModel as ModelNameMap);

  if (isMultiple) return `${queryName} { ${relationModel}ID ${extraFields} }`;
  return `{ ${queryName} { ${relationModel}ID ${extraFields} } }`;
}
