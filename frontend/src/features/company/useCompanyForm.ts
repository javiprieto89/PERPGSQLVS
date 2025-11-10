import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetCompanyByIdDocument,
  useCreateCompanyMutation,
  useGetCompanyByIdQuery,
  useUpdateCompanyMutation,
  type CreateCompanyMutation,
  type UpdateCompanyMutation,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";
import { companyHelpers, formSchema, type FormSchema } from "./companyHelper";

export const BASE_ROUTE = "/companyes";

interface UseCompanyFormOptions {
  id?: number; // CompanyID
  onSave?: (
    result: UpdateCompanyMutation | CreateCompanyMutation | null | undefined
  ) => void;
}

export function useCompanyForm({ id }: UseCompanyFormOptions = {}) {
  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetCompanyByIdQuery({
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetCompanyByIdDocument,
        variables: {
          companyID: Number(AuthStorage.getSelectedAccess()?.CompanyID),
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateMutation, { loading: updateLoading, error: updateError }] =
    useUpdateCompanyMutation(refetchConfig);
  const [createMutation, { loading: createLoading, error: createError }] =
    useCreateCompanyMutation(refetchConfig);

  const client = data?.companyesById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!data?.companyesById) return;
    form.reset(companyHelpers.prepareDataFormSchema(data), {
      keepDirty: true,
      keepDirtyValues: true,
      keepFieldsRef: true,
    });
  }, [data?.companyesById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let highlight = null;
      if (isEditing) {
        const { CompanyID, ...rest } = data;
        await updateMutation({
          variables: {
            companyID: Number(CompanyID),
            input: companyHelpers.prepareToInsert(rest),
          },
        });
        highlight = CompanyID;
      } else {
        const result = await createMutation({
          variables: {
            input: companyHelpers.prepareToInsert(data) as CompanyesCreate,
          },
        });
        highlight = result.data?.createCompany.CompanyID;
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
