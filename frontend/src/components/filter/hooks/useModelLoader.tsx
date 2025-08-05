import { useState } from "react";
import { useGetBranchesByCompanyQuery, useGetCarModelsByBrandQuery, useGetItemSubcategoriesByCategoryQuery, useGetProvincesByCountryQuery } from "~/graphql/_generated/graphql";

export function useModelLoader() {
  const [loading, setLoading] = useState<boolean>(false);

  // Función para cargar provincias por país
  const loadProvincesByCountry = async (value: string | number) => {
    const { data } = useGetProvincesByCountryQuery({
      variables: { countryID: Number(value) }
    });
    return data?.provincesByCountry || []
  };

  // Función para cargar modelos por marca
  const loadModelsByBrand = async (value: string) => {
    const { data } = useGetCarModelsByBrandQuery({
      variables: { brandID: Number(value) }
    });
    return data?.carmodelsByBrand || [];
  };

  const loadSubcategoriesByCategory = async (value: string) => {
    const { data } = useGetItemSubcategoriesByCategoryQuery({
      variables: { categoryID: Number(value) }
    });
    return data?.itemsubcategoriesByCategory || [];
  };

  const loadBranchesByCompany = async (value: string) => {
    const { data } = useGetBranchesByCompanyQuery({
      variables: { companyID: Number(value) }
    });
    return data?.branchesByCompany || [];
  };

  async function queryModel(model: string | null | undefined, field: string | null | undefined, value: string) {
    setLoading(true);
    try {
      if (model === "Province" && field == "countryID") {
        return await loadProvincesByCountry(value);
      } else if (model === "CarModel" && field == "carBrandID") {
        return await loadModelsByBrand(value);
      } else if (model === "ItemSubcategory" && field == "itemCategoryID") {
        return await loadSubcategoriesByCategory(value);
      } else if (model === "Branch" && field == "companyID") {
        return await loadBranchesByCompany(value);
      }
      return [];
    } catch (err) {
      console.error("Error cargando modelos:", (err as Error).message);
      setLoading(false);
      return [];
    }
  }

  return { queryModel, loading }
}




// const loadProvincesByCountryLegacy = async (value: string | number) => {
//   const response = await graphqlClient.query(`
//     query {
//         provincesByCountry(countryID: ${value}) {
//             ProvinceID
//             Name
//         }
//     }
// `);
//   console.log(
//     "LOADER loadProvincesByCountry",
//     response.provincesByCountry
//   );
//   return response.provincesByCountry;
// };

// const loadModelsByBrandLegacy = async (value: string) => {
// const response = await graphqlClient.query(`
//               query {
//                   carmodelsByBrand(carBrandID: ${brandID}) {
//                       CarModelID
//                       Model
//                   }
//               }
//           `);
// console.log(
//   "LOADER  loadModelsByBrand",
//   response.carmodelsByBrand
// );
// return response.carmodelsByBrand;
// };


// const loadSubcategoriesByCategory = async (key: string, categoryID: string) => {
//     const response = await graphqlClient.query(`
//                   query {
//                       itemsubcategoriesByCategory(categoryID: ${categoryID}) {
//                           ItemSubcategoryID
//                           SubcategoryName
//                       }
//                   }
//               `);
//     console.log(
//       "LOADER  loadSubcategoriesByCategory",
//       response.itemsubcategoriesByCategory
//     );
//     return response.itemsubcategoriesByCategory;
//   };


// const loadBranchesByCompany = async (key: string, companyID: string) => {
//     const response = await graphqlClient.query(`
//                   query {
//                       branchesByCompany(companyID: ${companyID}) {
//                           BranchID
//                           Name
//                       }
//                   }
//               `);
//     console.log(
//       "LOADER  loadBranchesByCompany",
//       response.branchesByCompany
//     );
//     return response.branchesByCompany;
//   };