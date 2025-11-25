import { z } from "zod/v4";
import type { BankAccount } from "~/services/bank-account.service";

export const formSchema = z.object({
  BankAccountID: z.number().optional(),
  CompanyID: z.number().min(1, "La compañía es obligatoria"),
  BankID: z.number().min(1, "El banco es obligatorio"),
  AccountNumber: z
    .string()
    .min(1, "El número de cuenta es obligatorio")
    .max(50),
  CurrencyID: z.number().min(1, "La moneda es obligatoria"),
  Alias: z.string().max(100).nullable().optional(),
  IsActive: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const bankAccountHelpers = {
  // Preparar datos para el formulario
  prepareDataFormSchema(account: BankAccount): FormSchema {
    return {
      BankAccountID: account.BankAccountID,
      CompanyID: account.CompanyID,
      BankID: account.BankID,
      AccountNumber: account.AccountNumber || "",
      CurrencyID: account.CurrencyID,
      Alias: account.Alias || "",
      IsActive: account.IsActive ?? true,
    };
  },

  // Preparar datos para envío al service
  prepareData(formData: FormSchema) {
    return {
      CompanyID: formData.CompanyID,
      BankID: formData.BankID,
      AccountNumber: formData.AccountNumber.trim(),
      CurrencyID: formData.CurrencyID,
      Alias: formData.Alias?.trim() || null,
      IsActive: formData.IsActive,
    };
  },

  // Validar datos de cuenta bancaria antes de enviar
  validateData(accountData: Partial<BankAccount>) {
    const errors = [];

    if (!accountData.AccountNumber?.trim()) {
      errors.push("El número de cuenta es obligatorio");
    }

    if (!accountData.BankID) {
      errors.push("El banco es obligatorio");
    }

    if (!accountData.CompanyID) {
      errors.push("La compañía es obligatoria");
    }

    if (!accountData.CurrencyID) {
      errors.push("La moneda es obligatoria");
    }

    return errors;
  },
};
