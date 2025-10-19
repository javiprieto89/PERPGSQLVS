import { useEffect, useState } from "react";

import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  purchaseInvoiceDetailService,
  type PurchaseInvoiceDetail,
  type PurchaseInvoiceDetailInput,
} from "~/services/purchase-invoice-detail.service";
import { AuthHelper } from "~/utils/authHelper";

type PurchaseInvoiceDetailFormProps = {
  detail?: PurchaseInvoiceDetail | null;
  onClose?: () => void;
  onSave?: (detail: PurchaseInvoiceDetail) => void;
};

export function PurchaseInvoiceDetailForm({
  detail: initialDetail = null,
  onClose,
  onSave,
}: PurchaseInvoiceDetailFormProps) {
  const selectedAccess = AuthHelper.getSelectedAccess();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formState, setFormState] = useState<PurchaseInvoiceDetailInput>({
    CompanyID: selectedAccess?.CompanyID ?? 0,
    BranchID: selectedAccess?.BranchID ?? 0,
    PurchaseInvoiceID: 0,
    ItemID: 0,
    WarehouseID: 0,
    Quantity: 1,
    UnitPrice: 0,
    Notes: "",
  });

  useEffect(() => {
    if (initialDetail) {
      setIsEdit(true);
      setFormState({
        CompanyID: initialDetail.CompanyID,
        BranchID: initialDetail.BranchID,
        PurchaseInvoiceID: initialDetail.PurchaseInvoiceID,
        ItemID: initialDetail.ItemID,
        WarehouseID: initialDetail.WarehouseID,
        Quantity: initialDetail.Quantity,
        UnitPrice: initialDetail.UnitPrice,
        Notes: initialDetail.Notes ?? "",
      });
    }
  }, [initialDetail]);

  const handleChange = <K extends keyof PurchaseInvoiceDetailInput>(
    key: K,
    value: PurchaseInvoiceDetailInput[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: PurchaseInvoiceDetailInput = {
        ...formState,
        CompanyID: Number(formState.CompanyID),
        BranchID: Number(formState.BranchID),
        PurchaseInvoiceID: Number(formState.PurchaseInvoiceID),
        ItemID: Number(formState.ItemID),
        WarehouseID: Number(formState.WarehouseID),
        Quantity: Number(formState.Quantity),
        UnitPrice: Number(formState.UnitPrice),
        Notes: formState.Notes?.trim() || undefined,
      };

      let saved: PurchaseInvoiceDetail;
      if (isEdit && initialDetail) {
        saved = await purchaseInvoiceDetailService.update(
          initialDetail.CompanyID,
          initialDetail.BranchID,
          initialDetail.PurchaseInvoiceID,
          initialDetail.PurchaseInvoiceDetailID,
          payload
        );
      } else {
        saved = await purchaseInvoiceDetailService.create(payload);
      }

      onSave?.(saved);
      onClose?.();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar el detalle de orden de compra.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-[600px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar detalle de orden de compra" : "Agregar detalle de orden de compra"}
      </h2>

      {loading && <AlertLoading />}
      {error && (
        <div className="text-destructive text-sm mb-4 font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormBlock>
          <Input
            label="ID de empresa"
            type="number"
            min={0}
            value={formState.CompanyID}
            onChange={(event) =>
              handleChange("CompanyID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="ID de sucursal"
            type="number"
            min={0}
            value={formState.BranchID}
            onChange={(event) =>
              handleChange("BranchID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Orden de compra"
            type="number"
            min={0}
            value={formState.PurchaseInvoiceID}
            onChange={(event) =>
              handleChange("PurchaseInvoiceID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Ítem"
            type="number"
            min={0}
            value={formState.ItemID}
            onChange={(event) =>
              handleChange("ItemID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Depósito"
            type="number"
            min={0}
            value={formState.WarehouseID}
            onChange={(event) =>
              handleChange("WarehouseID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Cantidad"
            type="number"
            min={0}
            step="0.01"
            value={formState.Quantity}
            onChange={(event) =>
              handleChange("Quantity", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Precio unitario"
            type="number"
            min={0}
            step="0.01"
            value={formState.UnitPrice}
            onChange={(event) =>
              handleChange("UnitPrice", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Textarea
            value={formState.Notes ?? ""}
            onChange={(event) => handleChange("Notes", event.target.value)}
            placeholder="Notas"
            className="min-h-[96px]"
          />
        </FormBlock>

        <ErrorMessage error={null} />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              loading ||
              !formState.CompanyID ||
              !formState.BranchID ||
              !formState.PurchaseInvoiceID ||
              !formState.ItemID ||
              !formState.WarehouseID
            }
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PurchaseInvoiceDetailForm;
