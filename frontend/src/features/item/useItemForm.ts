import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetAllItemsDocument,
  useCreateItemMutation,
  useGetItemByIdQuery,
  useUpdateItemMutation,
  type ItemsCreate,
} from "~/graphql/_generated/graphql";
import { AuthHelper } from "~/utils/authHelper";
import { formSchema, itemHelpers, type FormSchema } from "./itemHelpers";

export const BASE_ROUTE = "/items";

interface UseFormOptions {
  id?: number;
}

export function useItemForm({ id }: UseFormOptions = {}) {
  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetItemByIdQuery({
    variables: {
      id: id!,
      companyId: Number(AuthHelper.getSelectedAccess()?.CompanyID),
    },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetAllItemsDocument,
        variables: {
          companyID: Number(AuthHelper.getSelectedAccess()?.CompanyID),
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateMutation, { loading: updateLoading, error: updateError }] =
    useUpdateItemMutation(refetchConfig);
  const [createMutation, { loading: createLoading, error: createError }] =
    useCreateItemMutation(refetchConfig);

  const originalData = data?.itemsById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!data?.itemsById) return;
    form.reset(itemHelpers.prepareDataFormSchema(data), {
      keepDirty: true,
      keepDirtyValues: true,
      keepFieldsRef: true,
    });
  }, [data?.itemsById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let highlight = null;
      if (isEditing) {
        await updateMutation({
          variables: {
            itemID: id,
            companyId: Number(AuthHelper.getSelectedAccess()?.CompanyID),
            input: itemHelpers.prepareToInsert(data),
          },
        });
        highlight = id;
      } else {
        const result = await createMutation({
          variables: {
            input: itemHelpers.prepareToInsert(data) as ItemsCreate,
          },
        });
        highlight = result.data?.createItem.ItemID;
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: highlight,
        },
      });
      toast.message(isEditing ? "Actualizado con éxito" : "Creado con éxito");
    } catch (error) {
      console.error("Error saving client:", error);
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
