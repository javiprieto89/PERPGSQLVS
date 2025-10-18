import { type PropsWithChildren } from "react";
import { useGetFilterFieldsQuery } from "~/graphql/_generated/graphql";
import { AdvancedFilterContext } from "./context";
// import mock from "~/graphql/mockups/getFilterFields.json";

// filterFields: GetFilterFieldsQuery['filterFields'],
// relationData?: GetRelationsQuery | undefined

export function AdvancedFilterProvider({ modelName, children }: PropsWithChildren & {
  modelName: string
}) {
  if (!modelName) throw new Error("modelName must be defined");

  console.log("modelName:", modelName);

  const {
    data: filterData,
    loading,
    error,
  } = useGetFilterFieldsQuery({
    variables: { model: modelName },
  });

  // const relationData = mock2.data;
  // const relationLoading = false;
  // const filterData = mock.data;
  // const loading = false;
  // const error = null;

  // useEffect(() => {
  //   if (filterData?.filterFields && relationFlags) {
  //     console.log("REFETCH", filterData?.filterFields, relationFlags);
  //     refetch()
  //   };
  // }, [refetch, filterData?.filterFields, relationFlags])

  const contextValue = {
    filterData,
    loading,
    error
  };

  return (
    <AdvancedFilterContext.Provider value={contextValue} >{children}</AdvancedFilterContext.Provider>
  )
}
