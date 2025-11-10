import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  GetBranchesByCompanyDocument,
  useCreateBranchMutation,
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
  type BranchesCreate,
  type CreateBranchMutation,
  type UpdateBranchMutation,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";
import { branchHelpers, formSchema, type FormSchema } from "./branchHelpers";

export const BASE_ROUTE = "/branches";

interface UseClientFormOptions {
  id?: number; // ClientID
  onSave?: (
    result: UpdateBranchMutation | CreateBranchMutation | null | undefined
  ) => void;
}

export function useBranchForm({ id, onSave }: UseClientFormOptions = {}) {
  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetBranchByIdQuery({
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetBranchesByCompanyDocument,
        variables: {
          companyID: Number(AuthStorage.getSelectedAccess()?.CompanyID),
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateMutation, { loading: updateLoading, error: updateError }] =
    useUpdateBranchMutation(refetchConfig);
  const [createMutation, { loading: createLoading, error: createError }] =
    useCreateBranchMutation(refetchConfig);

  const client = data?.branchesById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!data?.branchesById) return;
    form.reset(branchHelpers.prepareDataFormSchema(data), {
      keepDirty: true,
      keepDirtyValues: true,
      keepFieldsRef: true,
    });
  }, [data?.branchesById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let result = null;
      if (isEditing) {
        const { BranchID, ...rest } = data;
        result = await updateMutation({
          variables: {
            branchID: Number(BranchID),
            input: branchHelpers.prepareToInsert(rest),
          },
        });
      } else {
        result = await createMutation({
          variables: {
            input: branchHelpers.prepareToInsert(data) as BranchesCreate,
          },
        });
      }

      toast.message(isEditing ? "Actualizado con éxito" : "Creado con éxito");

      onSave?.(result.data);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error saving client:", error);
      }
      toast.error("Ha ocurrido un error al guardar la sucursal");
    }
  }

  return {
    form,
    handleSubmit,
    data: client,
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
