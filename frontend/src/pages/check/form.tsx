import { useEffect, useState } from "react";

import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { bankService, type Bank } from "~/services/bank.service";
import { AuthHelper } from "~/utils/authHelper";
import {
  checkService,
  type CheckRecord,
  type CheckInput,
} from "~/services/check.service";

const today = new Date().toISOString().slice(0, 10);

type CheckFormProps = {
  check?: CheckRecord | null;
  onClose?: () => void;
  onSave?: (check: CheckRecord) => void;
};

export function CheckForm({
  check: initialCheck = null,
  onClose,
  onSave,
}: CheckFormProps) {
  const selectedAccess = AuthHelper.getSelectedAccess();

  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formState, setFormState] = useState<CheckInput>({
    CompanyID: selectedAccess?.CompanyID ?? 0,
    Number: "",
    CurrencyID: 0,
    Amount: 0,
    IssueDate: today,
    DueDate: today,
    BankID: undefined,
    DrawerName: "",
    HolderName: "",
    CheckStatusID: undefined,
  });

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const list = await bankService.getAll();
        setBanks(list);
      } catch (err) {
        console.error("Error cargando bancos:", err);
      }
    };

    loadBanks().catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (initialCheck) {
      setIsEdit(true);
      setFormState({
        CompanyID: initialCheck.CompanyID,
        Number: initialCheck.Number,
        CurrencyID: initialCheck.CurrencyID,
        Amount: initialCheck.Amount,
        IssueDate: initialCheck.IssueDate?.slice(0, 10) ?? today,
        DueDate: initialCheck.DueDate?.slice(0, 10) ?? undefined,
        BankID: initialCheck.BankID ?? undefined,
        DrawerName: initialCheck.DrawerName ?? "",
        HolderName: initialCheck.HolderName ?? "",
        CheckStatusID: initialCheck.CheckStatusID ?? undefined,
      });
    } else if (selectedAccess?.CompanyID) {
      setFormState((prev) => ({
        ...prev,
        CompanyID: selectedAccess.CompanyID,
      }));
    }
  }, [initialCheck, selectedAccess?.CompanyID]);

  const handleChange = <K extends keyof CheckInput>(
    key: K,
    value: CheckInput[K]
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: CheckInput = {
        ...formState,
        CompanyID: Number(formState.CompanyID),
        CurrencyID: Number(formState.CurrencyID),
        Amount: Number(formState.Amount),
        BankID: formState.BankID ? Number(formState.BankID) : undefined,
        CheckStatusID: formState.CheckStatusID
          ? Number(formState.CheckStatusID)
          : undefined,
        IssueDate: formState.IssueDate,
        DueDate: formState.DueDate || undefined,
        DrawerName: formState.DrawerName?.trim() || undefined,
        HolderName: formState.HolderName?.trim() || undefined,
        Number: formState.Number.trim(),
      };

      let saved: CheckRecord;
      if (isEdit && initialCheck) {
        saved = await checkService.update(
          initialCheck.CheckID,
          payload,
          initialCheck.CompanyID
        );
      } else {
        saved = await checkService.create(payload);
      }

      onSave?.(saved);
      onClose?.();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar el cheque.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-[640px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar cheque" : "Nuevo cheque"}
      </h2>

      {loading && <AlertLoading />}
      {error && (
        <div className="text-destructive text-sm mb-4 font-medium">
          {error}
        </div>
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
            label="Número"
            value={formState.Number}
            onChange={(event) => handleChange("Number", event.target.value)}
            required
            placeholder="Número del cheque"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Importe"
            type="number"
            step="0.01"
            value={formState.Amount}
            onChange={(event) => handleChange("Amount", Number(event.target.value))}
            required
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="ID de moneda"
            type="number"
            min={0}
            value={formState.CurrencyID}
            onChange={(event) =>
              handleChange("CurrencyID", Number(event.target.value))
            }
            required
          />
        </FormBlock>

        <FormBlock>
          <label className="text-sm font-medium">Banco</label>
          <Select
            value={formState.BankID ? String(formState.BankID) : ""}
            onValueChange={(value) => handleChange("BankID", Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un banco" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.BankID} value={String(bank.BankID)}>
                  {bank.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormBlock>

        <FormBlock variant="inline" className="items-center gap-3">
          <Input
            label="Fecha emisión"
            type="date"
            value={formState.IssueDate}
            onChange={(event) => handleChange("IssueDate", event.target.value)}
            required
          />
          <Input
            label="Fecha vencimiento"
            type="date"
            value={formState.DueDate ?? ""}
            onChange={(event) =>
              handleChange("DueDate", event.target.value || undefined)
            }
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Titular"
            value={formState.HolderName ?? ""}
            onChange={(event) => handleChange("HolderName", event.target.value)}
            placeholder="Nombre del titular"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Librador"
            value={formState.DrawerName ?? ""}
            onChange={(event) => handleChange("DrawerName", event.target.value)}
            placeholder="Nombre del librador"
          />
        </FormBlock>

        <FormBlock>
          <Input
            label="Estado (ID)"
            type="number"
            min={0}
            value={formState.CheckStatusID ?? ""}
            onChange={(event) =>
              handleChange(
                "CheckStatusID",
                event.target.value ? Number(event.target.value) : undefined
              )
            }
            placeholder="ID de estado"
          />
        </FormBlock>

        <FormBlock variant="inline" className="items-center gap-3">
          <Checkbox id="check-active-indicator" checked disabled />
          <label
            htmlFor="check-active-indicator"
            className="text-sm text-muted-foreground"
          >
            El estado activo depende del ID de estado configurado
          </label>
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
              !formState.Number.trim() ||
              !formState.CurrencyID ||
              !formState.Amount
            }
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CheckForm;

