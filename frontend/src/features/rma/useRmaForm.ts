import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import {
  rmaService,
  type RmaInput,
  type RmaRecord,
} from "~/services/rma.service";
import { AuthStorage } from "~/utils/auth.storage";
import { rmaHelpers } from "./rmaHelpers";

export const BASE_ROUTE = "/rma";

const rmaFormSchema = z.object({
  CompanyID: z.number().min(1, "La empresa es requerida"),
  BranchID: z.number().min(1, "La sucursal es requerida"),
  RmaTypeID: z.number().min(1, "El tipo de RMA es requerido"),
  WarehouseID: z.number().min(1, "El almacén es requerido"),
  UserID: z.number().min(1, "El usuario es requerido"),
  StatusID: z.number().min(1, "El estado es requerido"),
  ClientID: z.number().optional(),
  SupplierID: z.number().optional(),
  RelatedOrderID: z.number().optional(),
  RelatedPIID: z.number().optional(),
  PriceListID: z.number().optional(),
  DocumentID: z.number().optional(),
  Notes: z.string().optional(),
  Subtotal: z.number().optional(),
  VatAmount: z.number().optional(),
  Total: z.number().optional(),
});

type RmaFormData = z.infer<typeof rmaFormSchema>;

interface UseRmaFormProps {
  id?: number;
}

export function useRmaForm({ id }: UseRmaFormProps) {
  const navigate = useNavigate();
  const selectedAccess = AuthStorage.getSelectedAccess();
  const isEditing = Boolean(id);

  const [data, setData] = useState<RmaRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({
    query: null as Error | null,
    create: null as Error | null,
    update: null as Error | null,
  });

  const form = useForm<RmaFormData>({
    resolver: zodResolver(rmaFormSchema),
    defaultValues: {
      CompanyID: selectedAccess?.CompanyID ?? 0,
      BranchID: selectedAccess?.BranchID ?? 0,
      RmaTypeID: 0,
      WarehouseID: 0,
      UserID: 0,
      StatusID: 0,
      ClientID: undefined,
      SupplierID: undefined,
      RelatedOrderID: undefined,
      RelatedPIID: undefined,
      PriceListID: undefined,
      DocumentID: undefined,
      Notes: "",
      Subtotal: undefined,
      VatAmount: undefined,
      Total: undefined,
    },
  });

  // Load data for editing
  useEffect(() => {
    if (isEditing && id && selectedAccess) {
      loadRma(selectedAccess.CompanyID, selectedAccess.BranchID, id);
    }
  }, [isEditing, id, selectedAccess]);

  const loadRma = async (
    companyID: number,
    branchID: number,
    rmaID: number
  ) => {
    try {
      setIsLoading(true);
      setErrors({ query: null, create: null, update: null });

      const rma = await rmaService.getById(companyID, branchID, rmaID);

      if (rma) {
        setData(rma);
        const formData = rmaHelpers.rmaToFormData(rma);

        Object.entries(formData).forEach(([key, value]) => {
          form.setValue(key as keyof RmaFormData, value as any);
        });
      }
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Error al cargar el RMA");
      setErrors((prev) => ({ ...prev, query: errorObj }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: RmaFormData) => {
    try {
      setIsSaving(true);
      setErrors({ query: null, create: null, update: null });

      const input: RmaInput = {
        ...formData,
        ClientID: formData.ClientID || undefined,
        SupplierID: formData.SupplierID || undefined,
        RelatedOrderID: formData.RelatedOrderID || undefined,
        RelatedPIID: formData.RelatedPIID || undefined,
        PriceListID: formData.PriceListID || undefined,
        DocumentID: formData.DocumentID || undefined,
        Notes: formData.Notes || undefined,
        Subtotal: formData.Subtotal || undefined,
        VatAmount: formData.VatAmount || undefined,
        Total: formData.Total || undefined,
      };

      let result: RmaRecord;

      if (isEditing && id && selectedAccess) {
        result = await rmaService.update(
          selectedAccess.CompanyID,
          selectedAccess.BranchID,
          id,
          input
        );
        toast.success("RMA actualizado correctamente");
        setErrors((prev) => ({ ...prev, update: null }));
      } else {
        result = await rmaService.create(input);
        toast.success("RMA creado correctamente");
        setErrors((prev) => ({ ...prev, create: null }));
        navigate(`${BASE_ROUTE}/${result.RmaID}`);
      }

      setData(result);
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error("Error al guardar el RMA");

      if (isEditing) {
        setErrors((prev) => ({ ...prev, update: errorObj }));
      } else {
        setErrors((prev) => ({ ...prev, create: errorObj }));
      }

      toast.error(errorObj.message);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    data,
    isEditing,
    isLoading,
    isSaving,
    errors,
    handleSubmit,
  };
}
