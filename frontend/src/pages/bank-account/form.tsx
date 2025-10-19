import { useEffect, useMemo, useState } from "react";

import { ErrorMessage } from "~/components/form/ErrorMessage";
import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { bankAccountService, type BankAccount, type BankAccountInput } from "~/services/bank-account.service";
import { bankService, type Bank } from "~/services/bank.service";
import { AuthHelper } from "~/utils/authHelper";

type BankAccountFormProps = {
  account?: BankAccount | null;
  onClose?: () => void;
  onSave?: (account: BankAccount) => void;
};

const booleanToChecked = (value?: boolean) => Boolean(value);

export function BankAccountForm({
  account: initialAccount = null,
  onClose,
  onSave,
}: BankAccountFormProps) {
  const selectedAccess = AuthHelper.getSelectedAccess();

  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formState, setFormState] = useState<BankAccountInput>({
    CompanyID: selectedAccess?.CompanyID ?? 0,
    BankID: 0,
    AccountNumber: "",
    CurrencyID: 0,
    Alias: "",
    IsActive: true,
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
    if (initialAccount) {
      setIsEdit(true);
      setFormState({
        CompanyID: initialAccount.CompanyID,
        BankID: initialAccount.BankID,
        AccountNumber: initialAccount.AccountNumber,
        CurrencyID: initialAccount.CurrencyID,
        Alias: initialAccount.Alias ?? "",
        IsActive: initialAccount.IsActive,
      });
    } else if (selectedAccess?.CompanyID) {
      setFormState((prev) => ({
        ...prev,
        CompanyID: selectedAccess.CompanyID,
      }));
    }
  }, [initialAccount, selectedAccess?.CompanyID]);

  const companyDisabled = useMemo(
    () => Boolean(initialAccount) || Boolean(selectedAccess?.CompanyID),
    [initialAccount, selectedAccess?.CompanyID]
  );

  const handleChange = <K extends keyof BankAccountInput>(key: K, value: BankAccountInput[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: BankAccountInput = {
        ...formState,
        CompanyID: Number(formState.CompanyID),
        BankID: Number(formState.BankID),
        CurrencyID: Number(formState.CurrencyID),
        AccountNumber: formState.AccountNumber.trim(),
        Alias: formState.Alias?.trim() || undefined,
        IsActive: booleanToChecked(formState.IsActive),
      };

      let saved: BankAccount;
      if (isEdit && initialAccount) {
        saved = await bankAccountService.update(
          initialAccount.BankAccountID,
          payload,
          initialAccount.CompanyID
        );
      } else {
        saved = await bankAccountService.create(payload);
      }

      onSave?.(saved);
      onClose?.();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo guardar la cuenta bancaria.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-[520px] max-w-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Editar cuenta bancaria" : "Nueva cuenta bancaria"}
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
            disabled={companyDisabled}
            onChange={(event) =>
              handleChange("CompanyID", Number(event.target.value))
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

        <FormBlock>
          <Input
            label="Número de cuenta"
            value={formState.AccountNumber}
            onChange={(event) => handleChange("AccountNumber", event.target.value)}
            required
            placeholder="Número de cuenta"
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
          <Input
            label="Alias"
            value={formState.Alias ?? ""}
            onChange={(event) => handleChange("Alias", event.target.value)}
            placeholder="Alias (opcional)"
          />
        </FormBlock>

        <FormBlock variant="inline" className="items-center gap-3">
          <Checkbox
            id="bank-account-active"
            checked={booleanToChecked(formState.IsActive)}
            onCheckedChange={(checked) =>
              handleChange("IsActive", Boolean(checked))
            }
          />
          <label htmlFor="bank-account-active" className="text-sm font-medium">
            Cuenta activa
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
              !formState.BankID ||
              !formState.AccountNumber.trim() ||
              !formState.CurrencyID
            }
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BankAccountForm;

