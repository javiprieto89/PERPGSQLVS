import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetAllItemCategoriesDocument,
  useCreateItemCategoryMutation,
  useGetItemCategoryByIdQuery,
  useUpdateItemCategoryMutation,
  type ItemCategoriesCreate,
} from "~/graphql/_generated/graphql";
import { AuthHelper } from "~/utils/authHelper";
import { formSchema, itemCategoryHelpers, type FormSchema } from "./itemCategoryHelpers";

export const BASE_ROUTE = "/items/categories";

interface UseFormOptions {
  id?: number;
}

export function useItemCategoryForm({ id }: UseFormOptions = {}) {
  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetItemCategoryByIdQuery({
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
    useUpdateItemCategoryMutation(refetchConfig);
  const [createMutation, { loading: createLoading, error: createError }] =
    useCreateItemCategoryMutation(refetchConfig);

  const originalData = data?.itemcategoriesById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      CategoryName: "",
    },
  });

  useEffect(() => {
    if (!data?.itemcategoriesById) return;
    form.reset(itemCategoryHelpers.prepareDataFormSchema(data), {
      keepDirty: true,
      keepDirtyValues: true,
      keepFieldsRef: true,
    });
  }, [data?.itemcategoriesById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let highlight = null;
      if (isEditing) {
        await updateMutation({
          variables: {
            categoryID: id,
            input: itemCategoryHelpers.prepareToUpdate(data),
          },
        });
        highlight = id;
      } else {
        const result = await createMutation({
          variables: {
            input: itemCategoryHelpers.prepareToInsert(data) as ItemCategoriesCreate,
          },
        });
        highlight = result.data?.createItemcategory.ItemCategoryID;
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: highlight,
        },
      });
      toast.message(isEditing ? "Categoría actualizada con éxito" : "Categoría creada con éxito");
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