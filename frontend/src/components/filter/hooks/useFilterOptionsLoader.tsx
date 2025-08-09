import { useEffect, useState } from "react";

import { gql } from "@apollo/client";
import { graphqlClient } from "~/graphql/graphqlClient";
import { type NameFieldMap } from "../constants";
import { FilterField } from "../types";
import { getNameField, getQueryName } from "../utils";

function prepareQuery<T extends FilterField>(field: T | undefined) {
  if (!field) return null;

  // No relationModel, no query
  if (!field.relationModel) {
    return null;
  }

  // Para modelos dependientes, no cargar inicialmente
  if (field.dependsOn) {
    return null;
  }

  const queryName = getQueryName(field.relationModel);
  const nameField = field.relationModel ? getNameField(field.relationModel as NameFieldMap) : "";
  console.log({ queryName, nameField })

  // Construir la query dinámicamente basada en el modelo
  let query = null;
  if (field.relationModel === "Client") {
    query = gql`{ ${queryName} { ${field.relationModel}ID FirstName LastName } }`;
  } else {
    query = gql`{ ${queryName} { ${field.relationModel}ID ${nameField} } }`;
  }

  console.log("QUERY", query);

  return query;
}

export function useFilterOptionsLoader<T extends FilterField>(field: T | undefined) {
  const [option, setOption] = useState<Record<string, T[]>>({});

  useEffect(() => {
    async function loadOptions() {
      if (!field) return;

      console.log("field", field)

      let newOption: Record<string, any[]> = {};

      if (field.relationModel) {
        try {
          // Para modelos dependientes, no cargar inicialmente
          if (field.dependsOn) {
            newOption[field.field] = [];
          } else {
            const queryName = getQueryName(field.relationModel);
            const nameField = field.relationModel ? getNameField(field.relationModel as NameFieldMap) : "";

            console.log({ queryName, nameField })

            // Construir la query dinámicamente basada en el modelo
            let query;
            if (field.relationModel === "Client") {
              query = `{ ${queryName} { ${field.relationModel}ID FirstName LastName } }`;
            } else {
              query = `{ ${queryName} { ${field.relationModel}ID ${nameField} } }`;
            }

            console.log("QUERY", query);
            const res = await graphqlClient.query(query);
            console.log("res", res);
            newOption[field.field] = res[queryName] || [];
          }

          setOption(newOption);
        } catch (err) {
          console.error(`Error cargando opciones para ${field.field}:`, err);
          newOption[field.field] = [];
        }
      }
    }
    loadOptions();
  }, [field]);

  console.log("option", option)

  return {
    options: []
  }
}


export function useFilterOptionsLoaderLegacy(filterFields: FilterField[] | undefined) {
  const [options, setOptions] = useState<Record<string, FilterField[]>>({});
  useEffect(() => {
    if (!filterFields || filterFields.length === 0) {
      return
    };

    async function loadOptions(selectFields: FilterField[]) {
      if (selectFields.length === 0) return;

      const newOptions: Record<string, FilterField[]> = {};

      for (const field of selectFields) {
        if (field.relationModel) {
          try {
            // Para modelos dependientes, no cargar inicialmente
            if (field.dependsOn) {
              newOptions[field.field] = [];
            } else {
              const queryName = getQueryName(field.relationModel);
              const nameField = field.relationModel ? getNameField(field.relationModel as NameFieldMap) : "";

              // Construir la query dinámicamente basada en el modelo
              let query;
              if (field.relationModel === "Client") {
                query = `{ ${queryName} { ${field.relationModel}ID FirstName LastName } }`;
              } else {
                query = `{ ${queryName} { ${field.relationModel}ID ${nameField} } }`;
              }


              console.log("QUERY", query);
              const res = await graphqlClient.query(query);
              console.log("res", res);
              newOptions[field.field] = res[queryName] || [];
            }
          } catch (err) {
            console.error(`Error cargando opciones para ${field.field}:`, err);
            newOptions[field.field] = [];
          }
        }
      }
      setOptions(newOptions);
    }

    loadOptions(filterFields.filter((f) => f.type === "select"));
  }, [filterFields]);

  return {
    options
  }
}