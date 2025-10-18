import { gql } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { apolloClient } from "~/lib/apollo";
import { graphqlMap } from "../constants";
import type { FilterField } from "../types";
import { getQueryName, prepareRelationalModelQuery } from "../utils";

/**
 * Hook to load filter options dynamically based on the filter field configuration.
 *
 * This hook handles:
 * - Dynamic GraphQL query generation based on relationModel
 * - Automatic loading of independent fields
 * - Support for dependent fields (waits for parent value)
 * - Apollo Client integration with proper caching
 *
 * @param filterField - The filter field configuration
 * @param parentValue - For dependent fields, the parent field's current value
 * @returns loading state and options array
 */
export function useFilterOptionsLoader<T = Record<string, unknown>>(
  filterField: FilterField | undefined,
  parentValue?: string | number | null
) {
  console.log("filterField", filterField);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the query to prevent unnecessary rebuilds
  const query = useMemo(() => {
    if (!filterField?.relationModel) return null;

    const queryName = getQueryName(filterField.relationModel);
    const queryString = prepareRelationalModelQuery(
      queryName,
      filterField.relationModel
    );

    console.log("queryString", queryString);

    if (!queryString) return null;

    return {
      document: gql`
        ${queryString}
      `,
      name: queryName,
    };
  }, [filterField?.relationModel]);

  // Fetch options
  const fetchOptions = useCallback(async () => {
    if (!query) return;

    // Don't load if field depends on parent and parent has no value
    if (filterField?.dependsOn && !parentValue) {
      setOptions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await apolloClient.query<Record<string, T[]>>({
        query: query.document,
        variables:
          filterField?.dependsOn && parentValue
            ? { [filterField.dependsOn]: parentValue }
            : {},
        fetchPolicy: "cache-first", // Use cache for better performance
      });

      const data = result.data[query.name] || [];
      setOptions(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error(`Error loading options for ${filterField?.field}:`, error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [query, filterField?.dependsOn, filterField?.field, parentValue]);

  // Load options on mount or when dependencies change
  useEffect(() => {
    if (!filterField?.relationModel) return;

    // Independent fields load immediately
    if (!filterField.dependsOn) {
      fetchOptions();
      return;
    }

    // Dependent fields load when parent value changes
    if (parentValue) {
      fetchOptions();
    } else {
      // Clear options when parent is cleared
      setOptions([]);
    }
  }, [
    filterField?.relationModel,
    filterField?.dependsOn,
    parentValue,
    fetchOptions,
  ]);

  return {
    loading,
    options,
    error,
    refetch: fetchOptions,
  };
}

/**
 * Hook to load options imperatively (useful for complex dependencies)
 *
 * @param model - The relation model name
 * @returns Function to load options with custom variables
 */
export function useFilterOptionsLoaderLazy<T = Record<string, unknown>>(
  model?: string | null
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadOptions = useCallback(
    async (variables: Record<string, unknown> = {}): Promise<T[]> => {
      if (!model) return [];

      setLoading(true);
      setError(null);

      try {
        if (graphqlMap[model.toLowerCase() as keyof typeof graphqlMap]) {
          const documentNode =
            graphqlMap[model.toLowerCase() as keyof typeof graphqlMap];
          const result = await apolloClient.query<Record<string, T[]>>({
            query: documentNode,
            variables,
            fetchPolicy: "network-only",
          });

          const queryName = getQueryName(model);
          return result.data[queryName] || [];
        } else {
          console.log(
            `No predefined query for model: ${model}, attempting dynamic query.`
          );
          console.log(model, `Variables:`, variables);

          // const queryName = getQueryName(model);
          // const queryString = prepareRelationalModelQuery(queryName, model);

          // if (!queryString) {
          //   throw new Error(`Could not create query for model: ${model}`);
          // }

          // console.log("queryString", queryString);
          // const query = gql`
          //   ${queryString}
          // `;
          // const result = await apolloClient.query<Record<string, T[]>>({
          //   query,
          //   variables,
          //   fetchPolicy: "network-only",
          // });
          // return result.data[queryName] || [];
        }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        console.error(`Error loading options for ${model}:`, error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [model]
  );

  return {
    loading,
    error,
    loadOptions,
  };
}
