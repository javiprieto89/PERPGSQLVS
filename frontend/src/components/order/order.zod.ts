import { z } from "zod/v4";

const numberSchema = z.string().transform((val: string) => parseInt(val, 10));

const toNumber = (msg = "Debe ser un número") =>
  z.preprocess((val) => Number(val), z.number({ message: msg }).int());

const toBoolean = () =>
  z.preprocess((val) => val === "true" || val === true, z.boolean());

export const orderSchema = z.object({
  orderId: z.number(),
  companyId: z.number("Company ID es requerido"),
  branchId: toNumber(), // default 1
  clientId: z.number("Debe seleccionar un cliente"),
  carId: z.number(),
  serviceTypeId: z.string(),
  date: z.string(), // date ISO string, validado por el front si querés
  isService: toBoolean().default(false),
  mileage: z.string(),
  nextServiceMileage: z.string(),
  notes: z.string(),
  saleConditionId: z.string({
    message: "Debe seleccionar una condición de venta",
  }),
  discountId: z.string({ message: "Debe seleccionar un descuento" }),
  subtotal: toNumber().default(0),
  total: toNumber().default(0),
  vat: toNumber().default(0),
  userId: toNumber().default(1),
  documentID: z.number().default(1),
  orderStatusId: z.string({ message: "Debe seleccionar un estado de orden" }),
  priceListId: z.string({ message: "Debe seleccionar una lista de precios" }),
  warehouseId: z.string({ message: "Debe seleccionar un depósito" }),
});

export const orderSchemaUpdate = orderSchema.extend({
  orderId: z.string(),
});

export type OrderFormData = z.infer<typeof orderSchema>;
export type ProductFormDataUpdate = z.infer<typeof orderSchemaUpdate>;
