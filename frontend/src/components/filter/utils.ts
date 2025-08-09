import { type NameFieldMap, nameFieldMap, pluralMap } from "./constants";

export const getNameField = (model: NameFieldMap | null) =>
  model ? nameFieldMap[model] : "Name";

export const getQueryName = (model: string) => {
  const plural = pluralMap[model as keyof typeof pluralMap] || `${model}s`;
  return `all${plural}`;
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

export const formatClientName = (client: Record<string, string>) => {
  if (client.FirstName && client.LastName) {
    return `${client.FirstName} ${client.LastName}`;
  }
  return client.FirstName || client.LastName || `Cliente ${client.ClientID}`;
};
