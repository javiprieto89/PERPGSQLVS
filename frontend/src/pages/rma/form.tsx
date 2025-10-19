

import { useEffect, useState } from "react";

import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  rmaService,
  type RmaInput,
  type RmaRecord,
} from "~/services/rma.service";
import { AuthHelper } from "~/utils/authHelper";

const today = new Date().toISOString().slice(0, 10);

type RmaFormProps = {
  rma?: RmaRecord | null;
  onClose?: () => void;
  onSave?: (rma: RmaRecord) => void;
};

export function RmaForm({ rma: initialRma = null, onClose, onSave }: RmaFormProps) {
  const selectedAccess = AuthHelper.getSelectedAccess();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formState, setFormState] = useState<RmaInput>({
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
  });

  useEffect(() => {
    if (initialRma) {
      setIsEdit(true);
      setFormState({
        CompanyID: initialRma.CompanyID,
        BranchID: initialRma.BranchID,
        RmaTypeID: initialRma.RmaTypeID,
        WarehouseID: initialRma.WarehouseID,
        UserID: initialRma.UserID,
        StatusID: initialRma.StatusID,
        ClientID: initialRma.ClientID ?? undefined,
        SupplierID: initialRma.SupplierID ?? undefined,
        RelatedOrderID: initialRma.RelatedOrderID ?? undefined,
        RelatedPIID: initialRma.RelatedPIID ?? undefined,
        PriceListID: initialRma.PriceListID ?? undefined,
        DocumentID: initialRma.DocumentID ?? undefined,
        Notes: initialRma.Notes ?? "",
        Subtotal: initialRma.Subtotal ?? undefined,
        VatAmount: initialRma.VatAmount ?? undefined,
        Total: initialRma.Total ?? undefined,
      });
    }
  }, [initialRma]);

  const handleChange = <K extends keyof RmaInput>(key: K, value: RmaInput[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: RmaInput = {
        ...formState,
        CompanyID: Number(formState.CompanyID),
        BranchID: Number(formState.BranchID),
        RmaTypeID: Number(formState.RmaTypeID),
        WarehouseID: Number(formState.WarehouseID),
        UserID: Number(formState.UserID),
        StatusID: Number(formState.StatusID),
        ClientID: formState.ClientID ? Number(formState.ClientID) : undefined,
        SupplierID: formState.SupplierID ? Number(formState.SupplierID) : undefined,
        RelatedOrderID: formState.RelatedOrderID
          ? Number(formState.RelatedOrderID)
          : undefined,
        RelatedPIID: formState.RelatedPIID ? Number(formState.RelatedPIID) : undefined,
        PriceListID: formState.PriceListID ? Number(formState.PriceListID) : undefined,
        DocumentID: formState.DocumentID ? Number(formState.DocumentID) : undefined,
        Notes: formState.Notes?.trim() || undefined,
        Subtotal: formState.Subtotal != null ? Number(formState.Subtotal) : undefined,
        VatAmount: formState.VatAmount != null ? Number(formState.VatAmount) : undefined,
        Total: formState.Total != null ? Number(formState.Total) : undefined,
      };

      let saved: RmaRecord;
      if (isEdit && initialRma) {
        saved = await rmaService.update(
          initialRma.CompanyID,
          initialRma.BranchID,
          initialRma.RmaID,
          payload
        );
      } else {
        saved = await rmaService.create({
          ...payload,
          RmaDate: new Date().toISOString(),
        });
      }

      onSave?.(saved);
      onClose?.();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar la RMA.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-[720px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar RMA" : "Nueva RMA"}
      </h2>

      {loading && <AlertLoading />}
      {error && (
        <div className="text-destructive text-sm mb-4 font-medium">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
            label="Tipo de RMA"
            type="number"
            min={0}
            value={formState.RmaTypeID}
            onChange={(event) =>
              handleChange("RmaTypeID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Estado"
            type="number"
            min={0}
            value={formState.StatusID}
            onChange={(event) =>
              handleChange("StatusID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Almacén"
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
            label="Usuario"
            type="number"
            min={0}
            value={formState.UserID}
            onChange={(event) =>
              handleChange("UserID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Cliente"
            type="number"
            min={0}
            value={formState.ClientID ?? ""}
            onChange={(event) =>
              handleChange(
                "ClientID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Proveedor"
            type="number"
            min={0}
            value={formState.SupplierID ?? ""}
            onChange={(event) =>
              handleChange(
                "SupplierID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Orden relacionada"
            type="number"
            min={0}
            value={formState.RelatedOrderID ?? ""}
            onChange={(event) =>
              handleChange(
                "RelatedOrderID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Factura relacionada"
            type="number"
            min={0}
            value={formState.RelatedPIID ?? ""}
            onChange={(event) =>
              handleChange(
                "RelatedPIID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Lista de precios"
            type="number"
            min={0}
            value={formState.PriceListID ?? ""}
            onChange={(event) =>
              handleChange(
                "PriceListID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Documento"
            type="number"
            min={0}
            value={formState.DocumentID ?? ""}
            onChange={(event) =>
              handleChange(
                "DocumentID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Subtotal"
            type="number"
            step="0.01"
            value={formState.Subtotal ?? ""}
            onChange={(event) =>
              handleChange(
                "Subtotal",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="IVA"
            type="number"
            step="0.01"
            value={formState.VatAmount ?? ""}
            onChange={(event) =>
              handleChange(
                "VatAmount",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Total"
            type="number"
            step="0.01"
            value={formState.Total ?? ""}
            onChange={(event) =>
              handleChange(
                "Total",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Opcional"
          />
        </FormBlock>

        <div className="col-span-2">
          <FormBlock>
            <Textarea
              value={formState.Notes ?? ""}
              onChange={(event) => handleChange("Notes", event.target.value)}
              placeholder="Notas"
              className="min-h-[96px]"
            />
          </FormBlock>
        </div>

        <ErrorMessage error={null} />

        <div className="col-span-2 flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              loading ||
              !formState.CompanyID ||
              !formState.BranchID ||
              !formState.RmaTypeID ||
              !formState.WarehouseID ||
              !formState.UserID ||
              !formState.StatusID
            }
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RmaForm;
