import { useCallback, useEffect, useState } from "react";

import { graphqlClient } from "~/graphql/graphqlClient";
import { type FilterField } from "../types";
import { getQueryName, prepareRelationalModelQuery } from "../utils";

export function useFilterOptionsLoader<T extends FilterField>(
  field: T | undefined
) {
  // const [getDogs, { loading, error, data }] = useLazyQuery(GET_DOGS);
  const [options, setOptions] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = useCallback(async function () {
    try {
      if (!field || !field.relationModel) return;
      // Para modelos dependientes, no cargar inicialmente
      if (field.dependsOn) return;
      setLoading(true);

      // build query
      const queryName = getQueryName(field.relationModel);
      const query = prepareRelationalModelQuery(queryName, field.relationModel);
      if (!query) throw new Error("Couldn't create the query");
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
    if (!field || !field.relationModel) return;
    loadOptions();
  }, [field]);

  return {
    loading,
    options,
  };
}

export function useFilterOptionsLoader2(model?: string | null, variables = {}) {
  // const [getDogs, { loading, error, data }] = useLazyQuery(GET_DOGS);
  const [loading, setLoading] = useState(false);

  const options = useCallback(async function () {
    if (!model) return [];
    setLoading(true);
    const queryName = getQueryName(model);
    const query = prepareRelationalModelQuery(queryName, model);
    if (!query) throw new Error("Couldn't create the query");
    const res = await graphqlClient.query(query, variables);
    setLoading(false);
    return res;
  }, []);

  console.log("options 1", options);

  return {
    loading,
    options,
  };
}
