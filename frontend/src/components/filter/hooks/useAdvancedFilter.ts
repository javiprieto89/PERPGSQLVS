import { useContext } from "react";
import { AdvancedFilterContext } from "../context/context";

// import mock from "~/graphql/mockups/getFilterFields.json";
// import mock2 from "~/graphql/mockups/getRelations.json";

// Hook personalizado para React (opcional)
export const useAdvancedFilter = () => {
  const context = useContext(AdvancedFilterContext);

  console.log("context", context);

  if (!context) {
    console.error(
      "useAdvancedFilter must be used within AdvancedFilterProvider"
    );
  }

  return context;
};

// export function useFilterData(modelName: string) {
//   // const {
//   //   data: filterData,
//   //   loading,
//   //   error,
//   // } = useGetFilterFieldsQuery({
//   //   variables: { model: modelName },
//   // });

//   const filterData = mock.data;
//   const loading = false;
//   const error = null;

//   // construir flags a partir de filterData
//   const relationFlags = useMemo(() => {
//     if (!filterData?.filterFields) return;

//     const flags: GetRelationsQueryVariables = {};
//     filterData?.filterFields.forEach((field: FilterField) => {
//       if (field.relationModel && !field.dependsOn) {
//         flags[field.relationModel as keyof GetRelationsQueryVariables] = true;
//       }
//     });
//     return flags;
//   }, [filterData?.filterFields]);

//   // query estática con flags
//   // const { data: relationData, loading: relationLoading } = useGetRelationsQuery(
//   //   {
//   //     variables: relationFlags,
//   //     skip: !filterData?.filterFields, // no ejecutes hasta tener los filtros
//   //   }
//   // );

//   const relationData = mock2.data;
//   const relationLoading = false;
//   // const relationError = null;

//   return {
//     filterData,
//     loading: loading || relationLoading,
//     error,
//     relationData,
//   };
// }

// // const getAllQueries = useMemo(() => {
// //   if (filterData?.filterFields.length === 0) return;
// //   let queries: string[] = [];
// //   filterData?.filterFields.map((field: FilterField) => {
// //     if (!field || !field.relationModel) return;
// //     // Para modelos dependientes, no cargar inicialmente
// //     if (field.dependsOn) return;
// //     const queryName = getQueryName(field.relationModel);
// //     const query = prepareRelationalModelQuery(queryName, field.relationModel, true);
// //     if (query) queries.push(query);
// //   });
// //   return queries.join(" ");
// // }, [filterData]);
