import { type PropsWithChildren } from "react";
import { useGetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { AdvancedFilterContext } from "./context";
// import mock from "~/graphql/mockups/getFilterFields.json";
import mock2 from "~/graphql/mockups/getRelations.json";

// filterFields: GetFilterFieldsQuery['filterFields'],
// relationData?: GetRelationsQuery | undefined

export function AdvancedFilterProvider({ modelName, children }: PropsWithChildren & {
  modelName: string
}) {
  if (!modelName) throw new Error("modelName must be defined");

  const {
    data: filterData,
    loading,
    error,
  } = useGetFilterFieldsQuery({
    variables: { model: modelName },
  });

  // const filterData = mock.data;
  // const loading = false;
  // const error = null;

  // construir flags a partir de filterData
  // const relationFlags = useMemo(() => {
  //   if (!filterData?.filterFields) return;

  //   const flags: GetRelationsQueryVariables = {};
  //   filterData?.filterFields.forEach((field: FilterField) => {
  //     if (field.relationModel && !field.dependsOn) {
  //       flags[field.relationModel as keyof GetRelationsQueryVariables] = true;
  //     }
  //   });
  //   return flags;
  // }, [filterData?.filterFields]);

  // query estática con flags
  // const { data: relationData, loading: relationLoading } = useGetRelationsQuery(
  //   {
  //     variables: relationFlags,
  //     skip: !filterData?.filterFields, // no ejecutes hasta tener los filtros
  //   }
  // );

  // useEffect(() => {
  //   if (filterData?.filterFields && relationFlags) {
  //     console.log("REFETCH", filterData?.filterFields, relationFlags);
  //     refetch()
  //   };
  // }, [refetch, filterData?.filterFields, relationFlags])

  const relationData = mock2.data;
  const relationLoading = false;

  const contextValue = {
    filterData,
    loading: loading || relationLoading,
    error,
    relationData
  };

  return (
    <AdvancedFilterContext.Provider value={contextValue} >{children}</AdvancedFilterContext.Provider>
  )
}
