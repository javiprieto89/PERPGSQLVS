import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod/v4";

import { useGetClientFormDataLazyQuery } from "~/graphql/_generated/graphql";

import { ErrorMessage } from "~/components/form/ErrorMessage";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { BranchCombo } from "~/features/branch/BranchCombo";
import { CompanyCombo } from "~/features/company/CompanyCombo";

const formSchema = z.object({
  ClientID: z.number(),
  Address: z.string().nullable(),
  BranchID: z.string(),
  City: z.string().min(2).max(100).nullable(),
  CompanyID: z.string(),
  CountryID: z.string(),
  DocNumber: z.coerce.number().int()
    .refine((val) => val.toString().length >= 8 && val.toString().length <= 11, {
      message: "El DNI o CUIT debe tener entre 8 y 11 dígitos",
    }).refine((val) => val.toString().length === 8 || val.toString().length === 11, {
      message: "El formato no es correcto",
    }) as z.ZodType<number, number>,
  DocTypeID: z.string(),
  Email: z.email().min(5).max(20),
  FirstName: z.string().min(2).max(100),
  IsActive: z.boolean(),
  // z.enum(["true", "false"]).default("false")
  LastName: z.string().min(2).max(100).nullable().optional(),
  Phone: z.string().nullable().optional(),
  PostalCode: z.string().max(20),
  PriceListID: z.string(),
  ProvinceID: z.string(),
  VendorID: z.string(),
})

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  ClientID: 0,
  Address: null,
  BranchID: "",
  City: null,
  CompanyID: "",
  CountryID: "",
  DocNumber: 0,
  DocTypeID: "",
  Email: "",
  FirstName: "",
  IsActive: false,
  LastName: "",
  Phone: "",
  PostalCode: "",
  PriceListID: "",
  ProvinceID: "",
  VendorID: "",
};

