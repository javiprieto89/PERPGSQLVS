import { type NameFieldMap, nameFieldMap, pluralMap } from "./constants";
import { FilterField } from "./types";

export const getNameField = (model?: NameFieldMap) => {
  console.log(
    "getNameField",
    model,
    nameFieldMap,
    model && nameFieldMap[model] ? nameFieldMap[model] : "Name"
  );
  return model && nameFieldMap[model] ? nameFieldMap[model] : "Name";
};

export const getQueryName = (model: string) => {
  const plural = pluralMap[model as keyof typeof pluralMap] || `${model}s`;
  return `all${plural}`;
};

// Construir la query dinámicamente basada en el modelo
export function prepareRelationalModelQuery(
  queryName: string,
  relationModel: FilterField["relationModel"]
) {
  if (!queryName || !relationModel) return;

  const nameField =
    relationModel === "Client"
      ? "FirstName LastName"
      : getNameField(relationModel as NameFieldMap);

  return `{ ${queryName} { ${relationModel}ID ${nameField} } }`;
}

export const formatClientName = (client: Record<string, string>) => {
  if (client.FirstName && client.LastName) {
    return `${client.FirstName} ${client.LastName}`;
  }
  return client.FirstName || client.LastName || `Cliente ${client.ClientID}`;
};

// Función para formatear el nombre del cliente
// export const formatClientName = (client: {
//   FirstName: string;
//   LastName: string;
//   ClientID: string;
// }) => {
//   if (client.FirstName && client.LastName) {
//     return `${client.FirstName} ${client.LastName}`;
//   }
//   return client.FirstName || client.LastName || `Cliente ${client.ClientID}`;
// };
