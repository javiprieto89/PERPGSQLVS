import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router-dom";

import { useGetClientFormDataQuery, useGetDocumentTypesQuery } from "~/graphql/_generated/graphql";

import { ErrorMessage } from "~/components/form/ErrorMessage";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { Submit } from "~/components/form/InputSubmit";
import { SelectWithSearch } from "~/components/form/SelectWithSearch";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { BranchCombo } from "~/features/branch/BranchCombo";
import { BASE_ROUTE, useDocumentForm } from "~/features/document/useDocumentForm";

export function DocumentForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useDocumentForm({ id });
  const { data: formData, loading: formDataLoading } = useGetClientFormDataQuery();
  const { data: docTypes, loading: docTypesLoading } = useGetDocumentTypesQuery();

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>Documentos</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar Documento" : "Nuevo Documento"}
          </h2>
          {data?.DocumentID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.DocumentID}</span>
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
                <legend className="font-semibold mb-4 text-md">Organización</legend>
                <FormDescription className="mb-4">Seleccione la compañía y sucursal para el documento</FormDescription>
                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Label data-error={!!form.formState.errors.CompanyID?.message} htmlFor="CompanyID">Compañía*</Label>
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
                        <SelectValue placeholder={formDataLoading ? "Cargando..." : formData?.allCompany.length === 0 ? "Sin opciones" : "Seleccione..."} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {formData?.allCompany.map((row) => (
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
                            <FormControl>
                              <BranchCombo
                                defaultValue={String(data?.BranchID || "")}
                                id="BranchID"
                                onSelect={(id: string) => {
                                  form.setValue("BranchID", id, { shouldTouch: true, shouldDirty: true });
                                }}
                                companyID={companyId}
                                value={field.value}
                              />
                            </FormControl>
                            {fieldState?.error && (
                              <ErrorMessage error={fieldState.error.message} />
                            )}
                          </FormItem>
                        )
                      }}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Información del Documento</legend>

                <FormBlock className="mb-4">
                  <FormField
                    name="DocumentTypeID"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Tipo de Documento*</FormLabel>
                        <FormControl>
                          <SelectWithSearch
                            {...form.register("DocumentTypeID")}
                            placeholder="Seleccione Tipo..."
                            defaultValue={String(data?.DocumentTypeID || "")}
                            onSelect={field.onChange}
                            accessor="DocTypeID"
                            display="DocTypeName"
                            data={docTypes?.sysIdentityDocTypes || []}
                            loading={docTypesLoading}
                          />
                        </FormControl>
                        <ErrorMessage error={form.formState.errors.DocumentTypeID?.message} />
                      </FormItem>
                    )}
                  />
                </FormBlock>

                <FormBlock className="mb-4">
                  <Input
                    {...form.register("DocumentDescription")}
                    placeholder="Descripción del documento"
                    label="Descripción*"
                    error={form.formState.errors.DocumentDescription?.message}
                  />
                </FormBlock>

                <div className="md:flex space-x-4">
                  <FormBlock>
                    <Input
                      {...form.register("DocumentNumber", { valueAsNumber: true })}
                      type="number"
                      label="Número de Documento*"
                      placeholder="Número"
                      error={form.formState.errors.DocumentNumber?.message}
                    />
                  </FormBlock>

                  <FormBlock>
                    <Input
                      {...form.register("PointOfSale", { valueAsNumber: true })}
                      type="number"
                      label="Punto de Venta*"
                      placeholder="Punto de venta"
                      error={form.formState.errors.PointOfSale?.message}
                    />
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Configuraciones del Documento</legend>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="IsActive"
                        {...form.register("IsActive")}
                        defaultChecked={data?.IsActive ?? true}
                      />
                      Documento activo
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="IsTest"
                        {...form.register("IsTest")}
                        defaultChecked={data?.IsTest ?? false}
                      />
                      Modo prueba
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="ShouldAccount"
                        {...form.register("ShouldAccount")}
                        defaultChecked={data?.ShouldAccount ?? false}
                      />
                      Contabiliza
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="AffectsStock"
                        {...form.register("AffectsStock")}
                        defaultChecked={data?.AffectsStock ?? false}
                      />
                      Afecta stock
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="IsFiscal"
                        {...form.register("IsFiscal")}
                        defaultChecked={data?.IsFiscal ?? false}
                      />
                      Documento fiscal
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="IsElectronic"
                        {...form.register("IsElectronic")}
                        defaultChecked={data?.IsElectronic ?? false}
                      />
                      Documento electrónico
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="IsManual"
                        {...form.register("IsManual")}
                        defaultChecked={data?.IsManual ?? false}
                      />
                      Documento manual
                    </Label>
                  </FormBlock>

                  <FormBlock className="space-y-2">
                    <Label>
                      <Checkbox
                        id="IsQuotation"
                        {...form.register("IsQuotation")}
                        defaultChecked={data?.IsQuotation ?? false}
                      />
                      Es cotización
                    </Label>
                  </FormBlock>
                </div>
              </Fieldset>

              <Fieldset>
                <legend className="font-semibold mb-4 text-md">Configuraciones Adicionales</legend>
                
                <FormBlock className="md:w-1/2">
                  <Input
                    {...form.register("MaxItems", { 
                      valueAsNumber: true,
                      setValueAs: (v) => v === "" ? null : Number(v)
                    })}
                    type="number"
                    label="Máximo de Ítems"
                    placeholder="Cantidad máxima de ítems permitidos"
                    error={form.formState.errors.MaxItems?.message}
                  />
                </FormBlock>
              </Fieldset>

              <Fieldset className="items-center">
                <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
                  <Link className="mt-auto" to={BASE_ROUTE}>Cancelar</Link>
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
