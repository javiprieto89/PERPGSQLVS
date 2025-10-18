import { gql } from "@apollo/client";
import { apolloClient } from "~/lib/apollo";
import { MODEL_NAME_MAP, queryMap, type ModelNameMap } from "./constants";
import { type FilterField } from "./types";

/**
 * Filter out operator keys and empty values from filters object
 */
export const filterOperators = (filters: Record<string, string>) =>
  Object.keys(filters).filter(
    (key) =>
      !key.endsWith("_op") && filters[key] !== "" && filters[key] !== null
  );

/**
 * Get the name field for a given model
 * Different models use different field names for display (Name, VendorName, etc.)
 */
export const getNameField = (model?: ModelNameMap) => {
  return model && MODEL_NAME_MAP[model]
    ? MODEL_NAME_MAP[model]
    : `${model}Name`;
};

/**
 * Format client name for display (handles FirstName + LastName)
 */
export const formatClientName = (client: Record<string, string>) => {
  if (client.FirstName && client.LastName) {
    return `${client.FirstName} ${client.LastName}`;
  }
  return client.FirstName || client.LastName || `Cliente ${client.ClientID}`;
};

function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return ""; // Handle empty string case
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get the GraphQL query name for a model
 * @example Country -> allCountries, CarBrand -> allCarbrands
 */
export const getQueryName = (model: string) => {
  return (
    queryMap[model.toLowerCase() as keyof typeof queryMap] ||
    `all${capitalizeFirstLetter(model)}s`
  );
};

/**
 * Build a GraphQL query dynamically based on the relation model
 *
 * @param queryName - The GraphQL query name (e.g., "allCountries")
 * @param relationModel - The model name (e.g., "Country")
 * @param withQueryWrapper - Whether to wrap in query { } syntax
 * @returns GraphQL query string
 */
export function prepareRelationalModelQuery(
  queryName: string,
  relationModel: FilterField["relationModel"],
  withQueryWrapper = true
): string | null {
  if (!queryName || !relationModel) return null;

  const id = `${relationModel}ID`;

  // Special handling for Client model (needs FirstName + LastName)
  const name =
    relationModel === "Client"
      ? "FirstName LastName"
      : `name: ${getNameField(relationModel as ModelNameMap)}`;

  const fields = `id: ${id} ${name}`;

  if (withQueryWrapper) {
    return `query { ${queryName} { ${fields} } }`;
  }

  return `${queryName} { ${fields} }`;
}

/**
 * Build a GraphQL query for dependent fields (e.g., provinces by country)
 *
 * @param relationModel - The dependent model (e.g., "Province")
 * @param parentModel - The parent model (e.g., "Country")
 * @param parentIdField - The parent ID field name (e.g., "countryID")
 */
export function prepareDependentQuery(
  relationModel: string,
  parentModel: string,
  parentIdField: string
): string {
  const idField = `${relationModel}ID`;
  const nameField = getNameField(relationModel as ModelNameMap);

  // Generate query name based on convention: provincesByCountry, carmodelsByBrand, etc.
  const queryName = `${relationModel.toLowerCase()}sBy${parentModel}`;

  return `
    query Get${relationModel}By${parentModel}($${parentIdField}: Int!) {
      ${queryName}(${parentIdField}: $${parentIdField}) {
        ${idField}
        ${nameField}
      }
    }
  `;
}

/**
 * Load options for all select fields asynchronously
 * Used for initial batch loading of independent filter options
 */
export async function loadOptionsAsync({
  filterFields,
}: {
  filterFields: FilterField[];
}): Promise<Record<string, unknown[]>> {
  const selectFields = filterFields.filter((f) => f.type === "select");

  if (selectFields.length === 0) return {};

  const newOptions: Record<string, unknown[]> = {};

  // Load all independent fields in parallel
  const independentFields = selectFields.filter((f) => !f.dependsOn);

  await Promise.all(
    independentFields.map(async (field) => {
      if (!field.relationModel) {
        newOptions[field.field] = [];
        return;
      }

      try {
        const queryName = getQueryName(field.relationModel);
        const query = prepareRelationalModelQuery(
          queryName,
          field.relationModel
        );

        if (!query) {
          newOptions[field.field] = [];
          return;
        }

        const result = await apolloClient.query({
          query: gql`
            ${query}
          `,
          fetchPolicy: "cache-first", // Use cache for better performance
        });

        newOptions[field.field] = result.data[queryName] || [];
      } catch (err) {
        console.error(`Error loading options for ${field.field}:`, err);
        newOptions[field.field] = [];
      }
    })
  );

  // Initialize empty arrays for dependent fields
  selectFields
    .filter((f) => f.dependsOn)
    .forEach((field) => {
      newOptions[field.field] = [];
    });

  return newOptions;
}

/**
 * Get dependent query resolver based on parent-child relationship
 * This maps common dependencies in the system
 */
export function getDependentQueryInfo(
  relationModel: string,
  dependsOn: string
): { queryName: string; variableName: string } | null {
  const dependencyMap: Record<
    string,
    Record<string, { queryName: string; variableName: string }>
  > = {
    Province: {
      CountryID: { queryName: "provincesByCountry", variableName: "countryID" },
    },
    CarModel: {
      CarBrandID: { queryName: "carmodelsByBrand", variableName: "carBrandID" },
    },
    ItemSubcategory: {
      ItemCategoryID: {
        queryName: "itemsubcategoriesByCategory",
        variableName: "categoryID",
      },
    },
    Branch: {
      CompanyID: { queryName: "branchesByCompany", variableName: "companyID" },
    },
  };

  return dependencyMap[relationModel]?.[dependsOn] || null;
}

// console.log("EFFECT 1");
//     async function loadOptions() {
//       console.log("EFFECT 1 dentro");
//       const selectFields = filterFields.filter((f) => f.type === "select");
//       if (selectFields.length === 0) return;

//       const newOptions = {};

//       for (const field of selectFields) {
//         if (field.relationModel) {
//           try {
//             // Para modelos dependientes, no cargar inicialmente
//             if (field.dependsOn) {
//               newOptions[field.field] = [];
//             } else {
//               const queryName = getQueryName(field.relationModel);
//               const nameField = getNameField(field.relationModel);

//               // Construir la query dinámicamente basada en el modelo
//               let query;
//               if (field.relationModel === "Client") {
//                 query = `{ ${queryName} { ${field.relationModel}ID FirstName LastName } }`;
//               } else {
//                 query = `{ ${queryName} { ${field.relationModel}ID ${nameField} } }`;
//               }

//               const res = await graphqlClient.query(query);
//               console.log("res", JSON.stringify(res));
//               newOptions[field.field] = res[queryName] || [];
//             }
//           } catch (err) {
//             console.error(`Error cargando opciones para ${field.field}:`, err);
//             newOptions[field.field] = [];
//           }
//         }
//       }
//       setOptions(newOptions);
//     }
