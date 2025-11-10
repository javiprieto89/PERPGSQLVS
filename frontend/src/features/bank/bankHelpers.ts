import { z } from "zod/v4";
import type { Bank } from "~/services/bank.service";

export const formSchema = z.object({
  BankID: z.number().optional(),
  Name: z.string().min(1, "El nombre es obligatorio").max(100),
  IsActive: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const bankHelpers = {
  // Preparar datos para el formulario
  prepareDataFormSchema(bank: Bank): FormSchema {
    return {
      BankID: bank.BankID,
      Name: bank.Name || "",
      IsActive: bank.IsActive ?? true,
    };
  },

  // Preparar datos para envío al service
  prepareData(formData: FormSchema) {
    return {
      Name: formData.Name.trim(),
      IsActive: formData.IsActive,
    };
  },

  // Validar datos de banco antes de enviar
  validateData(bankData: Partial<Bank>) {
    const errors = [];

    if (!bankData.Name?.trim()) {
      errors.push("El nombre es obligatorio");
    }

    return errors;
  },
};
