import { DevTool } from "@hookform/devtools";
import { Link, useParams } from "react-router-dom";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { FormBreadcrumb } from "~/components/form/FormBreadcrumb";
import { FormSkeleton } from "~/components/form/FormSkeleton";
import { FormState } from "~/components/form/FormState";
import { Input } from "~/components/form/Input";
import { AdminTopBar } from "~/components/ui-admin/AdminTopBar";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { BASE_ROUTE, useRmaForm } from "~/features/rma/useRmaForm";

export function RmaForm() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const { form, handleSubmit, data, isEditing, isLoading, isSaving, errors } = useRmaForm({ id });

  return (
    <>
      {import.meta.env.DEV && <DevTool control={form.control} />}

      <AdminTopBar>
        <FormBreadcrumb isEditing={isEditing}>
          <Link to={BASE_ROUTE}>RMA</Link>
        </FormBreadcrumb>
      </AdminTopBar>

      <div className="container p-6">
        <div className="flex justify-between items-center gap-2 mb-6 md:max-w-[700px] lg:max-w-[800px]">
          <h2 className="font-xl font-bold">
            {isEditing ? "Editar RMA" : "Nuevo RMA"}
          </h2>
          {data?.RmaID && (
            <div className="flex gap-4 text-muted-foreground text-sm">
              <span className="">ID: {data?.RmaID}</span>
              <Separator orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <span className="text-sm">
                <strong>Fecha:</strong> {data.RmaDate}
              </span>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 md:max-w-[700px] lg:max-w-[800px]">
            <FormState errors={[errors.query, errors.update, errors.create]} loading={isLoading} loadingSkeleton={<FormSkeleton className="md:max-w-[700px] lg:max-w-[800px]" />} />

            {!isLoading && (
              <>
                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">Información básica</legend>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="CompanyID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Empresa*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de empresa"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                  disabled={isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="BranchID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Sucursal*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de sucursal"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                  disabled={isEditing}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormBlock>
                        <FormField
                          name="RmaTypeID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Tipo de RMA*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del tipo"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="WarehouseID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Almacén*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del almacén"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="StatusID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Estado*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del estado"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="UserID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Usuario*</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del usuario"
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="ClientID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Cliente</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del cliente (opcional)"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="SupplierID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Proveedor</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID del proveedor (opcional)"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="PriceListID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Lista de Precios</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de lista de precios (opcional)"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>
                  </div>
                </Fieldset>

                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">Referencias</legend>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormBlock>
                        <FormField
                          name="RelatedOrderID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Orden Relacionada</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de orden (opcional)"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="RelatedPIID"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Factura de Compra Relacionada</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID de factura (opcional)"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>

                    <FormBlock>
                      <FormField
                        name="DocumentID"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Documento</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="ID del documento (opcional)"
                                onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                value={field.value?.toString() || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormBlock>
                  </div>
                </Fieldset>

                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">Importes</legend>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormBlock>
                        <FormField
                          name="Subtotal"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Subtotal</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="VatAmount"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>IVA</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>

                      <FormBlock>
                        <FormField
                          name="Total"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Total</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  value={field.value?.toString() || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormBlock>
                    </div>
                  </div>
                </Fieldset>

                <Fieldset>
                  <legend className="font-semibold mb-4 text-md">Observaciones</legend>

                  <FormBlock>
                    <FormField
                      name="Notes"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Notas</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              value={field.value || ""}
                              placeholder="Observaciones del RMA"
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormBlock>
                </Fieldset>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    disabled={isSaving || !form.formState.isValid}
                  >
                    {isSaving ? "Guardando..." : "Guardar"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </>
  );
}

export default RmaForm;
