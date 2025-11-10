import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import {
  purchaseInvoiceDetailService,
  type PurchaseInvoiceDetail,
  type PurchaseInvoiceDetailInput,
} from "~/services/purchase-invoice-detail.service";
import { AuthStorage } from "~/utils/auth.storage";

export const BASE_ROUTE = "/purchase-invoice-details";

// Zod schema for validation
const purchaseInvoiceDetailSchema = z.object({
  CompanyID: z.number().min(1, "Seleccione una empresa"),
  BranchID: z.number().min(1, "Seleccione una sucursal"),
  PurchaseInvoiceID: z.number().min(1, "Seleccione una factura de compra"),
  ItemID: z.number().min(1, "Seleccione un item"),
  WarehouseID: z.number().min(1, "Seleccione un almacén"),
  Quantity: z.number().min(1, "La cantidad debe ser mayor a 0"),
  UnitPrice: z.number().min(0, "El precio unitario debe ser mayor o igual a 0"),
  Notes: z.string().optional(),
});

type PurchaseInvoiceDetailFormData = z.infer<
  typeof purchaseInvoiceDetailSchema
>;

interface UsePurchaseInvoiceDetailFormProps {
  id?: number;
  onSave?: (detail: PurchaseInvoiceDetail) => void;
  onCancel?: () => void;
}

export function usePurchaseInvoiceDetailForm({
  id,
  onSave,
  onCancel,
}: UsePurchaseInvoiceDetailFormProps = {}) {
  const navigate = useNavigate();
  const selectedAccess = AuthStorage.getSelectedAccess();

  const isEditing = Boolean(id);

  const [data, setData] = useState<PurchaseInvoiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [queryError, setQueryError] = useState<Error | null>(null);
  const [saveError, setSaveError] = useState<Error | null>(null);

  // Form setup
  const form = useForm<PurchaseInvoiceDetailFormData>({
    resolver: zodResolver(purchaseInvoiceDetailSchema),
    defaultValues: {
      CompanyID: selectedAccess?.CompanyID || 0,
      BranchID: selectedAccess?.BranchID || 0,
      PurchaseInvoiceID: 0,
      ItemID: 0,
      WarehouseID: 0,
      Quantity: 1,
      UnitPrice: 0,
      Notes: "",
    },
  });

  // Load data when editing
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setQueryError(null);

    purchaseInvoiceDetailService
      .getById(
        selectedAccess?.CompanyID || 0,
        selectedAccess?.BranchID || 0,
        0, // PurchaseInvoiceID - will need to be provided or stored
        id
      )
      .then((detail) => {
        if (detail) {
          setData(detail);
          form.reset({
            CompanyID: detail.CompanyID,
            BranchID: detail.BranchID,
            PurchaseInvoiceID: detail.PurchaseInvoiceID,
            ItemID: detail.ItemID,
            WarehouseID: detail.WarehouseID,
            Quantity: detail.Quantity,
            UnitPrice: detail.UnitPrice,
            Notes: detail.Notes || "",
          });
        }
      })
      .catch((error) => {
        setQueryError(error);
        console.error("Error loading purchase invoice detail:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, form, selectedAccess?.CompanyID, selectedAccess?.BranchID]);

  // Handle form submission
  const handleSubmit = async (formData: PurchaseInvoiceDetailFormData) => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const payload: PurchaseInvoiceDetailInput = {
        CompanyID: formData.CompanyID,
        BranchID: formData.BranchID,
        PurchaseInvoiceID: formData.PurchaseInvoiceID,
        ItemID: formData.ItemID,
        WarehouseID: formData.WarehouseID,
        Quantity: formData.Quantity,
        UnitPrice: formData.UnitPrice,
        Notes: formData.Notes?.trim() || undefined,
      };

      let result: PurchaseInvoiceDetail;
      if (isEditing && id && data) {
        result = await purchaseInvoiceDetailService.update(
          data.CompanyID,
          data.BranchID,
          data.PurchaseInvoiceID,
          id,
          payload
        );
      } else {
        result = await purchaseInvoiceDetailService.create(payload);
      }

      toast.success(
        isEditing
          ? "Detalle de factura de compra actualizado exitosamente"
          : "Detalle de factura de compra creado exitosamente"
      );

      if (onSave) {
        onSave(result);
      } else {
        navigate(BASE_ROUTE);
      }
    } catch (error) {
      setSaveError(error as Error);
      console.error("Error saving purchase invoice detail:", error);
      toast.error(
        "Error al guardar el detalle de factura de compra. Contacte al administrador del sistema"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(BASE_ROUTE);
    }
  };

  // Error states
  const errors = {
    query: queryError,
    create: saveError,
    update: saveError,
  };

  return {
    form,
    handleSubmit,
    handleCancel,
    data,
    isEditing,
    isLoading,
    isSaving,
    errors,
  };
}
