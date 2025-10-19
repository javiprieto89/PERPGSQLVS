import { useEffect, useState } from "react";

import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  rmaDetailService,
  type RmaDetailInput,
  type RmaDetailRecord,
} from "~/services/rma-detail.service";
import { AuthHelper } from "~/utils/authHelper";

type RmaDetailFormProps = {
  detail?: RmaDetailRecord | null;
  onClose?: () => void;
  onSave?: (detail: RmaDetailRecord) => void;
};

export function RmaDetailForm({
  detail: initialDetail = null,
  onClose,
  onSave,
}: RmaDetailFormProps) {
  const selectedAccess = AuthHelper.getSelectedAccess();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formState, setFormState] = useState<RmaDetailInput>({
    CompanyID: selectedAccess?.CompanyID ?? 0,
    BranchID: selectedAccess?.BranchID ?? 0,
    RmaID: 0,
    ItemID: 0,
    WarehouseID: 0,
    Quantity: 1,
    UnitPrice: 0,
    LineDescription: "",
  });

  useEffect(() => {
    if (initialDetail) {
      setIsEdit(true);
      setFormState({
        CompanyID: initialDetail.CompanyID,
        BranchID: initialDetail.BranchID,
        RmaID: initialDetail.RmaID,
        ItemID: initialDetail.ItemID,
        WarehouseID: initialDetail.WarehouseID,
        Quantity: initialDetail.Quantity,
        UnitPrice: initialDetail.UnitPrice,
        LineDescription: initialDetail.LineDescription ?? "",
      });
    }
  }, [initialDetail]);

  const handleChange = <K extends keyof RmaDetailInput>(
    key: K,
    value: RmaDetailInput[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: RmaDetailInput = {
        ...formState,
        CompanyID: Number(formState.CompanyID),
        BranchID: Number(formState.BranchID),
        RmaID: Number(formState.RmaID),
        ItemID: Number(formState.ItemID),
        WarehouseID: Number(formState.WarehouseID),
        Quantity: Number(formState.Quantity),
        UnitPrice: Number(formState.UnitPrice),
        LineDescription: formState.LineDescription?.trim() || undefined,
      };

      let saved: RmaDetailRecord;
      if (isEdit && initialDetail) {
        saved = await rmaDetailService.update(
          initialDetail.CompanyID,
          initialDetail.BranchID,
          initialDetail.RmaID,
          initialDetail.RmaDetailID,
          payload
        );
      } else {
        saved = await rmaDetailService.create(payload);
      }

      onSave?.(saved);
      onClose?.();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar el detalle de RMA.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-[600px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar detalle RMA" : "Agregar detalle RMA"}
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
            label="RMA"
            type="number"
            min={0}
            value={formState.RmaID}
            onChange={(event) =>
              handleChange("RmaID", Number(event.target.value))
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
            value={formState.LineDescription ?? ""}
            onChange={(event) =>
              handleChange("LineDescription", event.target.value)
            }
            placeholder="Descripción de línea"
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
              !formState.RmaID ||
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

export default RmaDetailForm;