export function ClientsForm() {
  const params = useParams();
  const [fetchQuery, { data, error, loading, refetch }] = useGetClientFormDataLazyQuery();

  console.log({ data })

  const client = data?.clientsById || null;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur", // o "onBlur" o "onChange" o "onSubmit"
    defaultValues
  })

  console.log("form", form)
  console.log("form.formState.errors", form.formState.errors)

  function onSubmit(data: FormSchema) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-accent p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  // cuando llegan los datos de apollo
  useEffect(() => {
    if (params.id) {
      fetchQuery({
        variables: { id: Number(params.id) },
      })
    }
  }, [params.id])

  // cuando llegan los datos de apollo
  useEffect(() => {
    if (data?.clientsById) {
      const client = data.clientsById;
      // Ojo: tenés que mapear los datos a las keys de tu formSchema
      form.reset({
        ClientID: client.ClientID,
        Address: client.Address || null,
        BranchID: String(client.BranchID) || "",
        City: client.City || null,
        CompanyID: String(client.CompanyID || ""),
        CountryID: String(client.CountryID || ""),
        DocNumber: Number(client.DocNumber),
        DocTypeID: String(client.DocTypeID || ""),
        Email: client.Email || "",
        FirstName: client.FirstName || "",
        IsActive: client.IsActive || false,
        LastName: client.LastName || "",
        Phone: client.Phone || "",
        PostalCode: client.PostalCode || "",
        PriceListID: String(client.PriceListID || ""),
        ProvinceID: String(client.ProvinceID || ""),
        VendorID: String(client.VendorID || ""),
      }, {
        keepDirty: true,
        keepDirtyValues: true,
        keepFieldsRef: true
      });
    }
  }, [data?.clientsById])

  console.log(form.getFieldState('DocNumber'))

  if (loading) return (
    <div className="container p-6">
      <DevTool control={form.control} />

      <h2 className="font-xl font-bold mb-6">
        {params.id ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>

      <div className="w-2/3 space-y-2">
        <AlertLoading />
        <Fieldset>
          <Skeleton className="h-[16px] w-full rounded-md p-4 my-2" />
          <Skeleton className="h-[58px] w-full rounded-md p-4 my-2" />
        </Fieldset>
        <Fieldset>
          <Skeleton className="h-[16px] w-full rounded-md p-4 my-2" />
          <Skeleton className="h-[58px] w-full rounded-md p-4 my-2" />
        </Fieldset>
      </div>
    </div>
  );

  return (
    <div className="container p-6">
      <DevTool control={form.control} />

      <h2 className="font-xl font-bold mb-6">
        {params.id ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>


      {loading && (
        <Fieldset className="w-2/3 space-y-2">
          <p className="text-sm">
            <strong>ID:</strong> {client?.ClientID}<br />
            <strong>Creado:</strong> {new Date().toLocaleDateString()}<br />
          </p>
        </Fieldset>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
          {loading && <AlertLoading />}
          {error && <ApiErrorMessage error={error} />}

          <Fieldset>
            <h2 className="mb-4">Información del documento</h2>

            <div className="flex space-x-4">
              <FormBlock>
                <Label htmlFor="DocTypeID">Documento*</Label>
                <FormField
                  name="DocTypeID"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={loading ? "Loading..." : "Tipo..."} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.docTypes.map((row) => (
                            <SelectItem key={`DocTypeID-${row.DocTypeID}`} value={String(row.DocTypeID)}>
                              {row.Name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormBlock>
              <FormBlock>
                <Label htmlFor="DocNumber">Número</Label>
                <Input
                  {...form.register("DocNumber")}
                  type="number"
                  placeholder="Ingrese el número de documento"
                  maxLength={50}
                />
              </FormBlock>
            </div>
            <ErrorMessage error={form.getFieldState("DocNumber").error?.message} />
          </Fieldset>

          <Fieldset>
            <h2 className="mb-4">Organización</h2>

            <FormBlock className="flex space-x-6">
              <FormField
                control={form.control}
                name="CompanyID"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Compañía</FormLabel>
                    <FormControl>
                      <CompanyCombo
                        onSelect={(id: string) => {
                          console.log("ON SELECT", id);
                          form.setValue("CompanyID", id, { shouldTouch: true, shouldDirty: true });
                          form.setValue("BranchID", "", { shouldDirty: true });
                        }}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage>
                      {fieldState?.error ? fieldState?.error.message : ""}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BranchID"
                render={({ field, fieldState }) => {
                  const companyId = form.watch("CompanyID");
                  return (
                    <FormItem>
                      <FormLabel htmlFor="BranchID">Sucursal</FormLabel>
                      <FormControl>
                        <BranchCombo
                          id="BranchID"
                          onSelect={(id: string) => {
                            form.setValue("BranchID", id, { shouldTouch: true, shouldDirty: true });
                          }}
                          companyID={companyId}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {fieldState?.error ? fieldState?.error.message : ""}
                      </FormMessage>
                    </FormItem>
                  )
                }}
              />
            </FormBlock>
            <FormDescription>Al seleccionar una compañía se desplegará nueva información en Sucursal</FormDescription>
          </Fieldset>

          <Fieldset>
            <h2 className="mb-4">Información personal</h2>

            <div className="flex space-x-6">
              <FormBlock>
                <Label htmlFor="FirstName">Nombre*</Label>
                <Input
                  {...form.register("FirstName")}
                  placeholder="Nombre del cliente"
                  required
                  maxLength={100}
                  error={form.getFieldState("FirstName").error?.message}
                />
              </FormBlock>


              <FormBlock>
                <Label htmlFor="LastName">Apellido*</Label>
                <Input
                  {...form.register("LastName")}
                  placeholder="Apellido del cliente"
                  error={form.getFieldState("LastName").error?.message}
                />
              </FormBlock>
            </div>
          </Fieldset>

          <Fieldset>
            <h2 className="mb-4">Información de contacto</h2>

            <div className="flex space-x-6">
              <FormBlock>
                <Label htmlFor="Email">Email*</Label>
                <Input
                  {...form.register("Email")}
                  type="email"
                  placeholder="email@ejemplo.com"
                  // defaultValue={client?.Email || undefined}
                  maxLength={100}
                  // onChange={handleChange}
                  error={form.getFieldState("Email").error?.message}
                />
              </FormBlock>


              <FormBlock>
                <Label htmlFor="Phone">Teléfono*</Label>
                <Input
                  type="tel"
                  {...form.register("Phone")}
                  placeholder="(+54) xx xxxx xxxx"
                  // defaultValue={client?.Phone || undefined}
                  // onChange={handleChange}
                  maxLength={20}
                  error={form.getFieldState("Phone").error?.message}
                />
              </FormBlock>
            </div>
          </Fieldset>

          <Fieldset>
            <h2 className="mb-4">Información de ubicación</h2>

            <FormBlock>
              <Label htmlFor="Address">Dirección</Label>
              <Input
                type="text"
                {...form.register("Address")}
                placeholder="Dirección completa"
                // defaultValue={client?.Address || undefined}
                // onChange={handleChange}
                error={form.getFieldState("Address").error?.message}
              />
            </FormBlock>

            <div className="flex mt-6 space-x-6">
              <FormBlock>
                <Label htmlFor="CountryID">País*</Label>
                <FormField
                  name="CountryID"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        form.setValue("ProvinceID", "", { shouldTouch: true });
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={loading ? "Loading..." : "Seleccione..."} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.countries.map((row) => (
                            <SelectItem key={`CountryID-${row.CountryID}`} value={String(row.CountryID)}>
                              {row.Name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormBlock>
              <FormBlock>
                <FormLabel htmlFor="ProvinceID">Provincia*</FormLabel>
                <FormField
                  name="ProvinceID"
                  control={form.control}
                  render={({ field, fieldState }) => {
                    const countryId = form.watch("CountryID");
                    const availableProvinces = (data?.provinces || []).filter(
                      (p) => String(p.CountryID) === String(countryId) || String(p.ProvinceID) === field.value
                    );

                    return (
                      <Select
                        onValueChange={(value) => {
                          if (fieldState.isTouched) {
                            field.onChange(String(value))
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={loading ? "Loading..." : availableProvinces.length === 0 ? "Sin opciones" : "Seleccione..."} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {availableProvinces.map((row) => (
                              <SelectItem key={`provinceID-${row.ProvinceID}`} value={String(row.ProvinceID)}>
                                {row.Name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )
                  }}
                />
              </FormBlock>
            </div>

            <div className="flex mt-6 space-x-6">
              <FormBlock>
                <Label htmlFor="City">Ciudad</Label>
                <Input
                  type="text"
                  {...form.register("City")}
                  placeholder="Ciudad"
                  maxLength={100}
                  // defaultValue={client?.City || undefined}
                  // onChange={handleChange}
                  error={form.getFieldState("City").error?.message}
                />
              </FormBlock>


              <FormBlock>
                <Label htmlFor="PostalCode">Código Postal</Label>
                <Input
                  type="text"
                  {...form.register("PostalCode")}
                  placeholder="Código postal"
                  maxLength={20}
                  // defaultValue={client?.PostalCode || undefined}
                  // onChange={handleChange}
                  error={form.getFieldState("PostalCode").error?.message}
                />
              </FormBlock>
            </div>
          </Fieldset>

          <Fieldset>
            <h2 className="mb-4">Configuración Comercial</h2>

            <FormBlock>
              <FormField
                name="PriceListID"
                control={form.control}
                render={({ field }) => {
                  return (
                    <>
                      <Label htmlFor="PriceListID">Lista de Precios*</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder={loading ? "Loading..." : "Seleccione..."} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data?.priceLists.map((row) => (
                              <SelectItem key={`PriceListID-${row.PriceListID}`} value={String(row.PriceListID)}>
                                {row.Name}{" "}
                                {row.Description && <Badge variant="secondary" className="text-xs">{row.Description}</Badge>}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  )
                }}
              />
            </FormBlock>

            <FormBlock>
              <FormField
                name="VendorID"
                control={form.control}
                render={({ field }) => {
                  return (
                    <>
                      <Label htmlFor="VendorID">Vendedor*</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[220px]">
                          <SelectValue placeholder={loading ? "Loading..." : "Seleccione..."} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {data?.vendors.map((row) => (
                              <SelectItem key={`VendorID-${row.VendorID}`} value={String(row.VendorID)}>
                                {row.VendorName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  )
                }}
              />
            </FormBlock>
          </Fieldset>

          <Fieldset>
            <FormBlock>
              <Label className="my-4">
                <Checkbox
                  id="IsActive"
                  {...form.register("IsActive")}
                // defaultChecked={client?.IsActive}
                // onChange={handleChange}
                />
                Cliente activo
              </Label>
              <FormDescription>
                Los clientes inactivos no aparecerán en las búsquedas por defecto
              </FormDescription>
            </FormBlock>
          </Fieldset>

          <Fieldset className="bg-card flex justify-between items-center">
            <Link className="mt-auto" to="/clients">Cancel</Link>
            <Submit
              type="submit"
              disabled={loading || !client?.FirstName.trim()}
            >
              Guardar
            </Submit>
          </Fieldset>
        </form>
      </Form>

      {/* {showCompanyModal && (
        <CompanySearchModal
          isOpen={true}
          onClose={() => setShowCompanyModal(false)}
          onSelect={(c) => {
            setClient((prev) => ({
              ...prev,
              companyID: c.CompanyID,
              branchID: "",
            }));
            setShowCompanyModal(false);
          }}
        />
      )}
      {showBranchModal && (
        <BranchSearchModal
          isOpen={true}
          companyID={client.companyID || null}
          onClose={() => setShowBranchModal(false)}
          onSelect={(b) => {
            setClient((prev) => ({
              ...prev,
              branchID: b.BranchID,
              companyID: prev.companyID || b.CompanyID,
            }));
            setShowBranchModal(false);
          }}
        />
      )} */}
    </div >
  )
}
