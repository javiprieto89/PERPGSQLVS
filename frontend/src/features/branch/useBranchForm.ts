import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetBranchesByCompanyDocument,
  useCreateBranchMutation,
  useGetBranchByIdQuery,
  useUpdateBranchMutation,
  type BranchesCreate,
} from "~/graphql/_generated/graphql";
import { AuthHelper } from "~/utils/authHelper";
import { branchHelpers, formSchema, type FormSchema } from "./branchHelpers";

export const BASE_ROUTE = "/branches";

interface UseClientFormOptions {
  id?: number; // ClientID
}

export function useBranchForm({ id }: UseClientFormOptions = {}) {
  const navigate = useNavigate();

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
          companyID: Number(AuthHelper.getSelectedAccess()?.CompanyID),
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
      let highlight = null;
      if (isEditing) {
        const { BranchID, ...rest } = data;
        await updateMutation({
          variables: {
            branchID: Number(BranchID),
            input: branchHelpers.prepareToInsert(rest),
          },
        });
        highlight = BranchID;
      } else {
        const result = await createMutation({
          variables: {
            input: branchHelpers.prepareToInsert(data) as BranchesCreate,
          },
        });
        highlight = result.data?.createBranch.BranchID;
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
