import { z } from "zod/v4";
import type { CheckRecord } from "~/services/check.service";

const today = new Date().toISOString().slice(0, 10);

export const formSchema = z.object({
  CheckID: z.number().optional(),
  CompanyID: z.number().min(1, "La compañía es obligatoria"),
  Number: z.string().min(1, "El número de cheque es obligatorio").max(50),
  CurrencyID: z.number().min(1, "La moneda es obligatoria"),
  Amount: z.number().min(0, "El monto debe ser mayor o igual a 0"),
  IssueDate: z.string().min(1, "La fecha de emisión es obligatoria"),
  DueDate: z.string().nullable().optional(),
  BankID: z.number().nullable().optional(),
  DrawerName: z.string().max(100).nullable().optional(),
  HolderName: z.string().max(100).nullable().optional(),
  CheckStatusID: z.number().nullable().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const checkHelpers = {
  // Preparar datos para el formulario
  prepareDataFormSchema(check: CheckRecord): FormSchema {
    return {
      CheckID: check.CheckID,
      CompanyID: check.CompanyID,
      Number: check.Number || "",
      CurrencyID: check.CurrencyID,
      Amount: check.Amount || 0,
      IssueDate: check.IssueDate?.slice(0, 10) || today,
      DueDate: check.DueDate?.slice(0, 10) || "",
      BankID: check.BankID || null,
      DrawerName: check.DrawerName || "",
      HolderName: check.HolderName || "",
      CheckStatusID: check.CheckStatusID || null,
    };
  },

  // Preparar datos para envío al service
  prepareData(formData: FormSchema) {
    return {
      CompanyID: formData.CompanyID,
      Number: formData.Number.trim(),
      CurrencyID: formData.CurrencyID,
      Amount: formData.Amount,
      IssueDate: formData.IssueDate,
      DueDate: formData.DueDate?.trim() || null,
      BankID: formData.BankID || null,
      DrawerName: formData.DrawerName?.trim() || null,
      HolderName: formData.HolderName?.trim() || null,
      CheckStatusID: formData.CheckStatusID || null,
    };
  },

  // Validar datos de cheque antes de enviar
  validateData(checkData: Partial<CheckRecord>) {
    const errors = [];

    if (!checkData.Number?.trim()) {
      errors.push("El número de cheque es obligatorio");
    }

    if (!checkData.CompanyID) {
      errors.push("La compañía es obligatoria");
    }

    if (!checkData.CurrencyID) {
      errors.push("La moneda es obligatoria");
    }

    if (checkData.Amount === undefined || checkData.Amount < 0) {
      errors.push("El monto debe ser mayor o igual a 0");
    }

    if (!checkData.IssueDate) {
      errors.push("La fecha de emisión es obligatoria");
    }

    return errors;
  },
};