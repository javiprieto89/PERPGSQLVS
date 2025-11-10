import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import {
  rmaDetailService,
  type RmaDetailInput,
  type RmaDetailRecord,
} from "~/services/rma-detail.service";
import { AuthStorage } from "~/utils/auth.storage";
import { rmaDetailHelpers } from "./rmaDetailHelpers";

export const BASE_ROUTE = "/rma-detail";

const rmaDetailFormSchema = z.object({
  CompanyID: z.number().min(1, "La empresa es requerida"),
  BranchID: z.number().min(1, "La sucursal es requerida"),
  RmaID: z.number().min(1, "El RMA es requerido"),
  ItemID: z.number().min(1, "El item es requerido"),
  WarehouseID: z.number().min(1, "El almacén es requerido"),
  Quantity: z.number().min(0.01, "La cantidad debe ser mayor a 0"),
  UnitPrice: z.number().min(0, "El precio unitario no puede ser negativo"),
  LineDescription: z.string().optional(),
});

type RmaDetailFormData = z.infer<typeof rmaDetailFormSchema>;

interface UseRmaDetailFormProps {
  id?: number;
}

export function useRmaDetailForm({ id }: UseRmaDetailFormProps) {
  const navigate = useNavigate();
  const selectedAccess = AuthStorage.getSelectedAccess();
  const isEditing = Boolean(id);

  const [data, setData] = useState<RmaDetailRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({
    query: null as Error | null,
    create: null as Error | null,
    update: null as Error | null,
  });

  const form = useForm<RmaDetailFormData>({
    resolver: zodResolver(rmaDetailFormSchema),
    defaultValues: {
      CompanyID: selectedAccess?.CompanyID ?? 0,
      BranchID: selectedAccess?.BranchID ?? 0,
      RmaID: 0,
      ItemID: 0,
      WarehouseID: 0,
      Quantity: 1,
      UnitPrice: 0,
      LineDescription: "",
    },
  });

  // Load data for editing
  useEffect(() => {
    if (isEditing && id && selectedAccess) {
      // Para editar necesitamos RmaID además del RmaDetailID
      // Asumimos que el RmaID se pasará en la URL o parámetros
      // Por ahora vamos a usar un placeholder
      loadRmaDetail(selectedAccess.CompanyID, selectedAccess.BranchID, 1, id);
    }
  }, [isEditing, id, selectedAccess]);

  const loadRmaDetail = async (
    companyID: number,
    branchID: number,
    rmaID: number,
    rmaDetailID: number
  ) => {
    try {
      setIsLoading(true);
      setErrors({ query: null, create: null, update: null });

      const rmaDetail = await rmaDetailService.getById(
        companyID,
        branchID,
        rmaID,
        rmaDetailID
      );

      if (rmaDetail) {
        setData(rmaDetail);
        const formData = rmaDetailHelpers.rmaDetailToFormData(rmaDetail);

        Object.entries(formData).forEach(([key, value]) => {
          form.setValue(key as keyof RmaDetailFormData, value as any);
        });
      }
    } catch (error) {
      const errorObj =
        error instanceof Error
          ? error
          : new Error("Error al cargar el detalle de RMA");
      setErrors((prev) => ({ ...prev, query: errorObj }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: RmaDetailFormData) => {
    try {
      setIsSaving(true);
      setErrors({ query: null, create: null, update: null });

      const input: RmaDetailInput = {
        ...formData,
        LineDescription: formData.LineDescription || "",
      };

      let result: RmaDetailRecord;

      if (isEditing && id && selectedAccess && data) {
        result = await rmaDetailService.update(
          selectedAccess.CompanyID,
          selectedAccess.BranchID,
          data.RmaID,
          id,
          input
        );
        toast.success("Detalle de RMA actualizado correctamente");
        setErrors((prev) => ({ ...prev, update: null }));
      } else {
        result = await rmaDetailService.create(input);
        toast.success("Detalle de RMA creado correctamente");
        setErrors((prev) => ({ ...prev, create: null }));
        navigate(`${BASE_ROUTE}/${result.RmaDetailID}`);
      }

      setData(result);
    } catch (error) {
      const errorObj =
        error instanceof Error
          ? error
          : new Error("Error al guardar el detalle de RMA");

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
