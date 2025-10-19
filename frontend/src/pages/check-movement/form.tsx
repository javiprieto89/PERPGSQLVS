import { useEffect, useState } from "react";

import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { AuthHelper } from "~/utils/authHelper";
import {
  checkMovementService,
  type CheckMovement,
  type CheckMovementInput,
} from "~/services/check-movement.service";

const today = new Date().toISOString().slice(0, 10);

type CheckMovementFormProps = {
  movement?: CheckMovement | null;
  onClose?: () => void;
  onSave?: (movement: CheckMovement) => void;
};

export function CheckMovementForm({
  movement: initialMovement = null,
  onClose,
  onSave,
}: CheckMovementFormProps) {
  const selectedAccess = AuthHelper.getSelectedAccess();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formState, setFormState] = useState<CheckMovementInput>({
    CompanyID: selectedAccess?.CompanyID ?? 0,
    CheckID: 0,
    EventDate: today,
    EventType: "",
    BankAccountID: undefined,
    BranchID: selectedAccess?.BranchID ?? undefined,
    TransactionID: undefined,
    Notes: "",
  });

  useEffect(() => {
    if (initialMovement) {
      setIsEdit(true);
      setFormState({
        CompanyID: initialMovement.CompanyID,
        CheckID: initialMovement.CheckID,
        EventDate: initialMovement.EventDate?.slice(0, 10) ?? today,
        EventType: initialMovement.EventType,
        BankAccountID: initialMovement.BankAccountID ?? undefined,
        BranchID: initialMovement.BranchID ?? undefined,
        TransactionID: initialMovement.TransactionID ?? undefined,
        Notes: initialMovement.Notes ?? "",
      });
    }
  }, [initialMovement]);

  const handleChange = <K extends keyof CheckMovementInput>(
    key: K,
    value: CheckMovementInput[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: CheckMovementInput = {
        ...formState,
        CompanyID: Number(formState.CompanyID),
        CheckID: Number(formState.CheckID),
        EventDate: formState.EventDate,
        EventType: formState.EventType.trim(),
        BankAccountID: formState.BankAccountID
          ? Number(formState.BankAccountID)
          : undefined,
        BranchID: formState.BranchID ? Number(formState.BranchID) : undefined,
        TransactionID: formState.TransactionID
          ? Number(formState.TransactionID)
          : undefined,
        Notes: formState.Notes?.trim() || undefined,
      };

      let saved: CheckMovement;
      if (isEdit && initialMovement) {
        saved = await checkMovementService.update(
          initialMovement.CheckMovementID,
          payload,
          initialMovement.CompanyID
        );
      } else {
        saved = await checkMovementService.create(payload);
      }

      onSave?.(saved);
      onClose?.();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar el movimiento de cheque.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-[620px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar movimiento de cheque" : "Nuevo movimiento de cheque"}
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
            label="ID de cheque"
            type="number"
            min={0}
            value={formState.CheckID}
            onChange={(event) =>
              handleChange("CheckID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Fecha del evento"
            type="date"
            value={formState.EventDate}
            onChange={(event) => handleChange("EventDate", event.target.value)}
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Tipo de evento"
            value={formState.EventType}
            onChange={(event) => handleChange("EventType", event.target.value)}
            required
            placeholder="Depositado, Acreditado, Rechazado, etc."
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="ID de cuenta bancaria"
            type="number"
            min={0}
            value={formState.BankAccountID ?? ""}
            onChange={(event) =>
              handleChange(
                "BankAccountID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Cuenta relacionada"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="ID de sucursal"
            type="number"
            min={0}
            value={formState.BranchID ?? ""}
            onChange={(event) =>
              handleChange(
                "BranchID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Sucursal relacionada"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="ID de transacción"
            type="number"
            min={0}
            value={formState.TransactionID ?? ""}
            onChange={(event) =>
              handleChange(
                "TransactionID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="Transacción asociada"
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
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={
              loading ||
              !formState.CompanyID ||
              !formState.CheckID ||
              !formState.EventType.trim()
            }
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckMovementForm;

