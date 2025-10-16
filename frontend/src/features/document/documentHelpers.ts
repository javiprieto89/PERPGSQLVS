import { z } from "zod/v4";
import type {
  CommercialDocumentsCreate,
  CommercialDocumentsInDb,
  CommercialDocumentsUpdate,
  GetDocumentByIdQuery,
} from "~/graphql/_generated/graphql";

export const formSchema = z.object({
  DocumentID: z.number().optional(),
  CompanyID: z.string().min(1, "La compañía es obligatoria"),
  BranchID: z.string().min(1, "La sucursal es obligatoria"),
  DocumentTypeID: z.string().min(1, "El tipo de documento es obligatorio"),
  DocumentDescription: z.string().min(1, "La descripción es obligatoria"),
  DocumentNumber: z.number().min(0, "El número debe ser mayor o igual a 0"),
  PointOfSale: z
    .number()
    .min(0, "El punto de venta debe ser mayor o igual a 0"),
  IsActive: z.boolean(),
  IsTest: z.boolean(),
  ShouldAccount: z.boolean(),
  AffectsStock: z.boolean(),
  IsFiscal: z.boolean().optional(),
  IsElectronic: z.boolean().optional(),
  IsManual: z.boolean().optional(),
  IsQuotation: z.boolean().optional(),
  MaxItems: z.number().nullable().optional(),
  CurrencyID: z.number().nullable().optional(),
  FromDate: z.string().nullable().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const documentHelpers = {
  // Preparar datos para crear/actualizar documento
  prepareData(
    formData: Record<string, any>
  ): CommercialDocumentsUpdate | CommercialDocumentsCreate {
    return {
      CompanyID: Number(formData.CompanyID),
      BranchID: Number(formData.BranchID),
      DocumentTypeID: Number(formData.DocumentTypeID),
      DocumentDescription: String(formData.DocumentDescription)?.trim() || "",
      DocumentNumber: Number(formData.DocumentNumber) || 0,
      PointOfSale: Number(formData.PointOfSale) || 0,
      IsActive: Boolean(formData.IsActive),
      IsTest: Boolean(formData.IsTest),
      ShouldAccount: Boolean(formData.ShouldAccount),
      AffectsStock: Boolean(formData.AffectsStock),
      IsFiscal:
        formData.IsFiscal !== undefined
          ? Boolean(formData.IsFiscal)
          : undefined,
      IsElectronic:
        formData.IsElectronic !== undefined
          ? Boolean(formData.IsElectronic)
          : undefined,
      IsManual:
        formData.IsManual !== undefined
          ? Boolean(formData.IsManual)
          : undefined,
      IsQuotation:
        formData.IsQuotation !== undefined
          ? Boolean(formData.IsQuotation)
          : undefined,
      MaxItems: formData.MaxItems ? Number(formData.MaxItems) : null,
      CurrencyID: formData.CurrencyID ? Number(formData.CurrencyID) : null,
      FromDate: formData.FromDate ? String(formData.FromDate) : null,
    };
  },

  prepareDataFormSchema(data?: GetDocumentByIdQuery): FormSchema | undefined {
    if (!data?.commercialdocumentsById) return undefined;

    // TODO the type CommercialDocumentsInDb is hardcoded, need to review with backend team
    const d = data.commercialdocumentsById as CommercialDocumentsInDb & {
      CurrencyID: number;
      FromDate: number;
    };

    return {
      DocumentID: d.DocumentID,
      CompanyID: String(d.CompanyID || ""),
      BranchID: String(d.BranchID || ""),
      DocumentTypeID: String(d.DocumentTypeID || ""),
      DocumentDescription: d.DocumentDescription || "",
      DocumentNumber: d.DocumentNumber || 0,
      PointOfSale: d.PointOfSale || 0,
      IsActive: d.IsActive || false,
      IsTest: d.IsTest || false,
      ShouldAccount: d.ShouldAccount || false,
      AffectsStock: d.AffectsStock || false,
      IsFiscal: d.IsFiscal || false,
      IsElectronic: d.IsElectronic || false,
      IsManual: d.IsManual || false,
      IsQuotation: d.IsQuotation || false,
      MaxItems: d.MaxItems || null,
      CurrencyID: d.CurrencyID || null,
      FromDate: d.FromDate || null,
    };
  },
};
