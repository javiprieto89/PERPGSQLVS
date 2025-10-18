import { gql } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

import { apolloClient } from "~/lib/apollo";
import type { FilterField } from "../types";
import { getDependentQueryInfo, getNameField } from "../utils";
import type { ModelNameMap } from "../constants";

/**
 * Hook for handling dependent field relationships (e.g., Province depends on Country)
 * 
 * This hook:
 * - Automatically builds queries for common parent-child relationships
 * - Loads dependent data when parent value changes
 * - Clears dependent data when parent is cleared
 * 
 * @param filterField - The dependent filter field configuration
 * @param parentValue - The current value of the parent field
 */
export function useDependentFieldLoader<T = Record<string, unknown>>(
  filterField: FilterField | undefined,
  parentValue?: string | number | null
) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const loadDependentOptions = useCallback(async () => {
    if (!filterField?.relationModel || !filterField.dependsOn || !parentValue) {
      setOptions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryInfo = getDependentQueryInfo(
        filterField.relationModel,
        filterField.dependsOn
      );

      if (!queryInfo) {
        throw new Error(
          `No query mapping found for ${filterField.relationModel} depending on ${filterField.dependsOn}`
        );
      }

      const idField = `${filterField.relationModel}ID`;
      const nameField = getNameField(filterField.relationModel as ModelNameMap);

      const query = gql`
        query Get${filterField.relationModel}By${filterField.dependsOn}($${queryInfo.variableName}: Int!) {
          ${queryInfo.queryName}(${queryInfo.variableName}: $${queryInfo.variableName}) {
            ${idField}
            ${nameField}
          }
        }
      `;

      const result = await apolloClient.query<Record<string, T[]>>({
        query,
        variables: {
          [queryInfo.variableName]: Number(parentValue),
        },
        fetchPolicy: "cache-first",
      });

      const data = result.data[queryInfo.queryName] || [];
      setOptions(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error(
        `Error loading dependent options for ${filterField.field}:`,
        error
      );
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, [
    filterField?.relationModel,
    filterField?.dependsOn,
    filterField?.field,
    parentValue,
  ]);

  useEffect(() => {
    if (parentValue) {
      loadDependentOptions();
    } else {
      setOptions([]);
    }
  }, [parentValue, loadDependentOptions]);

  return {
    loading,
    options,
    error,
    refetch: loadDependentOptions,
  };
}
