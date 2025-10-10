import z, { type ZodError } from "zod";

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

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be at most 20 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  });

export const documentIdentitySchema = z.coerce
  .number()
  .int()
  .refine((val) => val.toString().length >= 8 && val.toString().length <= 11, {
    message: "El DNI o CUIT debe tener entre 8 y 11 dígitos",
  })
  .refine(
    (val) => val.toString().length === 8 || val.toString().length === 11,
    {
      message: "El formato no es correcto",
    }
  ) as z.ZodType<number, number>;

// .regex(/[0-9]/, { message: "Password must contain at least one number" })
// .regex(/[!@#$%^&*]/, { message: "Password must contain at least one special character" }),

type FieldErrors<T> = { [K in keyof T]?: string[] };

export function validateFieldsInAction<
  FormSchema extends Record<string, any>
>(result: { error: ZodError<FormSchema> }) {
  const validation: FieldErrors<FormSchema> = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof FormSchema;
    (validation[field] ??= []).push(issue.message);
  }

  return validation;
}

export function errorsFromActions<T extends Record<string, any>>(
  validation?: FieldErrors<T>
) {
  function getError<K extends keyof T>(name: K): string | undefined {
    return validation?.[name]?.join(". ");
  }

  return { getError };
}
