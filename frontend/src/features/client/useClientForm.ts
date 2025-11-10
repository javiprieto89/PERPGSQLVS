import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  GetAllClientsDocument,
  useCreateClientMutation,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  type ClientsCreate,
  type CreateClientMutation,
  type UpdateClientMutation,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";
import { clientHelpers, formSchema, type FormSchema } from "./clientHelpers";

export const BASE_ROUTE = "/clients";

interface UseClientFormOptions {
  id?: number; // ClientID
  onSave?: (
    result: UpdateClientMutation | CreateClientMutation | null | undefined
  ) => void;
}

export function useClientForm({ id, onSave }: UseClientFormOptions = {}) {
  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetClientByIdQuery({
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetAllClientsDocument,
        variables: {
          companyID: Number(AuthStorage.getSelectedAccess()?.CompanyID),
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateClient, { loading: updateLoading, error: updateError }] =
    useUpdateClientMutation(refetchConfig);
  const [createClient, { loading: createLoading, error: createError }] =
    useCreateClientMutation(refetchConfig);

  const client = data?.clientsById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!data?.clientsById) return;
    form.reset(clientHelpers.prepareDataFormSchema(data), {
      keepDirty: true,
      keepDirtyValues: true,
      keepFieldsRef: true,
    });
  }, [data?.clientsById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let highlight = null;
      let result = null;

      if (isEditing) {
        const { ClientID, ...rest } = data;
        result = await updateClient({
          variables: {
            clientID: ClientID,
            input: clientHelpers.prepareData(rest),
          },
        });
        highlight = ClientID;
      } else {
        result = await createClient({
          variables: {
            input: clientHelpers.prepareData(data) as ClientsCreate,
          },
        });
        highlight = result.data?.createClient.ClientID;
      }

      onSave?.(result?.data);
      toast.message(isEditing ? "Actualizado con éxito" : "Creado con éxito");
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Contacte al administrador del sistema");
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
