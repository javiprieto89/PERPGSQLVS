import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetAllItemCategoriesDocument,
  useCreateItemSubcategoryMutation,
  useGetItemSubcategoryByIdQuery,
  useUpdateItemSubcategoryMutation,
  type ItemSubcategoriesCreate,
} from "~/graphql/_generated/graphql";
import {
  formSchema,
  itemCategoryHelpers,
  type FormSchema,
} from "./itemSubCategoryHelpers";

export const BASE_ROUTE = "/items/subcategories";

interface UseFormOptions {
  id?: number;
}

export function useItemSubCategoryForm({ id }: UseFormOptions = {}) {
  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetItemSubcategoryByIdQuery({
    variables: {
      id: id!,
    },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetAllItemCategoriesDocument,
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateMutation, { loading: updateLoading, error: updateError }] =
    useUpdateItemSubcategoryMutation(refetchConfig);
  const [createMutation, { loading: createLoading, error: createError }] =
    useCreateItemSubcategoryMutation(refetchConfig);

  const originalData = data?.itemsubcategoriesById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      SubcategoryName: "",
    },
  });

  useEffect(() => {
    if (!data?.itemsubcategoriesById) return;
    form.reset(
      itemCategoryHelpers.prepareDataFormSchema({
        ...data?.itemsubcategoriesById,
        CategoryData: data?.itemsubcategoriesById?.CategoryData
          ? {
              ...data?.itemsubcategoriesById.CategoryData,
              CompanyID: 0, // Provide a default or appropriate value
              ItemCategoryID: 0, // Provide a default or appropriate value
            }
          : null,
      }),
      {
        keepDirty: true,
        keepDirtyValues: true,
        keepFieldsRef: true,
      }
    );
  }, [data?.itemsubcategoriesById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let highlight = null;
      if (isEditing) {
        await updateMutation({
          variables: {
            subcategoryID: id,
            input: itemCategoryHelpers.prepareToUpdate(data),
          },
        });
        highlight = id;
      } else {
        const result = await createMutation({
          variables: {
            input: itemCategoryHelpers.prepareToInsert(
              data
            ) as ItemSubcategoriesCreate,
          },
        });
        highlight = result.data?.createItemsubcategory.ItemSubcategoryID;
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: highlight,
        },
      });
      toast.message(
        isEditing
          ? "Categoría actualizada con éxito"
          : "Categoría creada con éxito"
      );
    } catch (error) {
      console.error("Error saving item category:", error);
      toast.error("Contacte al administrador del sistema");
    }
  }

  return {
    navigate,
    form,
    handleSubmit,
    originalData,
    isEditing,
    isLoading,
    isSaving,
    errors: {
      query: queryError,
      update: updateError,
      create: createError,
    },
  };
}

// const [name, setName] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isEdit, setIsEdit] = useState(false);

//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await itemCategoryOperations.getAllItemCategories();
//         setCategories(data);
//       } catch (err) {
//         console.error("Error cargando categorías:", err);
//       }
//     };
//     loadCategories();
//   }, []);

//   useEffect(() => {
//     if (initialSubcategory) {
//       setIsEdit(true);
//       setName(initialSubcategory.SubcategoryName || "");
//       setCategoryId(initialSubcategory.ItemCategoryID || "");
//     }
//   }, [initialSubcategory]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       let result;
//       if (isEdit) {
//         result = await itemSubcategoryOperations.updateItemSubcategory(
//           initialSubcategory.ItemSubcategoryID,
//           {
//             ItemCategoryID: parseInt(categoryId),
//             SubcategoryName: name,
//           }
//         );
//       } else {
//         result = await itemSubcategoryOperations.createItemSubcategory({
//           ItemCategoryID: parseInt(categoryId),
//           SubcategoryName: name,
//         });
//       }
//       onSave && onSave(result);
//       onClose && onClose();
//     } catch (err) {
//       console.error("Error guardando subcategoría:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
