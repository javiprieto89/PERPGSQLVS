import { z } from "zod/v4";
import type { BankReconciliation } from "~/services/bank-reconciliation.service";

const today = new Date().toISOString().slice(0, 10);

export const formSchema = z.object({
  ReconciliationID: z.number().optional(),
  CompanyID: z.number().min(1, "La compañía es obligatoria"),
  BankAccountID: z.number().min(1, "La cuenta bancaria es obligatoria"),
  StatementDate: z.string().min(1, "La fecha es obligatoria"),
  ClosingBalance: z.number().min(0, "El saldo debe ser mayor o igual a 0"),
  Notes: z.string().max(500).nullable().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const bankReconciliationHelpers = {
  // Preparar datos para el formulario
  prepareDataFormSchema(reconciliation: BankReconciliation): FormSchema {
    return {
      ReconciliationID: reconciliation.ReconciliationID,
      CompanyID: reconciliation.CompanyID,
      BankAccountID: reconciliation.BankAccountID,
      StatementDate: reconciliation.StatementDate?.slice(0, 10) || today,
      ClosingBalance: reconciliation.ClosingBalance || 0,
      Notes: reconciliation.Notes || "",
    };
  },

  // Preparar datos para envío al service
  prepareData(formData: FormSchema) {
    return {
      CompanyID: formData.CompanyID,
      BankAccountID: formData.BankAccountID,
      StatementDate: formData.StatementDate,
      ClosingBalance: formData.ClosingBalance,
      Notes: formData.Notes?.trim() || null,
    };
  },

  // Validar datos de conciliación antes de enviar
  validateData(reconciliationData: Partial<BankReconciliation>) {
    const errors = [];

    if (!reconciliationData.StatementDate) {
      errors.push("La fecha es obligatoria");
    }

    if (!reconciliationData.BankAccountID) {
      errors.push("La cuenta bancaria es obligatoria");
    }

    if (!reconciliationData.CompanyID) {
      errors.push("La compañía es obligatoria");
    }

    if (reconciliationData.ClosingBalance === undefined || reconciliationData.ClosingBalance < 0) {
      errors.push("El saldo debe ser mayor o igual a 0");
    }

    return errors;
  },
};