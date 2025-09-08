import z from "zod";

export const numberSchema = z
  .string()
  .transform((val: string) => parseInt(val, 10));

export const toNumber = (msg = "Debe ser un número") =>
  z.preprocess((val) => Number(val), z.number({ message: msg }).int());

export const stringToNumber = z
  .string()
  .min(5, "Debe tener al menos 5 dígitos")
  .max(10, "Debe tener como máximo 10 dígitos")
  .regex(/^\d+$/, "Solo se permiten números")
  .transform((val) => Number(val));

export const toBoolean = () =>
  z.preprocess((val) => val === "true" || val === true, z.boolean());

export const toBoolean2 = () =>
  z.enum(["true", "false"]).transform((val) => val === "true");

const MAX_FILE_SIZE = 1024 * 1024 * 2;

export const fileSchema = z
  .any()
  .refine((file) => file.size === 0 || file instanceof File, "Invalid file")
  .transform((file) => file as File);

export const imageSchema = fileSchema
  .refine((file: File) => file.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
  .refine(
    (files) => (files.size > 0 ? files.type.startsWith("image/") : true),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );
