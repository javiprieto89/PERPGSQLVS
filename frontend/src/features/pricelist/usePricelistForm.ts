import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  GetPriceListsDocument,
  useCreatePricelistMutation,
  useGetPricelistByIdQuery,
  useUpdatePricelistMutation,
  type PriceListsCreate,
} from "~/graphql/_generated/graphql";
import { AuthHelper } from "~/utils/authHelper";
import { pricelistHelpers, formSchema, type FormSchema } from "./pricelistHelpers";

export const BASE_ROUTE = "/pricelists";

interface UsePricelistFormOptions {
  id?: number; // PriceListID
}

/**
 * Custom hook for managing pricelist form state and operations
 * 
 * Features:
 * - Handles both create and edit modes
 * - Integrates with react-hook-form and Zod validation
 * - Manages GraphQL mutations with Apollo Client
 * - Automatic refetching after mutations
 * - Toast notifications for success/error
 * - Navigation after successful submission
 * 
 * @param options - Configuration options
 * @param options.id - PriceListID for edit mode, undefined for create mode
 * @returns Form state and handlers
 */
export function usePricelistForm({ id }: UsePricelistFormOptions = {}) {
  const navigate = useNavigate();

  // Query for fetching existing pricelist data (edit mode)
  const {
    data,
    error: queryError,
    loading: queryLoading,
  } = useGetPricelistByIdQuery({
    variables: { 
      id: id!,
      companyId: Number(AuthHelper.getSelectedAccess()?.CompanyID) || 0,
    },
    skip: !id || !AuthHelper.getSelectedAccess()?.CompanyID,
    fetchPolicy: "no-cache",
  });

  // Refetch configuration for mutations
  const refetchConfig = {
    refetchQueries: [
      {
        query: GetPriceListsDocument,
        variables: {
          companyId: Number(AuthHelper.getSelectedAccess()?.CompanyID),
        },
      },
    ],
    awaitRefetchQueries: true,
  };

  // Mutations
  const [updatePricelist, { loading: updateLoading, error: updateError }] =
    useUpdatePricelistMutation(refetchConfig);
  const [createPricelist, { loading: createLoading, error: createError }] =
    useCreatePricelistMutation(refetchConfig);

  const pricelist = data?.pricelistsById || null;
  const isEditing = !!id;
  const isLoading = queryLoading;
  const isSaving = updateLoading || createLoading;

  // Initialize form with Zod validation
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      CompanyID: String(AuthHelper.getSelectedAccess()?.CompanyID || ""),
      PriceListName: "",
      PriceListDescription: "",
      IsActive: true,
    },
  });

  // Load data into form when editing
  useEffect(() => {
    if (!data?.pricelistsById) return;
    
    const formData = pricelistHelpers.prepareDataFormSchema(data);
    if (formData) {
      form.reset(formData, {
        keepDirty: false,
        keepDirtyValues: false,
      });
    }
  }, [data?.pricelistsById, form]);

  /**
   * Handle form submission
   * - Prepares data for GraphQL mutation
   * - Executes create or update mutation
   * - Shows success/error toasts
   * - Navigates to list page with highlight
   */
  async function handleSubmit(formData: FormSchema) {
    try {
      let highlightId: number | null = null;
      
      if (isEditing && id) {
        // Update existing pricelist
        const { PriceListID, ...rest } = formData;
        await updatePricelist({
          variables: {
            pricelistID: String(id),
            input: pricelistHelpers.prepareData(rest),
          },
        });
        highlightId = id;
      } else {
        // Create new pricelist
        const result = await createPricelist({
          variables: {
            input: pricelistHelpers.prepareData(formData) as PriceListsCreate,
          },
        });
        highlightId = result.data?.createPricelist?.PriceListID || null;
      }

      // Navigate back to list with highlight
      navigate(BASE_ROUTE, {
        state: {
          highlight: highlightId,
        },
      });

      // Show success toast
      toast.success(
        isEditing 
          ? "Lista de precios actualizada con éxito" 
          : "Lista de precios creada con éxito"
      );
    } catch (error) {
      console.error("Error saving pricelist:", error);
      toast.error("Error al guardar la lista de precios. Contacte al administrador del sistema");
    }
  }

  return {
    navigate,
    form,
    handleSubmit,
    data: pricelist,
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
