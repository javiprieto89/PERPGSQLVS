import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetAllCommercialDocumentsDocument,
  useCreateDocumentMutation,
  useGetCommercialDocumentByIdQuery,
  useUpdateDocumentMutation,
  type CommercialDocumentsCreate,
} from "~/graphql/_generated/graphql";
import { AuthStorage } from "~/utils/auth.storage";
import {
  documentHelpers,
  formSchema,
  type FormSchema,
} from "./documentHelpers";

export const BASE_ROUTE = "/documents";

interface UseDocumentFormOptions {
  id?: number; // DocumentID
}

export function useDocumentForm({ id }: UseDocumentFormOptions = {}) {
  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetCommercialDocumentByIdQuery({
    variables: { id: id! },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const refetchConfig = {
    refetchQueries: [
      {
        query: GetAllCommercialDocumentsDocument,
        variables: {
          companyID: Number(AuthStorage.getSelectedAccess()?.CompanyID),
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  const [updateDocument, { loading: updateLoading, error: updateError }] =
    useUpdateDocumentMutation(refetchConfig);
  const [createDocument, { loading: createLoading, error: createError }] =
    useCreateDocumentMutation(refetchConfig);

  const document = data?.commercialdocumentsById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (!data?.commercialdocumentsById) return;
    form.reset(documentHelpers.prepareDataFormSchema(data), {
      keepDirty: true,
      keepDirtyValues: true,
      keepFieldsRef: true,
    });
  }, [data?.commercialdocumentsById, form]);

  async function handleSubmit(data: FormSchema) {
    try {
      let highlight = null;
      if (isEditing) {
        const { DocumentID, ...rest } = data;
        await updateDocument({
          variables: {
            documentID: DocumentID!,
            input: documentHelpers.prepareData(rest),
          },
        });
        highlight = DocumentID;
      } else {
        const result = await createDocument({
          variables: {
            input: documentHelpers.prepareData(
              data
            ) as CommercialDocumentsCreate,
          },
        });
        highlight = result.data?.createDocument.DocumentID;
      }

      navigate(BASE_ROUTE, {
        state: {
          highlight: highlight,
        },
      });
      toast.message(isEditing ? "Actualizado con éxito" : "Creado con éxito");
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error("Contacte al administrador del sistema");
    }
  }

  return {
    navigate,
    form,
    handleSubmit,
    data: document,
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
