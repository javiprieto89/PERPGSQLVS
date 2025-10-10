import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router-dom";

import { DOC_TYPE } from "~/constants";
import { useGetClientFormDataQuery } from "~/graphql/_generated/graphql";

import { Submit } from "~/components/form/bkp/InputSubmit";
import { ErrorMessage } from "~/components/form/ErrorMessage";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSelect } from "~/components/form/FormSelect";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { SelectWithSearch } from "~/components/form/SelectWithSearch";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { BranchCombo } from "~/features/branch/BranchCombo";
import { BASE_ROUTE, useClientForm } from "~/features/client/useClientForm";

export function ClientsForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useClientForm({ id });
  const { data: formData, loading: formDataLoading } = useGetClientFormDataQuery();

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Clients</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Cliente" : "Nuevo Cliente"}
          </h2>
          {data?.ClientID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.ClientID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Creado:</strong> {new Date().toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {!isLoading && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
              <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} loadingSkeleton={<FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />} />

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información del documento</legend>

                <div className="md:flex md:space-x-4">
                  <FormBlock>
                    <FormField
                      name="DocTypeID"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Documento*</FormLabel>
                          <FormControl>
                            <SelectWithSearch
                              {...form.register("DocTypeID")}
                              placeholder="Seleccione Tipo..."
                              defaultValue={String(data?.DocTypeID || DOC_TYPE.CUIT)}
                              onSelect={field.onChange}
                              accessor="DocTypeID"
                              display="DocTypeName"
                              data={formData?.docTypes}
                              loading={formDataLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </FormBlock>
                  <FormBlock className='w-full'>
                    <Input
                      {...form.register("DocNumber")}
                      type="number"
                      label="Número"
                      placeholder="Ingrese el número de documento"
                      error={form.formState.errors.DocNumber?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-1 text-md">Organización</legend>
                <FormDescription className="mb-4">Al seleccionar una compañía se desplegará nueva información en Sucursal</FormDescription>
                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Label data-error={!!form.formState.errors.CompanyID?.message} htmlFor="CompanyID">Compañía</Label>
                    <Select
                      {...form.register("CompanyID")}
                      onValueChange={(id: string) => {
                        form.setValue("CompanyID", id, { shouldTouch: true, shouldDirty: true });
                        form.setValue("BranchID", "", { shouldDirty: true });
                        form.clearErrors("CompanyID");
                        form.clearErrors("BranchID");
                      }}
                      defaultValue={String(data?.CompanyID || "")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={formDataLoading ? "Loading..." : formData?.companies.length === 0 ? "Sin opciones" : "Seleccione..."} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {formData?.companies.map((row) => (
                            <SelectItem key={`CompanyID-${row.CompanyID}`} value={String(row.CompanyID)}>
                              {row.CompanyName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <ErrorMessage error={form.formState.errors.CompanyID?.message} />
                  </FormBlock>
                  <FormBlock>
                    <FormField
                      control={form.control}
                      name="BranchID"
                      render={({ field, fieldState }) => {
                        const companyId = form.watch("CompanyID");
                        return (
                          <FormItem className="space-y-2">
                            <FormLabel htmlFor="BranchID" className="space-y-2">Sucursal</FormLabel>
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
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información personal</legend>

                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Input
                      {...form.register("FirstName")}
                      placeholder="Nombre del cliente"
                      label="Nombre*"
                      error={form.formState.errors.FirstName?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Input
                      {...form.register("LastName")}
                      placeholder="Apellido del cliente"
                      label="Apellido*"
                      error={form.formState.errors.LastName?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información de contacto</legend>

                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Input
                      {...form.register("Email")}
                      type="email"
                      placeholder="email@ejemplo.com"
                      label="Email*"
                      error={form.formState.errors.Email?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Input
                      type="tel"
                      {...form.register("Phone")}
                      placeholder="(+54) xx xxxx xxxx"
                      label="Teléfono*"
                      error={form.formState.errors.Phone?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información de ubicación</legend>

                <FormBlock className="mb-4">
                  <Label htmlFor="Address">Dirección</Label>
                  <Input
                    type="text"
                    {...form.register("Address")}
                    placeholder="Dirección completa"
                    error={form.formState.errors.Address?.message}
                  />
                </FormBlock>

                <div className="md:flex space-x-4">
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
                          defaultValue={String(data?.CountryID)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={formDataLoading ? "Loading..." : "Seleccione..."} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {formData?.countries.map((row) => (
                                <SelectItem key={`CountryID-${row.CountryID}`} value={String(row.CountryID)}>
                                  {row.CountryName}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FormMessage>{form.formState.errors.CountryID?.message}</FormMessage>
                  </FormBlock>
                  <FormBlock>
                    <FormLabel htmlFor="ProvinceID">Provincia*</FormLabel>
                    <FormField
                      name="ProvinceID"
                      control={form.control}
                      render={({ field, fieldState }) => {
                        const countryId = form.watch("CountryID");
                        const availableProvinces = (formData?.provinces || []).filter(
                          (p) => String(p.CountryID) === String(countryId) || String(p.ProvinceID) === field.value
                        );

                        return (
                          <Select
                            onValueChange={(value) => {
                              if (fieldState.isTouched) {
                                field.onChange(String(value))
                              }
                            }}
                            defaultValue={String(data?.ProvinceID)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={formDataLoading ? "Loading..." : availableProvinces.length === 0 ? "Sin opciones" : "Seleccione..."} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {availableProvinces.map((row) => (
                                  <SelectItem key={`provinceID-${row.ProvinceID}`} value={String(row.ProvinceID)}>
                                    {row.ProvinceName}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )
                      }}
                    />
                    <FormMessage>{form.formState.errors.ProvinceID?.message}</FormMessage>
                  </FormBlock>
                </div>

                <div className="flex space-x-6">
                  <FormBlock>
                    <Label htmlFor="City">Ciudad</Label>
                    <Input
                      type="text"
                      {...form.register("City")}
                      placeholder="Ciudad"
                      error={form.formState.errors.City?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Label htmlFor="PostalCode">Código Postal</Label>
                    <Input
                      type="text"
                      {...form.register("PostalCode")}
                      placeholder="Código postal"
                      error={form.formState.errors.PostalCode?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Configuración Comercial</legend>
                <div className="md:flex space-x-4">
                  <FormBlock>
                    <FormSelect
                      form={form}
                      name="PriceListID"
                      label="Lista de Precios"
                      options={formData?.priceLists}
                      loading={formDataLoading}
                      defaultValue={String(data?.PriceListID || "")}
                      valueKey="PriceListID"
                      labelKey="PriceListName"
                      badgeKey="PriceListDescription"
                      className="w-full md:w-[280px]"
                      required
                    />
                  </FormBlock>

                  <FormBlock>
                    <FormSelect
                      form={form}
                      name="VendorID"
                      label="Vendedor"
                      options={formData?.vendors}
                      loading={formDataLoading}
                      defaultValue={String(data?.VendorID || "")}
                      valueKey="VendorID"
                      labelKey="VendorName"
                      className="w-full md:w-[280px]"
                      required
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <FormBlock className="space-y-2">
                  <Label>
                    <Checkbox
                      id="IsActive"
                      {...form.register("IsActive")}
                      defaultChecked={data?.IsActive || false}
                    />
                    Cliente activo
                  </Label>
                  <FormDescription>
                    Los clientes inactivos no aparecerán en las búsquedas por defecto
                  </FormDescription>
                </FormBlock>
              </Fieldset>

              <Fieldset className="items-center">
                <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                  <Link className="mt-auto" to={BASE_ROUTE}>Cancel</Link>
                  <Submit type="submit" disabled={isLoading || isSaving} isSubmitting={isSaving}>
                    Guardar
                  </Submit>
                </FormBlock>
              </Fieldset>
            </form>
          </Form>
        )}
      </div>
    </>
  )
}
