import { useCallback, useEffect, useState } from "react";

import { graphqlClient } from "~/graphql/graphqlClient";
import { FilterField } from "../types";
import { getQueryName, prepareRelationalModelQuery } from "../utils";

export function useFilterOptionsLoader<T extends FilterField>(
  field: T | undefined
) {
  const [options, setOptions] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = useCallback(async function () {
    try {
      if (!field || !field.relationModel) return;
      // Para modelos dependientes, no cargar inicialmente
      if (field.dependsOn) return;
      setLoading(true);
      const queryName = getQueryName(field.relationModel);
      const query = prepareRelationalModelQuery(queryName, field.relationModel);
      if (!query) throw new Error("Query is empty");
      const res = await graphqlClient.query(query);
      setOptions(res[queryName] || []);
      setLoading(false);
    } catch (err) {
      console.error(`Error cargando opciones para ${field?.field}:`, err);
      setOptions([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (field) loadOptions();
  }, [field]);

  return {
    loading,
    options,
  };
}
